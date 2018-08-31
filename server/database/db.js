const mysql = require('mysql');
const Bluebird = require('bluebird');


const connectionOptions = {
    host: "109.95.32.134",
    user: "seller",
    password: "_SeLlEr_",
    database: "goods"
};


function getConnection() {
    const connection = mysql.createConnection(connectionOptions);
    connection.connect((err) => {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
    return connection;
}

function getQueryPromise(queryStr) {
    const connection = getConnection();

    return new Bluebird((resolve, reject) => {
        connection.query(queryStr, (error, results, fields) => {
            if (error) {
                console.log(error);
                reject(error);
            }

            resolve(results);
        });
        connection.end();
    });
}

module.exports = {
    getQueryPromise
};

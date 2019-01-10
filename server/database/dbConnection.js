const mysql = require('mysql');
const Bluebird = require('bluebird');

const connectionOptions = false
    ? {
        host: '109.95.32.134',
        user: 'seller',
        password: '_SeLlEr_',
        database: process.env.DB_NAME,
    }
    : {
        host: '127.0.0.1',
        user: 'root',
        password: '31vv12vv84vv++M',
        database: 'goodsdev',
    };

function getConnection() {
    const connection = mysql.createConnection(connectionOptions);
    connection.connect((err) => {
        if (err) {
            return;
        }
        console.log(`Connected to ${connectionOptions.database} as ${connection.threadId}`);
    });
    return connection;
}

function performQuery(queryStr) {
    const connection = getConnection();

    return new Bluebird((resolve, reject) => {
        connection.query(queryStr, (error, results, fields) => {
            if (error) {
                reject(error);
            }

            resolve(results);
        });
        connection.end();
    });
}

module.exports = {
    performQuery,
};

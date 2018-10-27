const mysql = require('mysql');
const Bluebird = require('bluebird');

// const dbName = process.env.DB_NAME || 'goodsdev';
const dbName = 'goodsdev';

const connectionOptions = {
    host: '109.95.32.134',
    // host: '127.0.0.1',
    user: 'seller',
    // user: 'root',
    password: '_SeLlEr_',
    // password: '31vv12vv84vv++M',
    database: dbName,
};

function getConnection() {
    const connection = mysql.createConnection(connectionOptions);
    connection.connect((err) => {
        if (err) {
            return;
        }
        console.log(`Connected to ${dbName} as ${connection.threadId}`);
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

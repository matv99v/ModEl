const mysql = require('mysql');
const Bluebird = require('bluebird');
const mysqlQueries = require('./mysqlQueries');

const connectionOptions = {
    host: "109.95.32.134",
    user: "seller",
    password: "_SeLlEr_",
    database: process.env.DB_NAME
};

function getConnection() {
    const connection = mysql.createConnection(connectionOptions);
    connection.connect((err) => {
        if (err) {
            return;
        }
        console.log(`Connected to ${process.env.DB_NAME} as ${connection.threadId}`);
    });
    return connection;
}

function getQueryPromise(queryStr) {
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

function getCategories(options) {
    return getQueryPromise(mysqlQueries.getCategories(options));
}

function getGoods(options) {
    return getQueryPromise(mysqlQueries.getGoods(options));
}

module.exports = {
    getQueryPromise,
    getCategories,
    getGoods
};

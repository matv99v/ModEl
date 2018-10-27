const Bluebird = require('bluebird');
const fs = Bluebird.promisifyAll(require('fs'));
const http = require('http');
const chalk = require('chalk');
const stringSimilarity = require('string-similarity');
const jsdiff = require('diff');
const typeCheck = require('./typeCheck');
const { performQuery } = require('../database/dbConnection');

require('colors');


// const diff = require('deep-diff');


function getFilesByGoodId(goodId) {
    const pattern = new RegExp(`pht_${goodId}_`);

    if (!fs.existsSync('./public/goods-photos')) {
        // No photos
        return;
    }

    return fs.readdirAsync('./public/goods-photos')
        .then((files) => {
            const mathcedFiles = files.filter(file => file.match(pattern));
            return { [goodId]: mathcedFiles.length };
        });
}

// consumes array of existingGoodsIds and returns
// optionsect of goodsId and amount of photos on server

function getAmountOfPhotos(existingGoodsIds) {
    return Bluebird
        .all(existingGoodsIds.map(goodId => this.getFilesByGoodId(goodId)))
        .then((matches) => {
            const result = matches.reduce((acc, el) => ({
                ...acc,
                ...el,
            }), {});
            return result;
        });
}

function request(url) {
    return new Bluebird((resolve, reject) => {
        http
            .get(url, (resp) => {
                let data = '';

                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    // resolve(JSON.parse(data).explanation);
                    resolve(data);
                });
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

function log(msg, col = 'yellowBright') { // TODO: to accept multiple arguments for logging
    const avaliableColors = [
        'black',
        'red',
        'green',
        'yellow',
        'blue',
        'magenta',
        'cyan',
        'white',
        'gray',
        'redBright',
        'greenBright',
        'yellowBright',
        'blueBright',
        'magentaBright',
        'cyanBright',
        'whiteBright',
    ];

    let currColor = col;

    if (!avaliableColors.includes(currColor)) {
        currColor = 'yellowBright';
    }

    const strMsg = JSON.stringify(msg, null, 4);
    console.log(chalk[currColor](strMsg));
}

// function testQueries(name, options, promises) {
//     Promise.all(promises)
//         .then((results) => {
//             log(name);
//             // log(options);
//             const oldGoodsRaw = results[0];
//             const newGoodsRaw = results[1];
//
//             // const currDiff = diff(
//             //     JSON.parse(JSON.stringify(oldGoodsRaw)),
//             //     JSON.parse(JSON.stringify(newGoodsRaw))
//             // );
//             //
//             // if (currDiff) {
//             //     log('Diff is:', 'magentaBright');
//             //     log(currDiff, 'magentaBright');
//             // }
//
//             const oldGoods = JSON.stringify(oldGoodsRaw);
//             const newGoods = JSON.stringify(newGoodsRaw);
//
//             if (oldGoods !== newGoods) {
//                 log('Objects should have matched');
//                 // log(oldGoodsRaw, 'greenBright');
//                 // log(newGoodsRaw, 'red');
//
//                 throw new Error('queryGoods.getOld and queryGoods.get return not equal results');
//             } else {
//                 log('Success!!', 'greenBright');
//             }
//         })
//         .catch((err) => {
//             // console.log(err);
//             log(name, 'red');
//             log('Failed!!!', 'red');
//         });
// }

// function testCategoriesQueries(name, options, promises) {
//     Promise.all(promises)
//         .then((results) => {
//             const oldGoodsRaw = results[0];
//             const newGoodsRaw = results[1];
//
//             const newGoodsObj = JSON.parse(JSON.stringify(newGoodsRaw)).map((el) => {
//                 delete el.goodsCount;
//                 return el;
//             });
//
//             const oldGoods = JSON.stringify(oldGoodsRaw);
//             const newGoods = JSON.stringify(newGoodsObj);
//
//             if (oldGoods !== newGoods) {
//                 log('Objects should have matched');
//                 log(oldGoodsRaw, 'greenBright');
//                 log(newGoodsRaw, 'red');
//             } else {
//                 log('testCategoriesQueries result is successfull', 'greenBright');
//             }
//         })
//         .catch((err) => {
//             log('Failed!!!', 'red');
//             log(name, 'red');
//         });
// }


function cleanStr(str) {
    return str
        .replace(/\s+/gm, ' ') // remove any amount of spaces to one
        .replace(/(\n)|(^\s)|(\s$)/gm, '') // remove new line, leading spaces, trailing spaces
        .replace(/\s,/gm, ','); // remove space before comma
}

function createReport(name, options, stringA, stringB = '') {
    const comparisonReport = stringA && stringB
        ? `# Strings similarity: ${100 * stringSimilarity.compareTwoStrings(stringA, stringB)}%`
        : '';

    const divider = '--------------------------------------------------------------------';
    const msg = `# ${(new Date()).toString()}
# Parameters: ${JSON.stringify(options)}
${comparisonReport}
${[stringA, stringB].reduce((acc, queryStr) => `${acc}\n${queryStr};\n${divider}\n`, '')}
`;
    return msg;
}


// function writeToFileQuery(name, options, mysqlQueryA) {
//     const resultMsg = createReport(name, options, mysqlQueryA);
//     fs.writeFileSync(`./database/mysqlTest/${name}.sql`, resultMsg, 'utf8');
// }

// function writeToFileComparing(name, options, mysqlQueryA, mysqlQueryB) {
//     Promise
//         .all([performQuery(mysqlQueryA), performQuery(mysqlQueryB)])
//         .then((results) => {
//             const queryResA = JSON.stringify(results[0], null, 4);
//             const queryResB = JSON.stringify(results[1], null, 4);
//
//             const msgQueries = createReport(name, options, mysqlQueryA, mysqlQueryB);
//             const msgQueriesResults = createReport(name, options, queryResA, queryResB);
//             const resultMsg = `${msgQueries}\n/*\n${msgQueriesResults}\n*/`;
//             fs.writeFileSync(`./database/mysqlTest/${name}.sql`, resultMsg, 'utf8');
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }


function checkAllowedProps(options, allowedProps) {
    const providedKeys = Object.keys(options);

    providedKeys.forEach((providedKey) => {
        const providedVal = options[providedKey];
        const allowedRules = allowedProps[providedKey];

        if (allowedRules) {
            const currDataTypeStrategy = typeCheck[allowedRules.type];
            currDataTypeStrategy(providedKey, providedVal);
        } else {
            typeCheck.default(providedKey, providedVal);
        }
    });
}


// function testQueryResults(promises) {
//     Promise
//         .all(promises)
//         .then((results) => {
//             const currQeruRes = JSON.stringify(results[0]);
//             const newQueryRes = JSON.stringify(results[1]);
//
//             const diff = jsdiff.diffChars(currQeruRes, newQueryRes);
//
//             diff.forEach((part) => {
//                 // green for additions, red for deletions
//                 // grey for common parts
//                 const color = part.added ? 'green' :
//                     part.removed ? 'red' : 'grey';
//                 process.stderr.write(part.value[color]);
//             });
//             console.log();
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }



function wrtieQueryExample(name, options, mysqlQuery) {
    const msg = `# ${(new Date()).toString()}
# Parameters: ${JSON.stringify(options)}
${mysqlQuery}
`;
    fs.writeFileSync(`./database/examplesSql/${name}.sql`, msg, 'utf8');
}


function writeQueryResultsToFile(name, options, rawQueryResult) {
    const msg = `# ${(new Date()).toString()}
# Parameters: ${JSON.stringify(options)}
${JSON.stringify(rawQueryResult, null, 4)}
`;
    fs.writeFileSync(`./database/examplesJson/${name}.json`, msg, 'utf8');
}


module.exports = {
    getFilesByGoodId,
    getAmountOfPhotos,
    request,
    log,
    // testQueries,
    // testCategoriesQueries,
    // writeToFileComparing,
    checkAllowedProps,
    // testQueryResults,
    // writeToFileQuery,

    wrtieQueryExample,
    writeQueryResultsToFile,

};

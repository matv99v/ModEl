const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const readCsv = require('./utils/read-csv');

const hostname = 'localhost';
const port = 3000;

const app = express();


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.all('/goods', (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/goods', (req,res,next) => {
    readCsv.then(function(data) {
        res.end(JSON.stringify(data));
    })
    .catch(function(err) {
        console.log(err);
    });
});



const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

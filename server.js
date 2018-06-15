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

// // send all requests to index.html so browserHistory in React Router works
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// })


app.get('/goods', (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

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

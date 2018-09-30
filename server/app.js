var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var api = require('./routes/api');
var images = require('./routes/images');
var html = require('./routes/html');
var admin = require('./routes/admin');


const cors = require('cors'); // !!!!!!!

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/images', images);
app.use('/html', html); // this is temporary route, remove it after DB is updated
app.use('/admin(/$|/*)?', admin);

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('(/$|$)|(/catalog(/$|/*)?)|(/contacts($|/$)?)', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'public/bundle', 'model-index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.log('!*--*-*!!!!*-*EXPRESS CATCHED AN ERROR');
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.end(JSON.stringify(err));
    // res.render('error');
});

module.exports = app;

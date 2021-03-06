const compression = require('compression');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const cors = require('cors'); // !!!!!!!

const categoriesRouter = require('./routes/categoriesRouter');
const goodsRouter = require('./routes/goodsRouter');
const barnRouter = require('./routes/barnRouter');
const autocompleteRoute = require('./routes/autocompleteRoute');
const images = require('./routes/images');
const admin = require('./routes/admin');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/autocomplete', autocompleteRoute);
app.use('/api/categories', categoriesRouter);
app.use('/api/goods', goodsRouter);
app.use('/api/barn', barnRouter);

app.use('/images', images);
app.use('/admin(/$|/*)?', admin);

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('(/$|$)|(/catalog(/$|/*)?)|(/contacts($|/$)?)', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'public/bundle', 'model-index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res) => {
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

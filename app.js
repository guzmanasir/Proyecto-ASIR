var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./server/routes/index');
var users = require('./server/routes/users/users');
var admins = require('./server/routes/admins/admins');
var middlewareToken = require('./private/middleware/middlewareToken');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'website'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/**
 * Middlewares
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'private')));
app.use(express.static(path.join(__dirname, 'bower_components')));

/**
 * RUTAS A PARTIR DE AQUI
 */
app.use('/', index);
app.use('/admin', admins);
app.use('/users', users);



// catch 404 and forward to error handler
/**
 * Middleware: modifican las peticiones (añaden campos nuevos/modifican/etc) antes de enviarse
 * TODO es JSON
 *
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  // por ej: añade el campo status a err
  err.status = 404;
  next(err);
});

/**
 * Manejador de errores
 */
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('views/layout');
});

module.exports = app;

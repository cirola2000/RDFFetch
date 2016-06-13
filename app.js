var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Mongo
var db = require('./model/db');
var format = require('./model/format');
var repository = require('./model/repository');
var dataset = require('./model/dataset');
var resource = require('./model/resource');
var datasetDetail = require('./model/datasetDetails');
// var normalized = require('./model/normalized');

// var routes = require('./routes/index');
var routeFormat = require('./routes/format');
var routeRepository = require('./routes/repository');
var routeCKAN = require('./routes/ckan');
var routeDataset = require('./routes/dataset');

var app = express();

// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('model/normalized.js'));



// app.use('/', routes);
app.use('/format', routeFormat);
app.use('/repository', routeRepository);
app.use('/ckan', routeCKAN);
app.use('/dataset', routeDataset);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

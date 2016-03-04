/// <reference path="typings/main.d.ts" />

'use strict';

declare function require(x:string):any;

var express:any       = require('express');
var helmet:any        = require('helmet');
var path:any          = require('path');
var favicon:any       = require('serve-favicon');
var logger:any        = require('morgan');
var cookieParser:any  = require('cookie-parser');
var bodyParser:any    = require('body-parser');
var routes            = require('./routes/index');

var app:any           = express();

app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.frameguard());
app.use(helmet.xssFilter({ setOnOldIE: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use((request:any, response:any, next:any) => {
    var err:any = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
   app.use((error:any, request:any, response:any, next:any) => {
       response.status(error.status || 500);
       response.render('error', {
           message: error.message,
           error: error
       });
   });
}

// production error handler
// no stacktraces leaked to user
app.use((error:any, request:any, response:any, next:any) => {
   response.status(error.status || 500);
   response.render('error', {
       message: error.message,
       error: {}
   });
});


module.exports = app;

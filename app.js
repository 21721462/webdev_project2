var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var gamenode = require('./app_server/routes/gamenode');

var app = express();

// Set up the mongo database
var mongoose = require('mongoose');
var mongoDatabase = 'mongodb://gnuser:gn123@ds133961.mlab.com:33961/gamenodedb';
mongoose.connect(mongoDatabase);
var database = mongoose.connection;
database.on('connected', console.log.bind(console, 'MongoDB connected.'));
database.on('error', console.error.bind(console, 'MongoDB connection error.'));
database.on('disconnected', console.log.bind(console, 'MongoDB disconnected.'));

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Add passport dependencies
app.use(require('express-session')({
  secret: 'm3Kf)FS@Cu8+qp31[mz-13ZJA3',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', gamenode);

// Passport configuration
var User = require('./app_server/models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

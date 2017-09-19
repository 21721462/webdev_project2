var express = require('express');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var json2xls = require('json2xls');
//need to disccus this
var bcrypt = require('bcrypt');
var session = require('express-session');
var crypto = require('crypto');

//add favicon?
var logger = require('morgan');

var index = require('./app_server/routes/index');


var app = express();

//view engine setup (the way the html is rendered)
app.set('views', path.join(__dirname, 'app_server' , 'views'));
app.set('view engine', 'jade');

// Setting up the mongoDB for use 
var mongoDatabase = 'mongodb://CITS3200D:cits3200d123@ds137054.mlab.com:37054/cits3200d';
mongoose.connect(mongoDatabase);
var database = mongoose.connection;
database.on('connected', console.log.bind(console, 'MongoDB connected.'));
database.on('error', console.error.bind(console, 'MongoDB connection error.'));
database.on('disconnected', console.log.bind(console, 'MongoDB disconnected.'));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// add passport dependencies 
app.use(require('express-session')({
  secret: 'm3Kf)FS@Cu8+qp31[mz-13ZJA3',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

var coordinator = require('./app_server/models/coordinatorModel');
passport.use(new LocalStrategy(coordinator.authenticate()));
passport.serializeUser(coordinator.serializeUser());
passport.deserializeUser(coordinator.deserializeUser());

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
  res.render('error', {title: 'Page Error', user: req.user});
});
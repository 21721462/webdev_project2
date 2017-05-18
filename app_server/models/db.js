var mongoose = require('mongoose');

var dbURI = 'mongodb://gnuser:gn123@ds133961.mlab.com:33961/gamenodedb';
mongoose.connect(dbURI);

mongoose.connection.on('connection',) function() {
	console.log('Succesfully connected to' + dbURI )
}
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

var gracefulShutdown = function (msg, callback) {mongoose.connection.close(function () {
  console.log('Mongoose disconnected through ' + msg); callback();});
};

process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {process.kill(process.pid, 'SIGUSR2');});
});

process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {process.exit(0);});
});

process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function () {process.exit(0);});
});
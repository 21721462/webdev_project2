/**
 * Controller for pages without models
 */
var passport = require('passport');

exports.home = function(req, res, next) {
    res.render('home', {title: 'Game Node', user: req.user});
}

exports.about = function(req, res, next) {
    res.render('about', {title: 'About', user: req.user});
}
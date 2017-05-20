/**
 * Controller for pages without models
 */

exports.home = function(req, res, next) {
    res.render('home', {title: 'Game Node'});
}

exports.about = function(req, res, next) {
    res.render('about', {title: 'About Us'});
}
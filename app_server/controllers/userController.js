/**
 * CRUD operations for the User model.
 */

var User = require('../models/user');

// Display details page for a specific user
exports.userDetails = function(req, res, next) {
    res.send('NOT IMPLEMENTED: User details');
}

// Display details page for list of users
exports.userList = function(req, res, next) {
    res.send('NOT IMPLEMENTED: User list');
}

// Display User create form on GET
exports.userCreateGet = function(req, res, next) {
    res.render('register', {title: 'Register/Login'});
}

// Handle User create on POST
exports.userCreatePost = function(req, res, next) {
    res.send('NOT IMPLEMENTED: User create POST');
}

// Display User update form on GET
exports.userUpdateGet = function(req, res, next) {
    res.send('NOT IMPLEMENTED: User update GET');
}

// Handle User update on POST
exports.userUpdatePost = function(req, res, next) {
    res.send('NOT IMPLEMENTED: User update POST');
}

// Display User delete form on GET
exports.userDeleteGet = function(req, res, next) {
    res.send('NOT IMPLEMENTED: User delete GET');
}

// Handle User delete on POST
exports.userDeletePost = function(req, res, next) {
    res.send('NOT IMPLEMENTED: User delete POST');
}

/**
 * CRUD operations for the User model.
 */

var passport = require('passport');
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
    // Get all the required information
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var age = req.body.age;
    var location = req.body.location;

    // Construct a new user instance
    User.register(new User({
        username: username,
        name: name,
        email: email,
        location: location,
        age: age,
        location: location
    }),
    password,
    function(err, account) {
        console.log('wtf has errored');
        if (err) {
            console.log(err);
            return res.render('register', {account: account});
        }
        passport.authenticate('local')(req, res, function() {
            console.log('registration has not errored');
            res.redirect('/');
        });
    });
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

/**
 * User session operations
 */
exports.userLoginGet = function(req, res, next) {
    res.render('login', {user: req.user});
}

exports.userLoginPost = function(req, res, next) {
    res.redirect('/');
}

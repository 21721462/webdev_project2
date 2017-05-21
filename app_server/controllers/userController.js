/**
 * CRUD operations for the User model.
 */

var fs = require('fs');
var path = require('path');
var passport = require('passport');
var multer = require('multer');
var User = require('../models/user');
var uploads = __dirname + './../../public/uploads/';

// Display the home page
exports.homePageGet = function(req, res, next) {
    res.render('home', {title: 'Game Node', user: req.user});
}

// Display the about page
exports.aboutPageGet = function(req, res, next) {
    res.render('about', {title: 'About', user: req.user});
}

// Display the register page
exports.registerPageGet = function(req, res, next) {
    res.render('register', {title: 'Register'});
}

// Handle POST on register page
exports.registerPagePost = function(req, res, next) {
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
        if (err) {
            console.log('Registration Error Occured: ' + err);
            return res.render('register', {account: account});
        }
        passport.authenticate('local')(req, res, function() {
            console.log('Registration Succeeded.');
            res.redirect('/');
        });
    });
}

// Display the user settings page
exports.userSettingsPageGet = function(req, res, next) {
    res.render('userSettings', {title: 'User Settings', user: req.user});
}

// Handle POST on user settings page
exports.userSettingsPagePost = function(req, res, next) {
    var avatar;
    if (req.file) {
        avatar = path.resolve(uploads + req.params.id + '.png');
        console.log('userSettingsPagePost: ' + avatar);
        fs.rename(req.file.path, avatar, function(err) {
            if (err) {
                console.log(err);
                res.redirect('/');
            }
        });
    } else if (req.user.avatar) {
        avatar = req.user.avatar;
    } else {
        avatar = null;
    }

    // Get all the required information
    var name = req.body.name;
    var username = req.body.username;
    var age = req.body.age;
    var location = req.body.location;

    var user = new User({
        _id: req.params.id, // required, otherwise new object made
        name: name,
        username: username,
        avatar: avatar,
        age: age,
        location: location
    });

    User.findByIdAndUpdate(req.params.id, user, {}, function(err, user) {
        if (err) {
            console.error('User could not be updated');
            return next(err);
        }
        res.redirect('/');
    })
}

// Return the avatar
exports.avatarGet = function(req, res, next) {
    var file = path.resolve(uploads + req.user._id + '.png');
    console.log(file);
    res.sendFile(file);
}

// Display the login page
exports.loginPageGet = function(req, res, next) {
    res.render('login', {title: 'Login'});
}

// Handle POST on the login page
exports.loginPagePost = function(req, res, next) {
    res.redirect('/');
}

// Display home page on user logout
exports.logout = function(req, res, next) {
    req.logout();
    res.redirect('/');
}

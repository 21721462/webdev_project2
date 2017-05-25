/**
 * CRUD operations for the User model.
 */

var fs = require('fs');
var path = require('path');
var passport = require('passport');
var multer = require('multer');
var validator = require('validator');
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
    // Get an error message if one is present
    var message = req.session.registerError;
    req.session.registerError = null;

    res.render('register', {title: 'Register', error: message});
}

// Handle POST on register page
exports.registerPagePost = function(req, res, next) {
    // Clean the name field
    var name = req.body.name;
    if (!(name.length >= 3 && name.length <= 100)) {
        req.session.registerError = 'Name must be between 3 and 100 characters.';
        return res.redirect('back');
    }
    
    // Clean the username field
    var username = req.body.username;
    if (!(username.length >= 3 && username.length <= 100)) {
        req.session.registerError = 'Username must be between 3 and 100 characters.';
        return res.redirect('back');
    }

    // Clean the password fields
    var password = req.body.password;
    var confirmPassword = req.body['confirm-password'];
    if (!(password.length >= 6)) {
        req.session.registerError = 'Password must be at least 6 characters.';
        return res.redirect('back');
    }
    if (!(password === confirmPassword)) {
        req.session.registerError = 'Passwords do not match.';
        return res.redirect('back');
    }

    // Clean the email field
    var email = req.body.email;
    if (!validator.isEmail(email)) {
        req.session.registerError = 'Please provide a valid email address.';
        return res.redirect('back');
    }

    // Clean the age field
    var age = req.body.age;
    if (!validator.toDate(age)) {
        req.session.registerError = 'Please provide a valid date of birth.';
        return res.redirect('back');
    }

    // Clean the location field
    var location = req.body.location;
    if (!(location === 'America' || location === 'Europe' ||
          location === 'Asia' || location === 'Oceania' || location === 'Africa')) {
        req.session.registerError = 'Please provide a valid location.';
        return res.redirect('back');
    }

    // Construct a user object with the above details
    var user = {
        name: name,
        username: username,
        email: email,
        age: age,
        location: location
    };

    // Register the user in the server
    User.register(new User(user), password, function(err, account) {
        if (err) {
            req.session.registerError = 'Username or email is already taken.';
            return res.redirect('back');
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/');
        });
    });
}

// Display the user profile page
exports.userProfilePageGet = function(req, res, next) {
    res.render('profile', {title: 'Profile', user: req.user});
}

// Display the user settings page
exports.userSettingsPageGet = function(req, res, next) {
    // Get error message if present
    var message = req.session.settingsError;
    req.session.settingsError = null;

    res.render('userSettings', {title: 'User Settings', user: req.user, error: message});
}

// Handle POST on user settings page
exports.userSettingsPagePost = function(req, res, next) {
    var avatar;
    if (req.file) {
        avatar = path.resolve(uploads + req.params.id + '.png');
        fs.rename(req.file.path, avatar, function(err) {
            if (err) {
                next(err);
            }
        });
    } else if (req.user.avatar) {
        avatar = req.user.avatar;
    } else {
        avatar = null;
    }

    // Clean the name field
    var name = req.body.name;
    if (!(name.length >= 3 && name.length <= 100)) {
        req.session.settingsError = 'Name must be between 3 and 100 characters.';
        return res.redirect('back');
    }
    
    // Clean the username field
    var username = req.body.username;
    if (!(username.length >= 3 && username.length <= 100)) {
        req.session.settingsError = 'Username must be between 3 and 100 characters.';
        return res.redirect('back');
    }

    // Clean the age field
    var age = req.body.age;
    if (!validator.toDate(age)) {
        req.session.settingsError = 'Please provide a valid date of birth.';
        return res.redirect('back');
    }

    // Clean the location field
    var location = req.body.location;
    if (!(location === 'America' || location === 'Europe' ||
          location === 'Asia' || location === 'Oceania' || location === 'Africa')) {
        req.session.settingsError = 'Please provide a valid location.';
        return res.redirect('back');
    }

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
            return next(err);
        }
        res.redirect('/');
    });
}

// Return the avatar
exports.avatarGet = function(req, res, next) {
    var file = path.resolve(uploads + req.user._id + '.png');
    res.sendFile(file);
}

// Display the login page
exports.loginPageGet = function(req, res, next) {
    // Get an error message if one is present
    var message = req.session.loginError;
    req.session.loginError = null;

    res.render('login', {title: 'Login', error: message});
}

// Handle POST on the login page
exports.loginPagePost = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            // Return 500 error
            return next(err);
        }
        if (!user) {
            // Login or username is incorrect
            req.session.loginError = 'Username or password is invalid.';
            return res.redirect('back');
        }
        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
}

// Display home page on user logout
exports.logout = function(req, res, next) {
    req.logout();
    res.redirect('/');
}


// handles the match making algorithm function.
/*
 exports.matchMakingGet = function(req, res, next) {
    // get the fields from match making pages and store it in variables.
    var gameName = req.body.gameName;
    var username = req.body.username;
    var prefMinAge = req.body.fromAge;
    var prefMaxAge = req.body.toAge;
    var prefRank = req.body.rank;
    var location = req.body.location;
    console.log('gameName: ' + gameName);
    console.log('prefMinAge: ' + prefMinAge);
    console.log('prefMaxAge: ' + prefMaxAge);
    console.log('prefRank: ' + prefRank);
    console.log('username: ' + username);
    console.log('location: ' + location);
    gameName = "TF2";
    // function to fetch data from mongo data base based on the search criteria
    // and returns a list of matches converted from the cursor object.
     //findMatches(){
    var listOfMatches;
    var listMatchArray;
    if(gameName != null && location != null && prefRank != null && prefMinAge != null && prefMaxAge != null ){
        listOfMatches = findMatchesAllCriteria(gameName, location, prefRank, prefMinAge, prefMaxAge );
    } else if ( prefMinAge === null || prefMaxAge === null ){
      listOfMatches = findMatchesExceptAge(gameName, location, prefRank);
    } else if(prefRank === null) {
      listOfMatches = findMatchesExceptRank(gameName, location, prefMinAge, prefMaxAge );
    } else if(prefRank === null && (prefMinAge === null || prefMaxAge === null)){
      listOfMatches = findMatchesGameLoc(gameName, location);
    }else if(location === null && (prefMinAge === null || prefMaxAge === null)){
      listOfMatches = findMatchesGameRank(gameName, prefRank);
    } else if(location === null && prefRank === null){
      listOfMatches = findMatchesGameAge(gameName, prefMinAge, prefMaxAge);
    } else{
      listOfMatches = findMatchesGameName(gameName);
    }
    listMatchArray = listOfMatches.toArray();
    console.log('Error Occured: ' + listMatchArray);
    //}

    // match making based on all criterias ( age, rank, name and location)
    findMatchesAllCriteria(gameName, location, prefRank, prefMinAge, prefMaxAge)
    {
      var matches = db.User.find({age : { $gte: prefMinAge, $lte: prefMaxAge } , globalRank :  {lte: prefRank } , location : location,
            gameRanks: {
              $elemMatch : {
                gameName: gameName,
                rank: {lte: prefRank}
              }
            }}, { username: 1, location: 1, globalRank: 1}).limit(10)
      return matches;
    }

    // match making based on game,location and rank
    findMatchesExceptAge(gameName, location, prefRank)
    {
      var matches = db.User.find({location : location, globalRank :  {lte: prefRank },
        gameRanks: {
          $elemMatch : {
            gameName: gameName,
            rank: {lte: prefRank}
          }
        }
      }, { username: 1, location: 1, globalRank: 1}).limit(10)
    }

    // match making based on game,location and age
    findMatchesExceptRank(gameName, location, prefMinAge, prefMaxAge)
    {
      var matches = db.User.find({location : location, age : { $gte: prefMinAge, $lte: prefMaxAge },
        gameRanks: {
          $elemMatch : {
            gameName: gameName
           }
        }
      }, { username: 1, location: 1, globalRank: 1}).limit(10)
    }

    // find matches based on game and location
    findMatchesGameLoc(gameName, location)
    {
      var matches = db.User.find({location : location,
        gameRanks: {
          $elemMatch : {
            gameName: gameName
           }
        }
      }, { username: 1, location: 1, globalRank: 1}).limit(10)
    }

    // find matches based on game and age
    findMatchesGameAge(gameName,prefMinAge,prefMaxAge)
    {
      var matches = db.User.find({ age : { $gte: prefMinAge, $lte: prefMaxAge },
        gameRanks: {
          $elemMatch : {
            gameName: gameName
           }
        }
      }, { username: 1, location: 1, globalRank: 1}).limit(10)
    }

    // find mathces based on game and rank
    findMatchesGameRank(gameName, prefRank)
    {
      var matches = db.User.find({ globalRank :  {lte: prefRank },
        gameRanks: {
          $elemMatch : {
            gameName: gameName
           }
        }

      }, { username: 1, location: 1, globalRank: 1})
    }

    // match making based only on the game name preferences
    findMatchesGameName(gameName)
    {
      var matches = db.User.find({
              gameRanks: {
                $elemMatch: {
                  gameName: gameName
                }
              }}, { username: 1, location: 1, globalRank: 1}).limit(10)
    }
 }*/

/**
 * CRUD operations for the User model.
 */

var fs = require('fs');
var path = require('path');
var passport = require('passport');
var User = require('../models/user');

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
    console.log("name"+name);
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
    res.render('userMatch', {title: 'Edit User Account', user: req.user});
}

// Handle POST on user settings page
exports.userSettingsPagePost = function(req, res, next) {
    // Get all the required information
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var user = new User({
        _id: req.params.id, // required, otherwise new object made
        name: name,
        email: email,
        password: password
    });
        console.log('username: ' + req.body.username);
    User.findByIdAndUpdate(req.params.id, user, {}, function(err, user) {
        if (err) {
            console.error('User could not be updated');
            return next(err);
        }
        res.redirect('/');
    })
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

// Display the user details page
exports.userDetPageGet = function(req, res, next) {
    res.render('userMatch', {title: 'Edit User Details', user: req.user});
}

// Handle POST on edit user details page
exports.userDetPageGet = function(req, res, next) {
    // Get all the required information
    var name = req.body.name;
    var username = req.body.username;
    var age = req.body.age;
    var location = req.body.location;
    var avatar = req.body.avatar;

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

// handles the match making algorithm function.
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
 }

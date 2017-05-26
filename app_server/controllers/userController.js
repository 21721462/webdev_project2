/**
 * CRUD operations for the User model.
 */

var fs = require('fs');
var path = require('path');
var passport = require('passport');
var multer = require('multer');
var validator = require('validator');
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
exports.profilePageGet = function(req, res, next) {
    // Get error message if present
    var message = req.session.profileError;
    req.session.profileError = null;

    res.render('editUser', {title: 'Profile', user: req.user, error: message});
}

// Handle POST on the user profile page
exports.profilePagePost = function(req, res, next) {
    var avatar = req.user.avatar;
    if (req.file) {
        avatar.data = fs.readFileSync(req.file.path);
        avatar.contentType = 'image/png';
    }
    
    // Clean the name field
    var name = req.body.name;
    if (!(name.length >= 3 && name.length <= 100)) {
        req.session.profileError = 'Name must be between 3 and 100 characters.';
        return res.redirect('back');
    }
    
    // Clean the username field
    var username = req.body.username;
    if (!(username.length >= 3 && username.length <= 100)) {
        req.session.profileError = 'Username must be between 3 and 100 characters.';
        return res.redirect('back');
    }

    // Clean the age field
    var age = req.body.age;
    if (!validator.toDate(age)) {
        req.session.profileError = 'Please provide a valid date of birth.';
        return res.redirect('back');
    }

    // Clean the location field
    var location = req.body.location;
    if (!(location === 'America' || location === 'Europe' ||
          location === 'Asia' || location === 'Oceania' || location === 'Africa')) {
        req.session.profileError = 'Please provide a valid location.';
        return res.redirect('back');
    }

    var user = new User({
        _id: req.user._id, // required, otherwise new object made
        name: name,
        username: username,
        avatar: avatar,
        age: age,
        location: location
    });

    User.findByIdAndUpdate(req.user._id, user, {}, function(err, user) {
        if (err) {
            console.error('User could not be updated');
            return next(err);
        }
        res.redirect('/');
    });
}

// Display the user settings page
exports.settingsPageGet = function(req, res, next) {
    // Get error message if present
    var message = req.session.settingsError;
    req.session.settingsError = null;

    res.render('editAccountDetails', {title: 'User Settings', user: req.user, error: message});
}

// Handle POST on user settings page
exports.settingsPagePost = function(req, res, next) {
    // Get all the required information
    // Clean the email field
    var email = req.body.email;
    if (!validator.isEmail(email)) {
        req.session.registerError = 'Please provide a valid email address.';
        return res.redirect('back');
    }

    // Set password
    var password = req.body.password;
    req.user.setPassword(password, function() {
        req.user.save();
    });

    var user = new User({
        _id: req.user._id, // required, otherwise new object made
        email: email,
    });

    User.findByIdAndUpdate(req.user._id, user, {}, function(err, user) {
        if (err) {
            console.error('User could not be updated');
            return next(err);
        }
        res.redirect('/');
    });
}

// Return the avatar
exports.avatarGet = function(req, res, next) {
    res.contentType(req.user.avatar.contentType);
    res.end(req.user.avatar.data);
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
 exports.matchMakingGet = function(req, res, next) {
    // get the fields from match making pages and store it in variables.
    var gameName = req.body.gameName;
    var username = req.body.username;
    var prefMinAge = req.body.fromAge;
    var prefMaxAge = req.body.toAge;
    var prefRank = req.body.rank;
    var location = req.body.location;
    gameName = "Tf2";
    console.log('gameName: ' + gameName);
    console.log('prefMinAge: ' + prefMinAge);
    console.log('prefMaxAge: ' + prefMaxAge);
    console.log('prefRank: ' + prefRank);
    console.log('username: ' + username);
    console.log('location: ' + location);

    // function to fetch data from mongo data base based on the search criteria
    // and returns a list of matches converted from the cursor object.
     //findMatches(){
    var listOfMatches;
    var listMatchArray;
    if(gameName && location && prefRank && prefMinAge  && prefMaxAge ){
        // listOfMatches =  test();
        findMatchesAllCriteria(gameName, location, prefRank, prefMinAge, prefMaxAge);
    } else if ( gameName && location && prefRank ){
        findMatchesExceptAge(gameName, location, prefRank);
    } else if(gameName && location && prefMinAge && prefMaxAge) {
      findMatchesExceptRank(gameName, location, prefMinAge, prefMaxAge );
    } else if(gameName && location){
      // findAllMatchesNoCriteria();
      findMatchesGameLoc(gameName, location);
    }else if(gameName && prefRank){
      findMatchesGameRank(gameName, prefRank);
    } else if(gameName && prefMinAge && prefMaxAge){
      findMatchesGameAge(gameName, prefMinAge, prefMaxAge);
    } else if (gameName){
      findMatchesGameName(gameName);
    } else {
      findAllMatchesNoCriteria();
    }

    //var listMatchArray = listOfMatches.toArray(function(err, docs){});


    //console.log("items"+ listOfMatches.forEach(printjson));
    /* while (listOfMatches.hasNext()) {
        print(tojson(myCursor.next()));
      } */
    //}

    // match making based on all criterias ( age, rank, name and location)
    function findMatchesAllCriteria(gameName, location, prefRank, prefMinAge, prefMaxAge)
    {
      User.find({ $and: [{age : { $gte: new Date(prefMinAge), $lte: new Date(prefMaxAge) } , location : location },
            { gameRanks: {
              $elemMatch : {
                gameName: gameName,
                rank: {$lte: prefRank}
              }
            }}]}).limit(10).exec(
              function(err, matchList){
                if(err){ res.render('error', {
                  message:err.message,
                  error: err});
          } else {
            console.log('find complete1');
            console.log(matchList.length);
            //console.log(simpleData.toArray());
            res.render('userMatch',{'matches':matchList,'user':req.user});
            }
	          }
          );

        };

    // function to find all user matches without any criteria being passed.
    // uses a find() function to return all results so that user search doesnt
    // reutrn a null list
    function findAllMatchesNoCriteria(){
          User.find().limit(5).exec(
            function(err, matchList){
              if(err){ res.render('error', {
                message:err.message,
                error: err});
        } else {
          console.log('find complete2');
          console.log(matchList.length);
          res.render('userMatch',{'matches':matchList,'user':req.user});
          // return matchList;
          }
       }
    );

  };

    // match making based on game,location and rank
    function findMatchesExceptAge(gameName, location, prefRank)
    {
       User.find({ $and : [{location : location} ,
        { gameRanks: {
          $elemMatch : {
            gameName: gameName,
            rank: {$lte: prefRank}
          }
        }
      }]}).limit(10).exec(
        function(err, matchList){
          if(err){ res.render('error', {
            message:err.message,
            error: err});
    } else {
      console.log('find complete3');
      console.log(matchList.length);
      // return matchList;
       res.render('userMatch',{'matches':matchList,'user':req.user});
      }
      }
    );

  };



    // match making based on game,location and age
    function findMatchesExceptRank(gameName, location, prefMinAge, prefMaxAge)
    {
      User.find({ $and: [{location : location, age : { $gte: new Date(prefMinAge), $lte: new Date(prefMaxAge) }},
        { gameRanks: {
          $elemMatch : {
            gameName: gameName
           }
        }
      }]}).limit(10).exec(
        function(err, matchList){
          if(err){ res.render('error', {
            message:err.message,
            error: err});
    } else {
      console.log('find complete4');
      console.log(matchList.length);
      // return matchList;
       res.render('userMatch',{'matches':matchList,'user':req.user});
      }
      }
    );

  };

    // find matches based on game and location
    function findMatchesGameLoc(gameName, location)
    {
      User.find({ $and: [{location : location },
        { gameRanks: {
          $elemMatch : {
            gameName: gameName
           }
        }
      }]}).limit(10).exec(
        function(err, matchList){
          if(err){ res.render('error', {
            message:err.message,
            error: err});
    } else {
      console.log('find complete5');
      console.log(matchList.length);
      // return matchList;
       res.render('userMatch',{'matches':matchList,'user':req.user});
      }
      }
    );

  };

    // find matches based on game and age
    function findMatchesGameAge(gameName,prefMinAge,prefMaxAge)
    {
      User.find({ $and: [{ age : { $gte: new Date(prefMinAge), $lte: new Date(prefMaxAge) }},
        { gameRanks: {
          $elemMatch : {
            gameName: gameName
           }
        }
      },{username: 1, gameRanks: 1, location: 1}]}).limit(10).exec(
        function(err, matchList){
          if(err){ res.render('error', {
            message:err.message,
            error: err});
    } else {
      console.log('find complete6');
      console.log(matchList.length);
      // return matchList;
       res.render('userMatch',{'matches':matchList,'user':req.user});
      }
      }
    );

  };

    // find mathces based on game and rank
    function findMatchesGameRank(gameName, prefRank)
    {
      User.find({ $and: [{
          gameRanks: {
          $elemMatch : {
            gameName: gameName
           }
        }

      }]}).limit(10).exec(
        function(err, matchList){
          if(err){ res.render('error', {
            message:err.message,
            error: err});
    } else {
      console.log('find complete7');
      console.log(matchList.length);
      // return matchList;
       res.render('userMatch',{'matches':matchList,'user':req.user});
      }
      }
    );

  };

    // match making based only on the game name preferences
    function findMatchesGameName(gameName)
    {
      User.find({ $and: [{
              gameRanks: {
                $elemMatch: {
                  gameName: gameName
                }
              }}]}).limit(10).exec(
                function(err, matchList){
                  if(err){ res.render('error', {
                    message:err.message,
                    error: err});
            } else {
              console.log('find complete8');
              console.log(matchList.length);
              // return matchList;
               res.render('userMatch',{'matches':matchList,'user':req.user});
              }
              }
            );

          };

 }
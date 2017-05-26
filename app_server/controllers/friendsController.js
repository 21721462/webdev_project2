/**
 * CRUD operations for the Friends model.
 */

var Friends = require('../models/friends');
var User = require('../models/user');

// Display the friends page
exports.friendsPageGet = function(req, res, next) {
    req.user.getFriends({}, function(err, friendships) {
        if (err) {
            return next(err);
        }
        res.render('friends', {title: 'Friends', user: req.user, friends: friendships});
    });
}

exports.requestFriend = function(req, res, next) {
    req.user.requestFriend(req.params.id, function(err, friendships) {
        if (err) {
            return next(err);
        }
        res.redirect('back');
    });
}

// Handle request for deleting a friend
exports.deleteFriend = function(req, res, next) {
    req.user.removeFriend(req.params.id, function(err, friendships) {
        if (err) {
            return next(err);
        }
        console.log(friendships);
        res.redirect('back');
    });
}

// Handle request for chat session
exports.chatFriend = function(req, res, next) {
    res.render('chat', {title: 'Chat', user: req.user, friend: req.params.id});
}

// Display the matchmaker page
exports.matchmakerPageGet = function(req, res, next) {
    res.render('userMatch', {title: 'Match Maker', user: req.user});
}

// handles the match making algorithm function.
exports.matchMakingPost = function(req, res, next) {
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
/**
 * CRUD operations for the Friends model.
 */

var Friends = require('../models/friends');
var User = require('../models/user');

// Display the friends page
exports.friendsPageGet = function(req, res, next) {
    User.getFriends(req.user, function(err, friendships) {
        if (err) {
            return next(err);
        }
        res.render('friends', {title: 'Friends', user: req.user, friends: friendships});
    });
}

exports.acceptRequest = function(req, res, next) {
    User.requestFriend(req.user._id, )
}

// Display the matchmaker page
exports.matchmakerPageGet = function(req, res, next) {
    res.render('userMatch', {title: 'Match Maker', user: req.user});
}

exports.chatPageGet = function(req, res, next) {
    res.render('chat', {title: 'Chat', user: req.user, friend: null/*TODO: get friend object*/});
}

exports.reqFriend = function(req, res, next){
    var username = req.params.username;
    User.findOne({'username': username});
    User.exec(function(err, user)
    {
        User.requestFriend(req.user._id, user._id, function(err, response) 
        {
            console.log("user request send!");
        });
    });
}

exports.delFriend = function(req, res, next) {
    var username = req.params.username;
    User.findOne({'username': username});
    User.exec(function(err, user) {
        User.removeFriend(req.user, user, function(err, friend)
        {
            console.log("friend deleated!");
        });
    });
}
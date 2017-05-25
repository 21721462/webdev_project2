/**
 * CRUD operations for the Friends model.
 */

var Friends = require('../models/friends');

// Display the friends page
exports.friendsPageGet = function(req, res, next) {
    res.render('friends', {title: 'Friends', user: req.user});
}

exports.chatPageGet = function(req, res, next) {
    res.render('chat', {title: 'Chat', user: req.user, friend: null/*TODO: get friend object*/});
}

exports.ListFriend = function(req, res, next) {
    User.getFriends(req.user, function(err, friendships) {
        if (err) {
            return next(err);
        }

        res.render('friends', {title: 'Friends', friendUsers: friendships});
    });
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
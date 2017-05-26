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

// Handle request for accepting a friend
exports.acceptFriend = function(req, res, next) {
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
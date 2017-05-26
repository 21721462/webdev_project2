/**
 * CRUD operations for frienships
 */

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

exports.friendsPagePost = function(req, res, next) {
	var friend = User.findByUsername(req.body.friendName);
	if (friend) {
		req.user.requestFriend(friend, function(err, friendships) {
			if (err) {
				return next(err);
			}
			res.redirect('back');
		});
	}
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

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

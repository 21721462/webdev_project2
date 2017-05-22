/**
 * CRUD operations for the Game model.
 */

var Game = require('../models/game');

// Display the games page
exports.gamesPageGet = function(req, res, next) {
    res.render('games', {title: 'Games', user: req.user});
}
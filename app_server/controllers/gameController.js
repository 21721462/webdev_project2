/**
 * CRUD operations for the Game model.
 */

var Game = require('../models/game');

// Display the games page
exports.gamesPageGet = function(req, res, next) {
    Game.find().exec(function(err, list) {
        if (err) {
            return next(err);
        }
        res.render('games', {title: 'Games', user: req.user, games: list});
    });
}
/**
 * The model for defining a rank for a particular user and game.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameRankSchema = Schema({
	user: {type: Schema.ObjectId, ref: 'User', required: true},
    game: {type: Schema.ObjectId, ref: 'Game', required: true},
    rank: {type: Number, required: true}
});

module.exports = mongoose.model('GameRank', GameRankSchema);

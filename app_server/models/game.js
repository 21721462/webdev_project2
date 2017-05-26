/**
 * The model for defining a game.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = Schema({
	gameID: {type: Number, required: true},
	name: {type: String, required: true},
	description: {type: String, required: true}
});


module.exports = mongoose.model('Game', GameSchema);

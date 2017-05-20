/**
 * The model for defining a game.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = Schema({
	name: {type: String, required: true},
	description: {type: String, required: true}
});

mongoose.model('Game', GameSchema);

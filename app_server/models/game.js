var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema(
{
	GameID: Number,
	GameName: String,
	
});

mongoose.model('Game', gameSchema, 'games');
var mongoose = require('mongoose');
var friends = require('mongoose-friends');
var LocalPassport = require('passport-local-mongoose');

var userSchema = new mongoose.Schema(
{
	_id : Number,
	name: String,
	email: String,
	avatar: String,
	age: Date,
	loc: String,
	globalrank: Number,
	gameranks: [{ type Schema.Types.ObjectID, ref: 'Gamerank'}]
	}
	
})

var GameRanks = new mongoose.Schema({
	_id : { type: Number, ref: 'User' },
	Tf2 : Number
	CSGO : Number
	//Insert Rest of games
});

userSchema.plugin(LocalPassport);
userSchema.plugin(friends);

module.exports = mongoose.model('User', userSchema);
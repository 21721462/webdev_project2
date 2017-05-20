/**
 * The model for defining a user.
 */
var mongoose = require('mongoose');
//var friends = require('mongoose-friends'); // These keep crashing the server
//var localPassport = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	avatar: {type: String},
	age: {type: Date, required: true},
	loc: {type: String, required: true},
	globalrank: {type: Number},
	gameranks: [{type: Schema.ObjectId, ref: 'GameRank'}]
});

//UserSchema.plugin(LocalPassport);
//UserSchema.plugin(friends);

module.exports = mongoose.model('User', UserSchema);

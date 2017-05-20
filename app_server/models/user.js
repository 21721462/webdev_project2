/**
 * The model for defining a user.
 */
var mongoose = require('mongoose');
var passportLocal = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	username: {type: String, required: true},
	name: {type: String, required: true},
	email: {type: String, required: true},
	avatar: {type: String},
	age: {type: Date, required: true},
	location: {type: String, required: true},
	globalRank: {type: Number},
	gameRanks: [{type: Schema.ObjectId, ref: 'GameRank'}]
});

UserSchema.plugin(passportLocal);

module.exports = mongoose.model('User', UserSchema);

/**
 * The model for defining a user.
 */
var mongoose = require('mongoose');
var friends = require('mongoose-friends');
var passportLocal = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	username: {type: String, unique: true, required: true},
	name: {type: String, required: true},
	email: {type: String, unique: true, required: true},
	avatar: {data: Buffer, contentType: String},
	age: {type: Date, required: true},
	location: {type: String, required: true},
	globalRank: {type: Number},
	gameRanks: [{ gameName: {type: String},
						   rank: {type: Number},
 						   description: {type: String}}]
});

UserSchema.virtual('profile').get(function() {
	return '/' + this._id;
})

UserSchema.virtual('settings').get(function() {
	return '/' + this._id + '/settings';
})

UserSchema.virtual('dob').get(function() {
	var day = this.age.getDate();
	var month = this.age.getMonth() + 1;
	var year = this.age.getFullYear();

	if (day < 10) day = '0' + day;
	if (month < 10) month = '0' + month;

	return year + '-' + month + '-' + day;
})

UserSchema.plugin(passportLocal);
UserSchema.plugin(friends());

module.exports = mongoose.model('User', UserSchema);

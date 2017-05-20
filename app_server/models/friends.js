/**
 * The model for defining friendships between users.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FriendsSchema = Schema({
	person1: {type: Schema.ObjectId, rel: 'User', required: true},
    person2: {type: Schema.ObjectId, rel: 'User', required: true}
});

module.exports = mongoose.model('Friends', FriendsSchema);

var mongoose = require('mongoose');
var passportLocal = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var coordinatorSchema = Schema ({
	email: {type: String, unique: true, required: true}
})


UserSchema.plugin(passportLocal);
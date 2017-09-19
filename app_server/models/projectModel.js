var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = mongoose.Schema({
	title: {type: String, unique: true, required: true},
	supervisor: {type: String, unique: false, required:true},
	supervisor2: {type: String, unique: false, required:false},
	supervisor3: {type: String, unique: false, required:false},
	capacity: {type: Number, unique: false, required:true},
	description: {type: String, unique: false, required: true},
	discipline: {type: String, unique: false, required: true}

})


module.exports = mongoose.model('Project', projectSchema);
var mongoose = require('mongoose')


var Schema = mongoose.Schema;

var studentSchema = Schema({
	firstName: {type: String, unique: false, required: true},
	lastName: {type: String, unique: false, required: true},
	studentID: {type: String, unique: true, required: true},
	phoneNumber: {type: Number, unique: true, required: true},
	discipline: {type: String, unique: false, required: true},
	wam: {type: Number, unique: false, required: true},
	preference01: {type: String, unique: false, required: true },
	preference02: {type: String, unique: false, required: true },
	preference03: {type: String, unique: false, required: true },
	preference04: {type: String, unique: false, required: true },
	preference05: {type: String, unique: false, required: true },
	assighnedProject: [{type: Schema.Types.ObjectId, ref :'Project', unique: true, required: true}]
});



module.exports = mongoose.model('Student', studentSchema);
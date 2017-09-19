var Student = require('../models/studentModel');


exports.submitForm = function (req, res){
	var fname = req.body.fname;
	var lname = req.body.lname;
	var snumber = req.body.snumber;
	var email = req.body.email;
	var pnumb = req.body.phonenum;
	var discip = req.body.discipline;
	var wamNumber = req.body.discipline


	var student = {
		firstName: fname,
		lastName: lname,
		studentNumber: snumber,
		phoneNumber: phonenum,
		discipline: discip,
		wam: wamNumber
	};

	var myStudent = new Student(student);

	myStudent.save()
}


exports.studentRegisterGet = function(req, res, next) 
{
	res.render('studentFrontEnd', {title: 'Student Project Allocaion From'});
}

exports.studentRegisterPost = function(req, res, next) 
{
	var fname = req.body.firstName;
	if (/\d/g.test(fname) && /\s/g.test(fname))
	{
		req.session.registerError = 'Name cannot contain digits or whitespaces';
		return res.redirect('back');
	}

	var lname = req.body.lastName;
	if (/\d/g.test(lname) && /\s/g.test(fname))
	{
		req.session.registerError = 'Surname cannot contain digits';
		return res.redirect('back');
	}

	var sID = req.body.studentID;
	if(sID.length != 8 && /\D/g.test(sID) && /\s/g.test(sID))
	{
		req.session.registerError = 'Student ID must be of length 8 with no word characters and whitespaces';
		return res.redirect('back');
	}

	var phoneNum = req.body.studentPhoneNumber.replace(/ /g,"");
	if(/\D/g.test(phoneNum) && phoneNum.length != 10)
	{
		req.session.registerError = 'Phone Number cannout include non-digit characters and must be of length 10';
		return res.redirect('back');
	}

	var studentDiscipline = req.body.discipline;

	var studentPreferences = [];
	studentPreferences.push(req.body.pref1);
	studentPreferences.push(req.body.pref2);
	studentPreferences.push(req.body.pref3);
	studentPreferences.push(req.body.pref4);
	studentPreferences.push(req.body.pref5);
	studentPreferences.push(req.body.pref6);


	for (var i = 0; i < 6; i++)
	{
		var projectDisp = Project.find({"title":studentPreferences[i]});
		if (projectDisp.discipline != studentDiscipline)
		{
			req.session.registerError = 'You must pick project with ';
			return res.redirect('back');
		}
	}

}

exports.removeStudent = function (req, res) 
{

}

exports.editStudent = function (req, res)
{

}

exports.sendEmailALL = function (req, res)
{

}

exports.sendEmailIndividual = function (req, res)
{

}


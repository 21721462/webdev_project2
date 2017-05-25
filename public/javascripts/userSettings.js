function setSelected(selected)
{
    var s = document.getElementsByName('location')[0];
    for (var i = 0; i < s.options.length; i++) {
        if (s.options[i].value == selected) {
            s.options[i].selected = 'selected';
            break;
        }
    }
}

function validateEditUser() {
	// Validates edit user form
	// Get user details
	var uname = document.getElementsByName("uname")[0].value;
  var name = document.getElementsByName("name")[0].value;

  // validate user name
	 if(!uname){
     alert("fill in the user name")
		 return false
	  }

  // validates name
    if(!name){
		    alert("fill in the Name")
		    return false
	    }

	  return  true;
}

// file upload function
function fileUpload(event)
{
  var reader = new FileReader();
  reader.onload = function()
    {
      var output = document.getElementById('userImage');
      output.src = reader.result;
    }
      reader.readAsDataURL(event.target.files[0]);
  }

function validateAccountDet() {
  var email = document.getElementsByName("email")[0].value;
  var confemail = document.getElementsByName("confemail")[0].value;
  var pass = document.getElementsByName("password")[0].value;
  var confpass = document.getElementsByName("confpassword")[0].value;
  alert("in");
  alert(email);
  //checking if email and pass words matches.
  if(validatePasswordOrEmail(pass,confpass)){
    if(validatePasswordOrEmail(email,confemail)){
      return true;
    }
  }
  return false;
}

function validatePasswordOrEmail(fieldvalue,confVal) {
	if (fieldvalue != confVal) {
    alert("Fields do not match.");
    return false;
    }
  return true;
}

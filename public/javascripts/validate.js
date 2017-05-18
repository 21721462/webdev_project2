/**
 * Validates the form data locally.
 */
function validateForm() {
	// Get the required data to validate
	var password = document.getElementsByName("pword")[0].value;
	var confirmPassword = document.getElementsByName("pword")[1].value;
	var email = document.getElementsByName("email")[0].value;
	var confirmEmail = document.getElementsByName("email")[1].value;
	var games = document.getElementsByClassName("cbox")

	if (password != confirmPassword) {
		alert("Passwords do not match.");
		return false;
	}

	if (email != confirmEmail) {
		alert("Emails do not match.");
		return false;
	}

	// Make sure at least one game is checked
	var oneChecked = false;
	for (var i = 0; i < games.length; i++) {
		if (games[i].checked) {
			oneChecked = true;
		}
	}

	if (!oneChecked) {
		alert("Please select at least one game.")
		return false;
	}

	return true; 
}

/**
 * Toggles the password display.
 */
var visible = false;
var passwords = document.getElementsByName("pword");
function showPassword() {
	if (!visible) {
		passwords[0].type = 'text';
		passwords[1].type = 'text';
		visible = true;
	} else {
		passwords[0].type = 'password';
		passwords[1].type = 'password';
		visible = false;
	}
}

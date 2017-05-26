// Get the required data to validate
var password = document.getElementsByName("password")[0];
var confirmPassword = document.getElementsByName("confirm-password")[0];

/**
 * Validates the form data locally.
 */
function validateForm() {
	if (password.value != confirmPassword.value) {
		alert("Passwords do not match.");
		return false;
	}
	return true;
}

/**
 * Toggles the password display.
 */
var visible = false;
function showPassword() {
	if (!visible) {
		password.type = 'text';
		confirmPassword.type = 'text';
		visible = true;
	} else {
		password.type = 'password';
		confirmPassword.type = 'password';
		visible = false;
	}
}


function validateMatchForm(){
	var games = document.getElementsByName("gameName");
	var oneChecked = false;
	for (var i = 0; i < games.options.length; i++) {
			if (games.options[i].value == selected) {
					oneChecked = true;
					break;
			}
	}

	if (!oneChecked) {
		alert("Please select at least one game.")
		return false;
	}

}

// function to hide and show preferences list items
function showPreferences() {
	var list = document.getElementById("prefList");

	if (list.style.display == "none"){
		list.style.display = "block";
		}else{
			list.style.display = "none";
			}
	}

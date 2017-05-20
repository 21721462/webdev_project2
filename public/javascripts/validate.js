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

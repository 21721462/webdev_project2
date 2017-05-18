// Get the home page
module.exports.home = function(req, res) {
	res.render('home', {title: 'Game Node'});
}

// Get the friends page
module.exports.friends = function(req, res) {
	res.render('friends', {title: 'Friends'});
}

// Get the games page
module.exports.games = function(req, res) {
	res.render('games', {title: 'Games'});
}

// Get the about page
module.exports.about = function(req, res) {
	res.render('about', {title: 'About Us'});
}

// Get the login page
module.exports.register = function(req, res) {
	res.render('register', {title: 'Login/Register'});
}

// Get the profile page
module.exports.profile = function(req, res) {
	res.render('profile', {title: 'Profile'});
}

/* Get Home page */
module.exports.home = function(req, res) {
	/*
		if (loggedIn) {
			res.render('home', {title: 'Game Node', navType: 'nav-bar-user'});
		} else	
	*/
	res.render('home', {title: 'Game Node'});
}
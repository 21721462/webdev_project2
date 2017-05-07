/* Get Home page */
module.exports.index = function(req, res) {
	res.render('index', {title: 'Game Node'});
}
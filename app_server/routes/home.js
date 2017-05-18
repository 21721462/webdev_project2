var express = require('express');
var router = express.Router();
var main = require('../controllers/main');

/* GET home page. */
router.get('/', main.home);
router.get('/friends', main.friends);
router.get('/games', main.games);
router.get('/about', main.about);
router.get('/register', main.register);

// router.get('/login/steam', passport.authenticate('steam', {failureRedirect: '/login'}), function(req,res){})

module.exports = router;

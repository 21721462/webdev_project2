/**
 * The main router for the GameNode website
 */

var express = require('express');
var passport = require('passport');
var router = express.Router();

// Get the required controllers
var generalController = require('../controllers/generalController');
var userController = require('../controllers/userController');
var gameController = require('../controllers/gameController');
var friendsController = require('../controllers/friendsController');
var gameRankController = require('../controllers/gameRankController');

/**
 * General Routes
 */

// GET request for home page
router.get('/', generalController.home);

// GET request about page
router.get('/about', generalController.about);

/**
 * User Routes
 */

// GET request for creating a user (register page)
router.get('/register', userController.userCreateGet);

// POST request for creating a user
router.post('/register', userController.userCreatePost);

// GET request for logging in
router.get('/login', userController.userLoginGet);

// POST request for logging in
router.post('/login', passport.authenticate('local'), userController.userLoginPost);

// GET request for logging out
router.get('/logout', userController.userLogout);

// Add more as they are being used

module.exports = router;
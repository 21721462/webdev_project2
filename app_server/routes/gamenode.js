/**
 * The main router for the GameNode website
 */

var express = require('express');
var passport = require('passport');
var router = express.Router();

// Get the required controllers
var userController = require('../controllers/userController');
var gameController = require('../controllers/gameController');
var friendsController = require('../controllers/friendsController');
var gameRankController = require('../controllers/gameRankController');

/**
 * User Routes
 */

// GET request for the home page
router.get('/', userController.homePageGet);

// Get request for the about page
router.get('/about', userController.aboutPageGet);

// GET request for the register page
router.get('/register', userController.registerPageGet);

// POST request for the register page
router.post('/register', userController.registerPagePost);

// GET request for the user settings page
router.get('/:id/settings', userController.userSettingsPageGet);

// POST request for the user settings page
router.post('/:id/settings', userController.userSettingsPagePost);

// GET request for the login page
router.get('/login', userController.loginPageGet);

// POST request for the login page
router.post('/login', passport.authenticate('local'), userController.loginPagePost);

// GET request for logging out
router.get('/logout', userController.logout);

/**
 * Friends Routes
 */

// GET request for the friends page
router.get('/friends', friendsController.friendsPageGet);

/**
 * Games Routes
 */

// GET request for the games page
router.get('/games', gameController.gamesPageGet);

module.exports = router;
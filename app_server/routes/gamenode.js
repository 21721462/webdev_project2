/**
 * The main router for the GameNode website
 */

var express = require('express');
var passport = require('passport');
var multer = require('multer');
var router = express.Router();
var upload = multer({dest: __dirname + '/../../public/uploads/'});

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

// GET request for the user profile page
router.get('/profile', userController.profilePageGet);

// POST request for the user profile poage
router.post('/profile',  upload.single('avatar'), userController.profilePagePost);

// GET request for the user settings page
router.get('/profile/settings', userController.settingsPageGet);

// POST request for the user settings page
router.post('/profile/settings', userController.settingsPagePost);

// GET request for getting the avatar
router.get('/avatar', userController.avatarGet);

// GET request for the login page
router.get('/login', userController.loginPageGet);

// POST request for the login page
router.post('/login', userController.loginPagePost);

// GET request for logging out
router.get('/logout', userController.logout);

/**
 * Friends Routes
 */

// GET request for the friends page
router.get('/friends', friendsController.friendsPageGet);

// GET request for the chat page
router.get('/chat', friendsController.chatPageGet);

/**
 * Games Routes
 */

// GET request for the games page
router.get('/games', gameController.gamesPageGet);

module.exports = router;

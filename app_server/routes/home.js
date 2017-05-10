var express = require('express');
var router = express.Router();
var main = require('../controllers/main');

/* GET home page. */
router.get('/', main.home);

module.exports = router;

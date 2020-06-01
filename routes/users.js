var express = require('express');
var router = express.Router();

const usersCtrl = require('../controllers/users');

const isLoggedIn = require('./modules/isloggedin');

router.get('/users', usersCtrl.index);

module.exports = router;

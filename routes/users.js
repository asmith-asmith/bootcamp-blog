var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');

const isLoggedIn = require('./modules/isloggedin');

// view all users profile
router.get('/users/all', usersCtrl.showAll);
// view loggedin user
router.get('/users/:id', usersCtrl.index);

module.exports = router;

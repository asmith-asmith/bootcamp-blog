var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');

const isLoggedIn = require('./modules/isloggedin');

// view all users profile
router.get('/', usersCtrl.showAll);
// view loggedin user
router.get('/:id', usersCtrl.index);

module.exports = router;

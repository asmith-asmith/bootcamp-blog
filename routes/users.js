var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');

const isLoggedIn = require('./modules/isloggedin');

// view loggedin user
router.get('/:id', usersCtrl.index);
// view all users profile
router.get('/all', usersCtrl.showAll);

module.exports = router;

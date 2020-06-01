var express = require('express');
var router = express.Router();

const passport = require('passport');

// const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/users');
});

// Login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Callback route for success and failure
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/users',
    failureRedirect : '/users'
  }
));

// Logout Route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/users');
});

module.exports = router;

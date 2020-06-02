var express = require('express');
var router = express.Router();

const passport = require('passport');

// const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/lists');
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
    successRedirect : '/lists',
    failureRedirect : '/lists'
  }
));

// Logout Route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/lists');
});

module.exports = router;

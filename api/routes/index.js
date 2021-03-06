var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/profile/:id', ctrlProfile.profile_of_node);
router.get('/profile_all', ctrlProfile.profile_all);
router.get('/status', auth, ctrlProfile.profile_status);
router.get('/refresh', auth, ctrlProfile.refresh);
router.get('/me', auth, ctrlProfile.me);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/logout', ctrlAuth.login);

// password reset
router.post('/reset', auth, ctrlAuth.reset);

module.exports = router;

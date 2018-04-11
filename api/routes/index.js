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
router.get('/profile_node/:id', ctrlProfile.profile_of_node);
router.get('/profile_all', ctrlProfile.profile_all);
router.get('/status', auth, ctrlProfile.profile_status);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/logout', ctrlAuth.login);

module.exports = router;

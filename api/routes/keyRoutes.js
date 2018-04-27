var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

// keyLists --------------------
var keyLists = require('../controllers/keyListsController');

router.post('/', keyLists.create_a_key);

router.get('/node/:id', keyLists.read_a_key);
router.get('/wnode/:id', keyLists.read_a_wallet);

router.get('/address/:id', auth, keyLists.get_private_key);

module.exports = router;

'use strict';

var mongoose = require('mongoose'),
  keyLists = mongoose.model('keyLists');

// exports.list_all_keys = function(req, res) {
//   keyLists.find({}, function(err, key) {
//     if (err)
//       res.send(err);
//     res.json(key);
//   });
// };

exports.create_a_key = function(req, res) {
  var new_key = new keyLists(req.body);
  new_key.save(function(err, key) {
    if (err)
      res.send(err);
    res.json(key);
  });
};

exports.read_a_key = function(req, res) {
  keyLists.find({
    node_number: req.params.id
  }, function(err, key) {
    if (err)
      res.send(err);
    res.json(key);
  });
};

// exports.update_a_key = function(req, res) {
//   keyLists.findOneAndUpdate({_id: req.params.keyId}, req.body, {new: true}, function(err, key) {
//     if (err)
//       res.send(err);
//     res.json(key);
//   });
// };
//
// exports.delete_a_key = function(req, res) {
//   keyLists.remove({
//     _id: req.params.keyId
//   }, function(err, key) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'keyLists successfully deleted' });
//   });
// };

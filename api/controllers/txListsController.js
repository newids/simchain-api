'use strict';

var mongoose = require('mongoose'),
  txLists = mongoose.model('txLists'),
  User = mongoose.model('User');

exports.read_a_tx_with_height = function(req, res) {
  txLists.find({
    'height': req.params.id
  }, function(err, tx) {
    if (err)
      res.send(err);
    res.json(tx);
  });
};

exports.read_a_tx_with_node = function(req, res) {
  txLists.find({
    'node_number': req.params.id
  }, function(err, tx) {
    if (err)
      res.send(err);
    res.json(tx);
  });
};

exports.list_all_tx_requests = function(req, res) {
  txLists.find({
    'height': 0
  }, function(err, tx) {
    if (err)
      res.send(err);
    res.json(tx);
  });
};

exports.create_a_tx_requests = function(req, res) {
  var new_tx = new txLists(req.body);
  new_tx.height = 0;
  new_tx.save(function(err, tx) {
    if (err)
      res.send(err);

    User.findOneAndUpdate({
      node_number: req.body.to_node
    }, {
      $set: {
        balance: balance + req.body.amount
      }
    }, function(err, tx) {
      if (err)
        res.send(err)

      User.findOneAndUpdate({
        node_number: req.body.from_node
      }, {
        $set: {
          balance: balance - req.body.amount
        }
      }, function(err, tx) {
        if (err)
          res.send(err)

        Key.findOneAndUpdate({
          address: req.body.from
        }, {
          $set: {
            balance: balance - req.body.amount
          }
        }, function(err, tx) {
          if (err)
            res.send(err)

          Key.findOneAndUpdate({
            address: req.body.to
          }, {
            $set: {
              balance: balance + req.body.amount
            }
          }, function(err, tx) {
            if (err)
              res.send(err)
          });
        });

      });
    });

    res.json(tx);
  });
};

// exports.create_a_tx = function(req, res) {
//   var new_tx = new txLists(req.body);
//   new_tx.save(function(err, tx) {
//     if (err)
//       res.send(err);
//     res.json(tx);
//   });
// };

// exports.read_a_tx = function(req, res) {
//   txLists.findById(req.params.txId, function(err, tx) {
//     if (err)
//       res.send(err);
//     res.json(tx);
//   });
// };

// exports.update_a_tx = function(req, res) {
//   txLists.findOneAndUpdate({_id: req.params.txId}, req.body, {new: true}, function(err, tx) {
//     if (err)
//       res.send(err);
//     res.json(tx);
//   });
// };

// exports.delete_a_tx = function(req, res) {
//   txLists.remove({
//     _id: req.params.txId
//   }, function(err, tx) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'txLists successfully deleted' });
//   });
// };

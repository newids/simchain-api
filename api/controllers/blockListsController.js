'use strict';

var mongoose = require('mongoose'),
  blockLists = mongoose.model('blockLists'),
  txLists = mongoose.model('txLists');

exports.createGenesisBlock = function(req, res) {
  blockLists.find({
    height: 0
  }, function(err, block) {

  });
  if (req.body.height != 0) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    var new_block = new blockLists(req.body);

    new_block.save(function(err, block) {
      if (err)
        res.send(err);
      res.json(block);
    });
  }
}


exports.list_blocks = function(req, res) {
  // blockLists.find({}, function(err, block) {
  //   if (err)
  //     res.send(err);
  //   res.json(block);
  // });

  var q = blockLists.find({}).sort({
    height: -1
  }).limit(20);

  q.exec(function(err, block) {
    if (err)
      res.send(err);
    res.json(block);
  });

};

exports.create_a_block = function(req, res) {
  var new_block = new blockLists(req.body);
  new_block.save(function(err, block) {
    if (err)
      res.send(err);

    // txLists.find({
    //   'height': 0
    // }, function(err, tx) {
    //   if (err)
    //     res.send(err);
    //
    //   tx.height = new_block.height;
    //   tx.update();
    // });
    var tx_for_miner = {
      height: new_block.id,
      hash_pointer: req.body.merkle_root,
      from: "0",
      from_node: "0",
      to: req.body.address,
      to_node: req.body.node_number,
      amount: 100
    };

    var new_tx = new txLists(tx_for_miner);

    new_tx.save(function(err, tx) {
      if (err)
        res.send(err);
    });

    txLists.updateMany({
        height: 0
      }, {
        $set: {
          height: new_block.id
        }
      },
      function(err, tx) {
        if (err)
          res.send(err);
      });

    res.json(block);
  });
};

exports.read_a_block = function(req, res) {
  blockLists.find({
    height: req.params.id
  }, function(err, block) {
    if (err)
      res.send(err);
    res.json(block);
  });
};

exports.read_a_latest_block = function(req, res) {
  blockLists
    .find({})
    .sort('-height')
    .exec(function(err, block) {
      if (err)
        res.send(err);
      res.json(block);
    });
};

// exports.delete_a_block = function(req, res) {
//   blockLists.remove({
//     _id: req.params.blockId
//   }, function(err, block) {
//     if (err)
//       res.send(err);
//     res.json({
//       message: 'blockLists successfully deleted'
//     });
//   });
// };

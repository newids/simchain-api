'use strict';

var mongoose = require('mongoose'),
    blockLists = mongoose.model('blockLists'),
    txLists = mongoose.model('txLists'),
    keyList = mongoose.model('keyLists');

var response = require('./response');


exports.createGenesisBlock = function (req, res) {
    var new_key = new keyList({
        private_key: "ddcc23b8ff9ab4b52419a7254f1ee74ed558b97625662410625d0fc993ba60b1",
        public_key: "02b4f7aacbe278048923c9705b7dd29a2d2777a89bb51853cb53c304ea96eecb6f",
        wif: "5KVy6h2Tp5pKfsiDa614tmkCz9n5xm8gYZQ3K86JRbeUz5WN54V",
        address: "1Ex16amEMpbi2tkinCB17D3HeaZSWmNamV",
        node_number: "0000"
    });

    new_key.save(function (err, data) {
        if (err) {
            res.send(err);
            console.log(err.toLocaleString());
            return;
        }
    });

    var new_block = new blockLists({
        height: 0,
        node_number: "0000",
        address: "1Ex16amEMpbi2tkinCB17D3HeaZSWmNamV",
        prev_hash: "0000000000000000000000000000000000000000000000000000000000000000",
        merkle_root: "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9",
        time: "00000000",
        nbits: "0",
        nonce: "0"
    });

    new_block.save(function (err, data) {
        if (err) {
            res.send(err);
            console.log(err.toLocaleString());
            return;
        }
    });

    var new_tx = new txLists({
        height: 0,
        hash_pointer: "5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9",
        from: "",
        from_node: "",
        to: "1Ex16amEMpbi2tkinCB17D3HeaZSWmNamV",
        to_node: "0000",
        amount: 10 ** 9
    });
    new_tx.save(function (err, data) {
        if (err) {
            res.send(err);
            return;
        }
    });

    response.resTrue(res, "Created.");
}


exports.list_blocks = function (req, res) {

    // blockLists.find({}, function(err, block) {
    //   if (err)
    //     res.send(err);
    //   res.json(block);
    // });

    var q = blockLists.find({}).sort({
        height: -1
    }).limit(100);

    q.exec(function (err, block) {
        if (err) {
            response.resFalse(res, 'Error:', err.toLocaleString());
        }
        else {
            response.resTrue(res, block);
        }
    });

};

exports.create_a_block = function (req, res) {
    var new_block = new blockLists(req.body);

    var tx_for_miner = {
        height: new_block.height,
        hash_pointer: req.body.merkle_root,
        from: ' ',
        from_node: ' ',
        to: req.body.address,
        to_node: req.body.node_number,
        amount: 50
    };

    var new_tx = new txLists(tx_for_miner);

    new_block.save(function (err, data) {
        if (err) {
            response.resFalse(res, 'Error:', err.toLocaleString());
            return;
        }
        console.log('new_block.save:', data);

        new_tx.save(function (err, data) {
            if (err) {
                response.resFalse(res, 'Error:', err.toLocaleString());
                return;
            }
            console.log('new_tx.save:', data);

            txLists.updateMany({
                    height: -1
                }, {
                    $set: {
                        height: new_block.height,
                        hash_pointer: new_block.merkle_root,
                    }
                },
                function (err, data) {
                    if (err) {
                        response.resFalse(res, 'Error:', err.toLocaleString());
                        return;
                    }
                    console.log('txLists.updateMany:', data);

                    response.resTrue(res, new_block);
                });
        });
    });

};

exports.read_a_block = function (req, res) {
    blockLists.find({
        height: req.params.id
    }, function (err, block) {
        if (err)
            res.send(err);
        res.json(block);
    });
};

exports.read_a_latest_block = function (req, res) {
    var q = blockLists
        .find({})
        .sort({'height': -1})
        .limit(1);

    q.exec(function (err, block) {
        if (err) {
            response.resFalse(res, 'Error:', err.toLocaleString());
        }
        else {
            response.resTrue(res, block);
        }
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

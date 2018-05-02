'use strict';

var mongoose = require('mongoose'),
    txLists = mongoose.model('txLists'),
    keyLists = mongoose.model('keyLists'),
    User = mongoose.model('User');
var response = require('./response');

exports.read_a_tx_with_height = function (req, res) {
    txLists.find({
        'height': req.params.id
    }, function (err, tx) {
        if (err) {
            response.resFalse(res, 'Error:', err.toLocaleString());
        }
        else {
            response.resTrue(res, tx);
        }
    });
};

exports.read_a_tx_with_node = function (req, res) {
    txLists.find({
        'node_number': req.params.id
    }, function (err, tx) {
        if (err) {
            response.resFalse(res, 'Error:', err.toLocaleString());
        }
        else {
            response.resTrue(res, tx);
        }
    });
};

exports.read_txs_from = function (req, res) {
    txLists.aggregate([{
        $match: {'from': req.params.id},
    }, {
        $group: {
            _id: null,
            total: {$sum: "$amount"}
        }
    }], function (err, tx) {
        if (err) {
            response.resFalse(res, 'Error:', err.toLocaleString());
        }
        else {
            response.resTrue(res, tx);
        }
    });
};

exports.get_address_balance = function (req, res) {
    txLists.aggregate([{
            $match: {'to': req.params.id},
        }, {
            $group: {
                _id: null,
                total: {$sum: "$amount"}
            }
        }],
        function (err, tx) {
            if (err) {
                console.log('Error : ', err.toLocaleString());
                response.resFalse(res, 'Error:', err.toLocaleString());
            }
            else {
                console.log('tx : ', tx);
                if (tx === null || tx === undefined || tx === [] || tx.length === 0 ||  tx.total === 0) {
                    console.log('tx.total === 0 : ', tx);
                    response.resTrue(res, [{"total": 0}]);
                }
                else {
                    txLists.aggregate([{
                        $match: {'from': req.params.id},
                    }, {
                        $group: {
                            _id: null,
                            total: {$sum: "$amount"}
                        }
                    }], function (err, tx2) {
                        if (err) {
                            console.log('Error : ', err.toLocaleString());
                            response.resFalse(res, 'Error:', err.toLocaleString());
                        }
                        else {
                            if (tx2 === null || tx2 === undefined || tx2 === [] || tx2.length === 0 ||  tx2.total === 0) {
                                console.log('tx2.total === 0 : ', tx);
                                response.resTrue(res, tx);
                            }
                            else {
                                const grandtotal = tx.total - tx2.total;
                                console.log('tx : ', tx);
                                console.log('tx2 : ', tx2);
                                console.log('grand total : ', grandtotal);
                                response.resTrue(res, [{"total": grandtotal}]);
                            }
                        }
                    });
                }
            }
        });
};

// exports.read_txs_with_from = function (req, res) {
//     txLists.find({
//         'to': req.params.id
//     }, function (err, tx) {
//         if (err) {
//             response.resFalse(res, 'Error:', err.toLocaleString());
//         }
//         else {
//             response.resTrue(res, tx);
//         }
//     });
// };

exports.list_all_tx_requests = function (req, res) {
    txLists.find({
        'height': 0
    }, function (err, tx) {
        if (err) {
            response.resFalse(res, 'Error:', err.toLocaleString());
        }
        else {
            response.resTrue(res, tx);
        }
    });
};

exports.create_a_tx_requests = function (req, res) {

    var new_tx = new txLists(req.body);
    new_tx.height = 0;

    new_tx.save(function (err, tx) {
        if (err) {
            response.resFalse(res, 'Error:', err.toLocaleString());
        }
        else {
            response.resTrue(res, tx);
        }
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

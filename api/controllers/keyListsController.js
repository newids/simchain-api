'use strict';

var mongoose = require('mongoose'),
    keyLists = mongoose.model('keyLists'),
    User = mongoose.model('User');

var response = require('./response');

// exports.list_all_keys = function(req, res) {
//   keyLists.find({}, function(err, key) {
//     if (err)
//       res.send(err);
//     res.json(key);
//   });
// };

exports.create_a_key = function (req, res) {
    keyLists;
    keyLists.find({
        node_number: req.body.node_number,
        private_key: req.body.private_key
    }, function (err, key) {
        console.log('node_number: req.body.node_number:', req.body.node_number,
            'private_key: req.body.private_key:', req.body.private_key);
        console.log('key:', (key));
        console.log('JSON.stringify(key).toString()', JSON.stringify(key).toString(), 'key.length', key.length );
        if (err) {
            response.resFalse(res, 'Error:', err.toLocaleString());
            return;
        }
        else if (key && key.length > 0) {
            response.resFalse(res, 'Error:', 'The private key is already in your list.', key.length);
            return;
        }
        else {
            var new_key = new keyLists(req.body);

            new_key.save(function (err, key) {
                if (err) {
                    response.resFalse(res, 'Error:', err.toLocaleString());
                }
                else {
                    response.resTrue(res, key);
                }
            });
        }
    });

};

exports.read_a_key = function (req, res) {
    keyLists.find({
        node_number: req.params.id
    }, function (err, key) {
        if (err) {
            response.resFalse(res, 'Error:', err.toLocaleString());
        }
        else {
            // res.status(200).json(key);
            response.resTrue(res, key);
        }
    });
};

exports.read_a_wallet = function (req, res) {
    keyLists.find({
        node_number: req.params.id
    }, {address: 1, amount: 1, _id: 0 }, function (err, key) {
        if (err) {
            response.resFalse(res, 'Error:', err.toLocaleString());
        }
        else {
            // res.status(200).json(key);
            response.resTrue(res, key);
        }
    });
};

exports.get_private_key = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function (err, user) {
                if (err) {
                    response.resFalse(res, 'Error:', err.toLocaleString());
                }
                else {
                    keyLists.find({
                        address: req.params.id,
                        node_number: user.node_number,
                    }, function (err, key) {
                        if (err) {
                            response.resFalse(res, 'Error:', err.toLocaleString());
                        }
                        else {
                            response.resTrue(res, key);
                        }
                    });
                }
            });
    }
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

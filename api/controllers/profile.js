var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        if (err)
          res.send(err);
        res.status(200).json(user);
      });
  }

};

module.exports.profile_of_node = function(req, res) {

    User
    .find({
      node_number: req.params.id
    }, function(err, user) {
      if (err)
        res.send(err);
      res.status(200).json(user);
    });

};

module.exports.profile_all = function(req, res) {

    User
      .find({})
      .exec(function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
      });

};

module.exports.profile_status = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        if (err)
          res.send(err);
        res.status(200).json({
          "node_number" : user.node_number,
          "nbits" : user.nbits,
          "status": user.status
        });
      });
  }

};

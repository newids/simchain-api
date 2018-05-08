var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function (req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "success": false,
            "message": "UnauthorizedError: private profile",
            "errors": "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function (err, user) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.status(200).json(user);
            });
    }

};

module.exports.profile_of_node = function (req, res) {

    User
        .find({
            node_number: req.params.id
        }, function (err, user) {
            if (err) {
                res.send(err);
                return;
            }
            res.status(200).json(user);
        });

};

module.exports.profile_all = function (req, res) {

    User
        .find({})
        .exec(function (err, user) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(user);
        });

};

module.exports.profile_status = function (req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "success": false,
            "message": "UnauthorizedError: private profile",
            "errors": "UnauthorizedError: private profile"
        });
    } else {
        try {
            User
                .findById(req.payload._id)
                .exec(function (err, user) {
                    if (err) {
                        res.send(err);
                        return;
                    }
                    if (!user) {
                        res.status(401).json({
                            "success": false,
                            "message": "User is not found",
                            "errors": "User is not found"
                        });
                        return;
                    }

                    res.status(200).json({
                        "success": true,
                        "message": null,
                        "errors": null,
                        "token": "token",
                        "node_number": user.node_number,
                        "nbits": user.nbits,
                        "status": user.status
                    });
                });
        } catch (e) {
            res.status(401).json({
                "success": false,
                "message": "Error:",
                "errors": e.toLocaleString()
            });
        }
    }

};

module.exports.refresh = function (req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "success": false,
            "message": "UnauthorizedError: private profile",
            "errors": "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function (err, user) {
                try {
                    if (err) {
                        console.log('refresh:', err.toLocaleString())
                        res.send(err);
                        return;
                    }
                    if (!user && !user._id) {
                        res.status(401).json({
                            "success": false,
                            "message": "User is not found",
                            "errors": "User is not found"
                        });
                        return;
                    }
                    var token;
                    token = user.generateJwt();
                    res.status(200).json(
                        {
                            "success": true,
                            "message": null,
                            "errors": null,
                            "token": token,
                            "node_number": user.node_number,
                            "email": user.email
                        }
                    );
                } catch (e) {
                    res.status(401).json({
                        "success": false,
                        "message": "Error:",
                        "errors": e.toLocaleString()
                    });
                }
            });
    }

};

module.exports.me = function (req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "success": false,
            "message": "UnauthorizedError: private profile",
            "errors": "UnauthorizedError: private profile"
        });
    } else {
        try {
            User
                .findById(req.payload._id)
                .exec(function (err, user) {
                    if (err) {
                        console.log('me:', err.toLocaleString())
                        res.send(err);
                        return;
                    }
                    res.status(200).json({
                        "success": true,
                        "message": null,
                        "errors": null,
                        "data": user
                    });
                });
        } catch (e) {
            res.status(401).json({
                "success": false,
                "message": "Error:",
                "errors": e.toLocaleString()
            });
        }
    }

};

var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var response = require('./response');
var crypto = require('crypto');

module.exports.register = function (req, res) {

    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            "success": false,
            "message": "All fields required",
            "errors": "All fields required"
        });
        return;
    }

    try {
        var user = new User();

        user.node_number = ((Math.floor(Math.random() * 99999) + 1) * 10 + Math.floor(Math.random() * 10)).toString(16);
        user.email = req.body.email;

        user.setPassword(req.body.password);

        user.save(function (err) {
            if (err) {
                res.status(401).json({
                    "success": false,
                    "message": "Error:",
                    "errors": err.toLocaleString()
                });
                return;
            }

            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "success": true,
                "message": null,
                "errors": null,
                "token": token,
                "node_number": user.node_number,
                "email": user.email
            });
        });
    } catch (e) {
        res.status(401).json({
            "success": false,
            "message": "Error:",
            "errors": e.toLocaleString()
        });
        return;
    }

};

module.exports.login = function (req, res) {

    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            "success": false,
            "message": "All fields required",
            "errors": "All fields required"
        });
        return;
    }


    passport.authenticate('local', function (err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "success": true,
                "message": null,
                "errors": null,
                "token": token,
                "node_number": user.node_number,
                "email": user.email
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};

module.exports.reset = function (req, res) {

    if (!req.payload._id) {
        response.resFalse(res, 'Error:', 'UnauthorizedError: private profile');
    } else {
        try {
            User
                .findById(req.payload._id)
                .exec(function (err, user) {
                    if (err) {
                        console.log('reset:', err.toLocaleString())
                        response.resFalse(res, 'Error:', err.toLocaleString());
                        return;
                    }
                    if (user.node_number !== '8dde5') {
                        response.resFalse(res, 'Error:', 'UnauthorizedError: private profile');
                        return;
                    }
                    if (!req.body.email || !req.body.password) {
                        response.resFalse(res, 'Error:', 'All fields required');
                        return;
                    }

                    User.find({
                        email: req.body.email
                    }, function (err, user) {
                        if (err) {
                            response.resFalse(res, 'Error:', err.toLocaleString());
                            return;
                        }
                        if (!user) {
                            response.resFalse(res, 'Error:', 'Email Not Found!');
                            return;
                        }

                        let u = new User(user);
                        u.setPassword(req.body.password);

                        u.save(function (err) {
                            if (err) {
                                response.resFalse(res, 'Error:', err.toLocaleString());
                                return;
                            }

                            var token;
                            token = u.generateJwt();

                            res.status(200);
                            res.json({
                                "success": true,
                                "message": null,
                                "errors": null,
                                "token": token,
                                "node_number": u.node_number,
                                "email": u.email
                            });
                        });
                    });

                });
        } catch (e) {
            response.resFalse(res, 'Error:', e.toLocaleString());
        }
    }

};

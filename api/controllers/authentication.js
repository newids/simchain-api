var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function (req, res) {

    // if(!req.body.name || !req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    var user = new User();

    user.node_number = (Math.floor(Math.random() * 999) + 1) * 10 + Math.floor(Math.random() * 10);
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function (err) {
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

};

module.exports.login = function (req, res) {

    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

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
            // res.status(401).json(info);
            // --- register(req, res);
            // ------------------------------------------------
            var user = new User();

            user.node_number = (Math.floor(Math.random() * 999) + 1) * 10 + Math.floor(Math.random() * 10);
            user.email = req.body.email;

            user.setPassword(req.body.password);

            user.save(function (err) {
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
            // ------------------------------------------------
        }
    })(req, res);

};

module.exports.resFalse = function(res, msg, errors) {
    res.status(200);
    res.json({
        "success": false,
        "message": msg,
        "errors": errors,
        "data": null,
    });
    console.log('resFalse: ', errors);
};

module.exports.resTrue = function(res, data) {
    res.status(200);
    res.json({
        "success": true,
        "message": null,
        "errors": null,
        "data": (data),
    });
    console.log('resTrue: ', data);
};

// var response = require('./response');
//
// if (err) {
//     response.resFalse(res, 'Error:', err.toLocaleString());
// }
// else {
//     response.resTrue(res, tx);
// }

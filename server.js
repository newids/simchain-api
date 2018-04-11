var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var passport = require('passport');

// [SH] Bring in the data model
require('./api/models/db');
// [SH] Bring in the Passport config after model is defined
require('./api/config/passport');

// [SH] Bring in the data model
require('./api/models/blockLists');
require('./api/models/keyLists');
require('./api/models/txLists');
// [SH] Bring in the Passport config after model is defined
require('./api/models/users');
require('./api/config/passport');

// [SH] Bring in the routes for the API (delete the default routes)
var routesApi = require('./api/routes/index');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

// [SH] Use the API routes when path starts with /api
app.use('/user', routesApi);

// --------------

var routes = require('./api/routes/simChainRoutes'); //importing route

routes(app); //register the route

// --------------

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

module.exports = app

console.log('SimChain RESTful API server started on: ' + port);

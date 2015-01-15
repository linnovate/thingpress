'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Climate = new Module('climate');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Climate.register(function(app, auth, database) {

  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  //We enable routing. By default the Package Object is passed to the routes
  Climate.routes(app, auth, database);

  return Climate;
});

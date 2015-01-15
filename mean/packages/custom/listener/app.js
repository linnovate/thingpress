'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Listener = new Module('listener');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Listener.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Listener.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Listener.menus.add({
    title: 'listener example page',
    link: 'listener example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Listener.aggregateAsset('css', 'listener.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Listener.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Listener.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Listener.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Listener;
});

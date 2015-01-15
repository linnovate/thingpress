'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Neura = new Module('neura');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Neura.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Neura.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Neura.menus.add({
    title: 'neura example page',
    link: 'neura example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Neura.aggregateAsset('css', 'neura.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Neura.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Neura.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Neura.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Neura;
});

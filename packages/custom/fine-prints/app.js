'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var FinePrints = new Module('fine-prints');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
FinePrints.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  FinePrints.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
    FinePrints.menus.add({
        'roles': ['authenticated'],
        'title': 'Fine Prints',
        'link': 'all finePrints',
        'menu':'main'
    });
    FinePrints.menus.add({
        'roles': ['authenticated'],
        'title': 'Create New Fine Print',
        'link': 'create finePrint',
        'menu':'main'
    });

  FinePrints.aggregateAsset('css', 'finePrints.css');
  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    FinePrints.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    FinePrints.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    FinePrints.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return FinePrints;
});

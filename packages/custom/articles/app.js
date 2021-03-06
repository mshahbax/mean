'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Articles = new Module('articles');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Articles.register(function (app, auth, database, circles) {

  //We enable routing. By default the Package Object is passed to the routes
  Articles.routes(app, auth, database, circles);

  //We are adding a link to the main menu for all authenticated users
  Articles.menus.add({
      title: 'create post',
      link: 'create-post',
      roles: ['authenticated'],
      menu: 'main'
    });

  Articles.menus.add({
      title: 'all posts',
      link: 'posts',
      roles: ['authenticated'],
      menu: 'main'
    });

  /**
   //Uncomment to use. Requires meanio@0.3.7 or above
   // Save settings with callback
   // Use this for saving data from administration pages
   Articles.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

   // Another save settings example this time with no callback
   // This writes over the last settings.
   Articles.settings({
        'anotherSettings': 'some value'
    });

   // Get settings. Retrieves latest saved settigns
   Articles.settings(function(err, settings) {
        //you now have the settings object
    });
   */

  return Articles;
});

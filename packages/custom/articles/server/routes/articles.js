(function () {
  'use strict';

  /* jshint -W098 */
  // The Package is past automatically as first parameter
  module.exports = function (Articles, app, auth, database, circles) {

    var articles = require('../controllers/articles')(Articles);

    var requiresAdmin = circles.controller.hasCircle('admin');
    var requiresLogin = circles.controller.hasCircle('authenticated');
    // Article authorization helpers
    var hasAuthorization = function(req, res, next) {
      if (!req.user.isAdmin && !req.article.user._id.equals(req.user._id)) {
        return res.status(401).send('User is not authorized');
      }
      next();
    };

    app.get('/api/articles/example/anyone', function (req, res) {
      res.send('Anyone can access this');
    });

    app.get('/api/articles/example/auth', requiresLogin, function (req, res) {
      res.send('Only authenticated users can access this');
    });

    app.get('/api/articles/example/admin', requiresAdmin, function (req, res) {
      res.send('Only users with Admin role can access this');
    });

    app.get('/api/articles/example/render', function (req, res) {
      Articles.render('index', {
        package: 'articles'
      }, function (err, html) {
        //Rendering a view from the Package server/views
        res.send(html);
      });
    });

    app.post('/api/articles/create', hasAuthorization,  articles.create);

  };
})();

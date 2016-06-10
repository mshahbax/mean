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

    app.get('/api/articles/get/:articleId', articles.getArticle);

    app.get('/api/articles/all', hasAuthorization, articles.all);

    app.post('/api/articles/create', hasAuthorization,  articles.create);

  };
})();

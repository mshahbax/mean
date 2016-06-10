(function () {
  'use strict';

  /* jshint -W098 */
  // The Package is past automatically as first parameter
  module.exports = function (Comments, app, auth, database, circles) {

    var comments = require('../controllers/comments')(Comments);

    var requiresAdmin = circles.controller.hasCircle('admin');
    var requiresLogin = circles.controller.hasCircle('authenticated');
    var hasAuthorization = function (req, res, next) {
      if (!req.user.isAdmin && !req.article.user._id.equals(req.user._id)) {
        return res.status(401).send('User is not authorized');
      }
      next();
    };

    app.get('/api/comments/all/:articleId', hasAuthorization, comments.all);

    app.post('/api/comments/create', hasAuthorization,  comments.create);
  };
})();

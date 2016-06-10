'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  _ = require('lodash');

module.exports = function(Articles) {

  return {
    /**
     * Create an article
     */
    create: function(req, res) {
      var article = new Article();
      article.title = req.body.title;
      article.content = req.body.content;
      article.user = req.user;

      article.save(function(err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot save the article'
          });
        }

        Articles.events.publish('create', {
          description: req.user.name + ' created ' + req.body.title + ' article.'
        });

        res.json(article);
      });
    },
    /**
     * List of Articles
     */
    all: function(req, res) {

      Article.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot list the articles'
          });
        }

        res.json(articles)
      });

    },

    getArticle: function (req, res) {

      Article.findOne({_id: req.params.articleId}).exec(function(err, article) {
        if(err) {
          return res.status(500).json({
            error: 'Cannot list the articles'
          });
        }

        res.json(article);
      });

    }
  };
}

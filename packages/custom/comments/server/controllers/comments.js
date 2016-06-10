'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Comment = mongoose.model('Comment'),
  _ = require('lodash');

module.exports = function(Articles) {

  return {

    /**
     * Create a comment
     */
    create: function(req, res) {
      var comment = new Comment();
      comment.comment = req.body.comment;
      comment.article = req.body.articleId;
      comment.user = req.user;

      comment.save(function(err) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: 'Cannot save the comment'
          });
        }

        res.json(comment);
      });
    },
    /**
     * List of Comments
     */
    all: function(req, res) {

      Comment.find({article: req.params.articleId}).sort('-created')
        .populate('article', 'title').populate('user', 'name username').exec(function(err, comments) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot list the comments'
          });
        }

        res.json(comments)
      });

    }
  };
}

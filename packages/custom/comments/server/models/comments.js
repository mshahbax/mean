'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Comments Schema
 */
var CommentsSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  article: {
    type: Schema.ObjectId,
    ref: 'Article'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
CommentsSchema.path('comment').validate(function(comment) {
  return !!comment;
}, 'Comment cannot be blank');

/**
 * Statics
 */
CommentsSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'id name username').populate('article', 'id title').exec(cb);
};

mongoose.model('Comment', CommentsSchema);

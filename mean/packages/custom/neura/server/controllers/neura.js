/**
 * Module dependencies.
 */

/*
var mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  _ = require('lodash');
*/

/**
 * Show an article
 */
exports.get = function(req, res) {
  console.log('x');
  res.json(req.article);
};

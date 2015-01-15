'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
    Climate   = mongoose.model('Climate');

/**
 * Find climate by id or slug
 */
exports.climate = function(req, res, next, id) {
  Climate.findOne({ _id: id }).exec(function(err, climate) {
    if (err) return next(err);
    if (!climate) return next(new Error('Failed to load climate ' + id));

    req.climate = climate;
    next();
  });
};

/**
 * Create a climate
 */
exports.create = function(req, res) {
  var climate = new Climate(req.body);

  climate.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the climate'
      });
    }
    res.json(climate);
  });
};

/**
 * Update an climate
 */
exports.update = function(req, res) {
  var climate = req.climate;

  climate = _.extend(climate, req.body);

  climate.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the climate'
      });
    }
    res.json(climate);
  });
};

/**
 * Delete an climate
 */
exports.destroy = function(req, res) {
  var climate = req.climate;

  climate.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the climate'
      });
    }
    res.json(climate);
  });
};

/**
 * Show an climate
 */
exports.show = function(req, res) {
  var climate = req.climate;
  res.json(req.climate);
};

exports.all = function(req, res) {
  var find = {};
  if(req.query.roomID) {
    find.roomID = req.query.roomID;
  }

  Climate.find(find).exec(function(err, climates) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the climates'
      });
    }
    res.json(climates);
  });
};
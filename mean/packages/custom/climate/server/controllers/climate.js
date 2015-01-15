'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
    Climate   = mongoose.model('Climate'),
    neuraAPI  = require('../neura/neuraAPI').init(),
    _         = require('lodash');

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

exports.neuraStat = function(req, res) {
  neuraAPI.getGlucose(function(err, resp, glucose) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the glucose'
      });
    }

    glucose = JSON.parse(glucose);
    neuraAPI.getTodaySummary(function(err, resp, summary) {
      if (err) {
        return res.status(500).json({
          error: 'Cannot list the summary'
        });
      }

      summary = JSON.parse(summary);
      Climate.findOne({}, {}, { sort: { 'created' : -1 } }, function(err, climate) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot get the climate'
          });
        }

        var data = {
          date: new Date(),
          glucose: glucose.data.value,
          steps: summary.data.steps,
          calories: summary.data.calories,
          sleepDuration: summary.data.sleepData.length
        };
        var workout = workoutCost(climate.temp, data.calories, data.sleepDuration);
        workout.precentage = workoutPrecentage(data.glucose,workout);
        data.workout = workout;

        res.json(data);
      });
    });
  });
};

function workoutCost(temp, cal, sleep) {
  var multipliers = {
    temp: (temp/180)+1,
    cal: cal/7000,
    sleep: (7.5-sleep)/3.2
  };
  var multiply = multipliers.temp+multipliers.cal+multipliers.sleep;
  return {
    min: 20*multiply,
    max: 50*multiply
  };
}
function workoutPrecentage(glou, cost){
  var maxWorkout = glou - 60;
  return (maxWorkout*100)/(cost.max);
}
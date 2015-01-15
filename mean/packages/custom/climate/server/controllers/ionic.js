'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
    neuraAPI  = require('../neura/neuraAPI').init();

exports.all = function(req, res) {
  neuraAPI.getGlucose().on('response', function(glucose) {
    neuraAPI.getTodaySummary().on('response', function(summary) {
      var data = {
        date: new Date(),
        glucose: glucose.data.value,
        steps: summary.data.steps,
        calories: summary.data.calories,
        sleepDuration: summary.data.sleepData.length
      };
    });
  });
};

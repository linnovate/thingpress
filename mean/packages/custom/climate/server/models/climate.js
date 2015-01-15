'use strict';
/**
 * Module dependencies.
 */

var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;
/**
 * Climate Schema
 */
var ClimateSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  roomID: String,
  temp: Number,
  humid: Number
});


mongoose.model('Climate', ClimateSchema);
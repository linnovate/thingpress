var request = require('request');

function date2day(date) {
  return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
}

module.exports = {
  host: '',
  port: '',
  path: '',
  clientID: '',
  init: function(config) {
    if(config === undefined) {
      config = require("../config/neura");
    }
    this.host = config.host;
    this.path = config.path;
    this.port = config.port;
    this.access_key = config.access_key;

    return this;
  },
  getPath: function() {
    return "https://" + this.host + ':' + this.port + '/' + this.path;
  },
  getResource: function(resourse) {
    return this.getPath() + resourse;
  },
  getDaily: function(date,cb) {
    var data = {
      uri: this.getResource('users/profile/daily_summary'),
      auth: {
        bearer: this.access_key
      },
      form: {
        date: date2day(date)
      }
    };
    return request.get(data,cb);
  },
  getTodaySummary: function(cb) {
    return this.getDaily(new Date(),cb);
  },
  getGlucose: function(cb) {
    var data = {
      uri: this.getResource('users/profile/measurements/glucose'),
      auth: {
        bearer: this.access_key
      }
    };
    return request.get(data,cb);
  }
};
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
    return "http://" + this.host + ':' + this.port + '/' + this.path;
  },
  getResource: function(resourse) {
    return this.getPath() + resourse;
  },
  getDaily: function(date) {
    var data = {
      uri: this.getResource('users/profile/daily_summary'),
      bearer: this.access_key,
      form: {
        date: date2day(date)
      }
    };
    return request.get(data);
  },
  getTodaySummary: function() {
    return this.getDaily(new Date());
  },
  getGlucose: function() {
    var data = {
      uri: this.getResource('users/profile/measurements/glucose'),
      bearer: this.access_key
    };
    return request.get(data);
  }
};
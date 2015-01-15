var  meanApi = {
  host: '',
  port: '',
  path: '',
  clientID: '',
  request: null
};

meanApi.prototype.constructor = function(config) {
  if(config === undefined) {
    config = require("./config");
  }
  this.host = config.host;
  this.path = config.path;
  this.port = config.port;
  this.clientID = config.clientID;
  this.request = require('request');
};

meanApi.getPath = function() {
  return "http://" + this.host + ':' + this.port + '/' + this.path + '/';
};
meanApi.getResource = function(resourse) {
  return this.getPath() + resourse;
};
meanApi.sendTemperature = function(deg) {
  return this.request.post({
    uri: this.getResource('temp'),
    form: {
      client: this.clientID,
      temp: deg
    }
  });
};
meanApi.sendHumidity = function(humidity) {
  return this.request.post({
    uri: this.getResource('humidity'),
    form: {
      client: this.clientID,
      humidity: humidity
    }
  });
};


exports = meanApi;
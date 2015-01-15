var request = require('request');

exports = {
  host: '',
  port: '',
  path: '',
  clientID: '',
  constructor: function(config) {
    if(config === undefined) {
      config = require("./config");
    }
    this.host = config.host;
    this.path = config.path;
    this.port = config.port;
    this.clientID = config.clientID;
  },
  getPath: function() {
    return "http://" + this.host + ':' + this.port + '/' + this.path + '/';
  },
  getResource: function(resourse) {
    return this.getPath() + resourse;
  },
  sendTemperature: function(deg) {
    return request.post({
      uri: this.getResource('temp'),
      form: {
        client: this.clientID,
        temp: deg
      }
    });
  },
  sendHumidity: function(humidity) {
    return request.post({
      uri: this.getResource('humidity'),
      form: {
        client: this.clientID,
        humidity: humidity
      }
    });
  }
};
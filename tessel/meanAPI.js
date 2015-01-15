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
    this.roomID = config.roomID;
  },
  getPath: function() {
    return "http://" + this.host + ':' + this.port + '/' + this.path + '/';
  },
  getResource: function(resourse) {
    return this.getPath() + resourse;
  },
  send: function(climate) {
    return request.post({
      uri: this.getResource('climate'),
      form: {
        roomID: this.roomID,
        humid: climate.humid,
        temp: climate.temp
      }
    });
  }
};
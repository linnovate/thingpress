var request = require('request');
module.exports = {
  host: '',
  port: '',
  path: '',
  clientID: '',
  init: function(config) {
    if(config === undefined) {
      config = require("./config");
    }
    this.host = config.host;
    this.path = config.path;
    this.port = config.port;
    this.roomID = config.roomID;

    return this;
  },
  getPath: function() {
    return "http://" + this.host + ':' + this.port + '/' + this.path;
  },
  getResource: function(resourse) {
    return this.getPath() + resourse;
  },
  send: function(climate) {
    var data = {
      uri: this.getResource('climate'),
      form: {
        roomID: this.roomID,
        humid: climate.humid,
        temp: climate.temp
      }
    };
    return request.post(data);
  }
};
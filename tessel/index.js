var tessel = require('tessel');
var climatelib = require('climate-si7020');
var meanAPI = require("./meanAPI");

var climate = climatelib.use(tessel.port['A']);


climate.on('ready', function () {
  console.log('Connected to si7020');

  // Loop forever
  setImmediate(function loop () {
    climate.readTemperature('c', function (err, temp) {
      climate.readHumidity(function (err, humid) {
        console.log('Degrees:', temp.toFixed(4) + 'C', 'Humidity:', humid.toFixed(4) + '%RH');
        meanAPI.send({
          temp: temp.toFixed(4),
          humid: humid.toFixed(4)
        });
        setTimeout(loop, 1000);
      });
    });
  });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});
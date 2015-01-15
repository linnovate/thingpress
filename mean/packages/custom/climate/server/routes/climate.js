'use strict';

var climate = require('../controllers/climate');

// The Package is past automatically as first parameter
module.exports = function(Climate, app, auth, database) {

  app.route('/api/climate')
    .get(climate.all)
    .post(climate.create)
  ;

  // Show single
  app.route('/api/climate/:climate')
    .get(climate.show)
    .put(climate.update) //edit only with id
    .delete(climate.destroy) //delete only with id
  ;

  app.route('/api/neuraStat')
    .get(climate.neuraStat)
  ;

  app.param('climate', climate.climate);
};

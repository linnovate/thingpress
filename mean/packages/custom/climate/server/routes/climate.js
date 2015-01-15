'use strict';

// The Package is past automatically as first parameter
module.exports = function(Climate, app, auth, database) {

  app.get('/api/climate', function(req, res, next) {
    res.send('Anyone can access this');
  });

};

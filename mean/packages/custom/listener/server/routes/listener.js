'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Listener, app, auth, database) {

  app.get('/listener/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/listener/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/listener/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/listener/example/render', function(req, res, next) {
    Listener.render('index', {
      package: 'listener'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};

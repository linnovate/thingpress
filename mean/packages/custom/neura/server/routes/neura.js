
neura = require('../controllers/neura');
/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Neura, app, auth, database) {
  app.route('/neura/dashboard')
    .get(neura.get)
  app.route('/neura/settings')
    .get(neura.get)
};

  app.get('/neura/example/render', function(req, res, next) {
    Neura.render('index', {
      package: 'neura'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });

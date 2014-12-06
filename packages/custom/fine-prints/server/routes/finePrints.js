'use strict';

// The Package is past automatically as first parameter
module.exports = function(FinePrints, app, auth, database) {

  app.get('/finePrints/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/finePrints/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/finePrints/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/finePrints/example/render', function(req, res, next) {
    FinePrints.render('index', {
      package: 'fine-prints'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};

'use strict';

var finePrints = require('../controllers/finePrints');

// FinePrints authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.article.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

// The Package is past automatically as first parameter
module.exports = function(FinePrints, app, auth, database) {

    app.route('/finePrints')
        .get(finePrints.all)
        .post(auth.requiresLogin, finePrints.create);
    app.route('/finePrints/:finePrintId')
        .get(finePrints.show)
        .put(auth.requiresLogin, hasAuthorization, finePrints.update)
        .delete(auth.requiresLogin, hasAuthorization, finePrints.destroy);

    // Finish with setting up the finePrintId param
    app.param('finePrintId', finePrints.finePrint);

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

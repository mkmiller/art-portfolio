'use strict';

var artwork = require('./controllers/artwork'),
    api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    uploads = require('./controllers/uploads');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes

  // app.post('/api/users', users.create);
  app.put('/api/users', session.restrict, users.changePassword);
  app.get('/api/users/me', session.restrict, users.me);
  app.get('/api/users/:id', session.restrict, users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.restrict, session.logout);

  // File uploads routes
  app.post('/api/upload', session.restrict, uploads.upload);

  // Artwork display routes
  // app.post('/artwork', artwork.create);
  app.get('/api/artwork', artwork.list);
  app.get('/api/artwork/:id', artwork.get);
  app.delete('/api/artwork/:id', session.restrict, artwork.delete);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};

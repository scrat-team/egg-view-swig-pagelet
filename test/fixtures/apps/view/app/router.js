'use strict';

// app/router.js
module.exports = app => {
  app.get('/render', app.controller.home.render);
  app.get('/renderString', app.controller.home.renderString);
};

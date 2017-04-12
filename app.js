'use strict';
const path = require('path');
const scratSwig = require('scrat-swig');

module.exports = app => {
  const swigPagelet = app.config.swigPagelet;
  scratSwig.configure({
    swig: app.swig,
    map: swigPagelet.manifest,
  });
  // monkey patch `escape` with `app.helper.escape` provided by `egg-security` for better performance
  const escape = app.Helper.prototype.escape;
  if (escape) {
    app.swig.filters.escape = app.swig.filters.e = escape;
    app.swig.setFilter('escape', escape);
    app.swig.setFilter('e', escape);
  }

  const filters = app.loader.loadFile(path.join(app.baseDir, 'app/extend/filter.js')) || {};
  for (const name of Object.keys(filters)) {
    app.swig.setFilter(name, filters[name]);
  }

};

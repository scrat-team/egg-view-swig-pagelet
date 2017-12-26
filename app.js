'use strict';
const path = require('path');
const scratSwig = require('scrat-swig');

module.exports = app => {
  const swigPagelet = app.config.swigPagelet;
  const config = Object.assign({ swig: app.swig, map: swigPagelet.manifest }, swigPagelet);
  scratSwig.configure(config);

  // monkey patch `escape` with `app.helper.escape` provided by `egg-security` for better performance
  const escape = app.Helper.prototype.escape;
  if (escape) {
    app.swig.filters.escape = app.swig.filters.e = escape;
    app.swig.setFilter('escape', escape);
    app.swig.setFilter('e', escape);
  }

  for (const unit of app.loader.getLoadUnits()) {
    const filterPath = path.join(unit.path, 'app/extend/filter.js');
    const filters = app.loader.loadFile(filterPath) || {};
    for (const name of Object.keys(filters)) {
      app.swig.setFilter(name, filters[name]);
    }
  }

  app.pageletEngine = scratSwig;
};

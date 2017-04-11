'use strict';
const path = require('path');
const scratSwig = require('scrat-swig');
const Resource = scratSwig.Resource;

module.exports = app => {
  const root = app.config.view.root[0];
  const swigPagelet = app.config.swigPagelet;

  scratSwig.tagNames.forEach(tag => {
    const t = require('scrat-swig/lib/tags/' + tag);
    app.swig.setTag(tag, t.parse, t.compile, t.ends, t.blockLevel || false);
  });

  Resource.setRoot(root);

  app.swig.viewRoot = root;
  app.swig.setExtension('Resource', Resource);
  app.swig.setExtension('_map', Resource.loadOptions(swigPagelet.manifest));

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
  return app.swig;
};

'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {};

  config.view = {
    mapping: {
      '.tpl': 'swig',
    },
  };

  config.swigPagelet = {
    layout: 'layout/layout.tpl',
    manifest: path.join(appInfo.baseDir, 'config/manifest.json'),
  };

  return config;
};

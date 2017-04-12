'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {};

  config.view = {
    defaultExtension: '.tpl',
    mapping: {
      '.tpl': 'swig',
    },
  };

  config.swigPagelet = {
    // default layout template config for view base dir
    layout: 'layout/layout.tpl',
    // default scrat resource manifest path
    manifest: path.join(appInfo.baseDir, 'config/manifest.json'),
  };

  return config;
};

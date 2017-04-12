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

  /**
   * swigPagelet config
   * @member Config#swig
   * @property {String} [layout=layout/layout.tpl] layout template config for view base dir
   * @property {String} [manifest=${baseDir}/config/manifest.json] scrat resource manifest path
   */
  config.swigPagelet = {
    layout: 'layout/layout.tpl',
    manifest: path.join(appInfo.baseDir, 'config/manifest.json'),
  };

  return config;
};

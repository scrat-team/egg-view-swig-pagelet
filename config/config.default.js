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
   * @property {Boolean} [useLayoutTplString|true] using string template to replacing `view/page/[name].tpl` file but not for others such as datalet template files
   */
  config.swigPagelet = {
    layout: 'layout/layout.tpl',
    root: path.join(appInfo.baseDir, 'app'),
    manifest: path.join(appInfo.baseDir, 'config/manifest.json'),
    useLayoutTplString: true,
  };

  return config;
};

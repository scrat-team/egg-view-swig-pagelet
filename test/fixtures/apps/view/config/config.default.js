'use strict';
module.exports = () => {
  const config = {};

  config.keys = '123456';

  config.view = {
    defaultViewEngine: 'swig',
    mapping: {
      '.tpl': 'swig',
      '.html': 'swig',
    },
  };

  config.security = {
    csp: {
      enable: true,
    },
  };

  return config;
};

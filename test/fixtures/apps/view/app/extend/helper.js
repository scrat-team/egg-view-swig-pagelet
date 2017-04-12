'use strict';
exports.test = function(name) {
  return 'test-' + name + '@' + this.app.config.baseDir;
};

exports.test_safe = function(name) {
  return '<div>' + name + '</div>';
};

exports.someHelper = function(name) {
  return 'helper:' + name;
};

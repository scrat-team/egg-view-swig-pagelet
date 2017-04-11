'use strict';

const PAGELET_SWIG = Symbol('app#ViewPageletSwig');
const engine = require('../../lib/engine');


module.exports = {

  /**
   * swig pagelet engine
   */
  get swigPagelet() {
    if (!this[PAGELET_SWIG]) {
      this[PAGELET_SWIG] = engine(this);
    }
    return this[PAGELET_SWIG];
  },
};

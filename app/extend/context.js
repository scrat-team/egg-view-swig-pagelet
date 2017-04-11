'use strict';
const PAGELET_SWIG_VIEW = Symbol('app#PageletSwigView');
const View = require('../../lib/view');

module.exports = {
  /**
   * swig pagelet engine
   */
  get swigPageletView() {
    if (!this[PAGELET_SWIG_VIEW]) {
      this[PAGELET_SWIG_VIEW] = new View(this);
    }
    return this[PAGELET_SWIG_VIEW];
  },

  /**
   * render layout file
   * @method Context#renderPage
   * @param {String} name filename
   * @param {Object} [locals] template data
   * @param {Object} options custom params
   */
  * renderPage(name, locals, options) {
    this.body = yield this.swigPageletView.renderPage(name, locals, options);
  },
};

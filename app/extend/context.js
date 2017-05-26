'use strict';

const path = require('path');

module.exports = {
  /**
   * render layout file
   * @method Context#renderPage
   * @param {String} name filename
   * @param {Object} [locals] template data
   * @param {Object} options custom params
   */
  * render(name, locals, options = {}) {
    const config = this.app.config || {};

    const pagelets = this.get('X-Pagelets') || this.query._pagelets;
    if (pagelets) {
      this.type = 'json';
      locals._pagelets = pagelets;
    } else {
      this.type = 'html';
    }

    locals = Object.assign({}, {
      ctx: this,
      request: this.request,
      helper: this.helper,
    }, this.locals, locals);

    const layout = locals.layout || options.layout || config.swigPagelet.layout;
    const normalName = name.replace(new RegExp(`${config.view.defaultExtension}$`, ''), '');

    const fakePath = path.join(
      config.view.root[0],
      normalName.replace(/\//g, '_') + config.view.defaultExtension
    );

    const source = `{% extends '${layout}' %}{% block content %}{% require $id='page/${normalName}' %}{% endblock %}`;
    const tplFn = this.app.swig.compile(source, { filename: fakePath });

    this.body = tplFn(locals);
  },
};

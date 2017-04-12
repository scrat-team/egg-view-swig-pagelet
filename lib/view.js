'use strict';

const path = require('path');

class PageletView {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.swigPagelet = this.app.config.swigPagelet;
    this.ext = this.app.config.view.ext || 'tpl';
  }

  beforeRender(locals) {
    const pagelets = this.ctx.get('X-Pagelets') || this.ctx.query._pagelets;
    if (pagelets) {
      this.ctx.type = 'json';
      locals._pagelets = pagelets;
    } else {
      this.ctx.type = 'html';
    }
  }

  setLocals(locals) {
    return Object.assign({}, {
      ctx: this.ctx,
      request: this.ctx.request,
      helper: this.ctx.helper,
    }, this.ctx.locals, locals);
  }

  /**
   * render components/page file
   * @method View#renderPage
   * @param {String} name filename
   * @param {Object} [locals] file compile data
   * @param {Object} options custom params
   * @return {String} html
   * @protected
   */
  * renderPage(name, locals, options = {}) {
    this.beforeRender(locals);
    locals = this.setLocals(locals);
    const layout = locals.layout || options.layout || this.swigPagelet.layout;
    const normalName = name.replace(new RegExp(`.${this.ext}$`, ''), '');
    const fakePath = path.join(this.app.swig.viewRoot, normalName.replace(/\//g, '_') + '.' + this.ext);
    const source = `{% extends '${layout}' %}{% block content %}{% require $id='page/${normalName}' %}{% endblock %}`;
    const tplFn = this.app.swig.compile(source, { filename: fakePath });
    return tplFn(locals);
  }
}

module.exports = PageletView;

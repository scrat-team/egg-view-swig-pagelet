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

    /**
    view/page/ 目录下默认可以省略模板文件，默认模板字符串：
    {% extends 'layout/layout.tpl' %}
    {% block content %}
    {% require $id = 'page/[name]' %}
    {% endblock %}
    */
    let useTpl = options.useLayoutTplString != undefined ? options.useLayoutTplString : config.swigPagelet.useLayoutTplString;
    // 模板在多级目录下时，不使用默认模板字符串
    if (/\//.test(name)) useTpl = false;

    if (useTpl) {
      const fakePath = path.join(
        config.view.root[0],
        normalName.replace(/\//g, '_') + config.view.defaultExtension
      );
      const source = `{% extends '${layout}' %}{% block content %}{% require $id='page/${normalName}' %}{% endblock %}`;
      const tplFn = this.app.swig.compile(source, { filename: fakePath });

      this.body = tplFn(locals)
    } else {
      const renderFile = this.app.swig.renderFile;
      const render = () => new Promise((resolve, reject) => {
        let p = path.join(config.view.root[0], `page/${normalName}` + config.view.defaultExtension);
        renderFile(p, locals, (err, content) => {
          if (err) reject(err)
          else resolve(content)
        })
      });
      const content = yield render();

      this.body = content;
    }
  },
};

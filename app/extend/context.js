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
  async render(name, locals, options = {}) {
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
    自动扩展layout模板
    view/page/ 目录下默认可以省略模板文件，默认模板字符串：
    {% extends 'layout/layout.tpl' %}
    {% block content %}
    {% require $id = 'page/[name]' %}
    {% endblock %}
    */
    const autoExt = options.autoExtendLayout !== undefined ? options.autoExtendLayout : config.swigPagelet.autoExtendLayout;

    if (autoExt) {
      const fakePath = path.join(
        config.view.root[0],
        normalName.replace(/\//g, '_') + config.view.defaultExtension
      );
      const source = `{% extends '${layout}' %}{% block content %}{% require $id='page/${normalName}' %}{% endblock %}`;
      const tplFn = this.app.swig.compile(source, { filename: fakePath });

      this.body = tplFn(locals);
    } else {
      // 在不自动扩展layout模板的情况下，render的模板必须放到view/page/ 目录下！
      const renderFile = this.app.swig.renderFile;
      const render = () => new Promise((resolve, reject) => {
        const p = path.join(config.view.root[0], `page/${normalName}` + config.view.defaultExtension);
        renderFile(p, locals, (err, content) => {
          if (err) reject(err);
          else resolve(content);
        });
      });
      const content = await render();

      this.body = content;
    }
  },
};

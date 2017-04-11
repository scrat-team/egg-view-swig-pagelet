# egg-view-pagelet-swig

Support the view rendering implementation of the scrat pagelet. Depends on the [egg-view-swig](https://github.com/eggjs/egg-view-swig ) template view engine.

Pagelet: https://github.com/scrat-team/scrat-swig

NOTE: swig is NOT MAINTAINED.

DOCS: http://node-swig.github.io/swig-templates

## Install

```bash
$ npm i egg-view-pagelet-swig --save
```

## Usage

```js
// $appname/config/plugin.js
exports.swigPagelet = {
  enable: true,
  package: 'egg-view-pagelet-swig',
};
```

Set mapping in config

```js
exports.swigPagelet = {
  // layout template for view base dir
  layout: 'layout/layout.tpl',
  // scrat resource manifest
  manifest: path.join(app.baseDir, 'config/manifest.json')
};
```

Render in controller

```js
exports.home = function* (ctx) {
  yield ctx.renderPage('home.tpl', { list });
};
```
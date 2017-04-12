# egg-view-swig-pagelet

Support the view rendering implementation of the scrat pagelet. Depends on the [egg-view-swig](https://github.com/eggjs/egg-view-swig ) template view engine.

Pagelet: https://github.com/scrat-team/scrat-swig

NOTE: swig is NOT MAINTAINED.

DOCS: http://node-swig.github.io/swig-templates

## Install

```bash
$ npm i egg-view-swig-pagelet --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.swigPagelet = {
  enable: true,
  package: 'egg-view-swig-pagelet',
};
```

```js
// {app_root}/config/config.default.js
exports.swigPagelet = {
  // default layout template config for view base dir
  // layout: 'layout/layout.tpl',
  // default scrat resource manifest path
  // manifest: path.join(app.baseDir, 'config/manifest.json')
};
```

Render in controller

```js
exports.home = function* (ctx) {
  yield ctx.render('home.tpl', { list });
};
```

## Configuration

see [config/config.default.js](config/config.default.js) for more detail.

## Questions & Suggestions

Please open an issue [here](https://github.com/scrat-team/egg-view-swig-pagelet/issues).

## License

[MIT](LICENSE)
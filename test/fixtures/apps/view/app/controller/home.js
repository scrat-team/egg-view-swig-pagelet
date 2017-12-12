'use strict';

const mockData = require('../../mocks/list.json');
const detail = require('../../mocks/news.json');

exports.render = function* (ctx) {
  const { query } = this;
  const useLayoutTplString = query.useTpl !== '0';

  yield ctx.render('list.tpl', {
    ctoken: ctx.cookies.get('ctoken'),
    list: mockData.list,
  }, { useLayoutTplString });
};

exports.renderString = function* (ctx) {
  ctx.body = yield ctx.renderString(
    '<div>ID:{{user.id}},Name:{{user.name}}</div>',
    { user: { id: 100, name: 'sky' } },
    { viewEngine: 'swig' }
  );
};

exports.renderDetail = function* (ctx) {
  yield ctx.render('datalet/detail', Object.assign({
    ctoken: ctx.cookies.get('ctoken'),
  }, detail));
};

'use strict';

const mockData = require('../../mocks/list.json');

exports.render = function* (ctx) {
  yield ctx.render('list.tpl', {
    ctoken: ctx.cookies.get('ctoken'),
    list: mockData.list,
  });
};

exports.renderString = function* (ctx) {
  ctx.body = yield ctx.renderString(
    '<div>ID:{{user.id}},Name:{{user.name}}</div>',
    { user: { id: 100, name: 'sky' } },
    { viewEngine: 'swig' }
  );
};

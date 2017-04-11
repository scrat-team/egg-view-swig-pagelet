'use strict';

const mm = require('egg-mock');
const expect = require('expect.js');
const request = require('supertest');

describe('test/view/pagelet.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/view',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should render', done => {
    request(app.callback())
      .get('/render')
      .expect(200)
      .expect('Hi,EGG swig render-----egg view plugin for swig', done);
  });

  it('should renderString', done => {
    request(app.callback())
      .get('/renderString')
      .expect('Content-Type', /text\/html/)
      .expect(/<div>ID:100,Name:sky<\/div>/)
      .expect(200, done);
  });

  it('should renderPage', done => {
    request(app.callback())
      .get('/renderPage')
      .expect('Content-Type', /text\/html/)
      .expect(/hi,welcome egg world/)
      .expect(/<div class="name">ID:/)
      .expect(200, done);
  });

  it('should request renderPage pagelet json', function* () {
    const result = yield request(app.callback())
      .get('/renderPage?_pagelets=layout')
      .expect('Content-Type', /application\/json/)
      .expect(200);

    const body = result.body;
    expect(body).to.have.keys('html', 'css', 'js', 'script', 'data', 'title', 'hash');
    expect(body.html.layout).to.match(/<div class="name">ID:/);
    expect(body.html.layout).to.match(/helper:###test/);
    expect(body.css).to.eql([ '/public/c/widget/card/card.css', '/public/c/widget/list/list.css' ]);
    expect(body.js).to.eql([ '/public/c/widget/boot/boot.js', '/public/c/widget/list/list.js' ]);
  });
});

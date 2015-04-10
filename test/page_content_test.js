/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

define(function (require) {
  var Backbone = require('backbone');
  var PageContent = require('models/page_content');

  // ---------------------------------------------
  QUnit.module("Faking response data", {
    beforeEach: function () {
      this.server = sinon.fakeServer.create();
    },
    afterEach: function () {
      this.server.restore();
    }
  });

  QUnit.test("Fetching PageContent", function () {
    var model = new PageContent({ id: 'some/index' });
    equal(model.get('content'), '<p>Content</p>', 'new model has default content');

    var testData = { id: 'some/index',  about: 'some/index', content: '<h1>Test</h1>' };
    this.server.respondWith("GET", "/backend/content/some%2Findex",
                            [200, { "Content-Type": "application/json" },
                            JSON.stringify(testData)]);
    model.fetch();
    this.server.respond();

    equal(model.get('about'), 'some/index', 'fetched model has expected id');
    equal(model.get('content'), '<h1>Test</h1>', 'fetched model has expected content');
  });

  QUnit.test("Updating PageContent", function () {

    var model = new PageContent({about: '/', content: '<h1>Empty</h1>'});
    var testData = { about: '/', content: '<h1>Test</h1>', message: 'ok' };

    equal(model.get('content'), '<h1>Empty</h1>', 'initialized model has expected attributes');

    this.server.respondWith("POST", "/backend/content",
                            [200, { "Content-Type": "application/json" },
                            JSON.stringify(testData)]);
    model.save();
    this.server.respond();

    equal(model.get('content'), '<h1>Test</h1>', 'updated model has expected attributes');
  });

  QUnit.module("Model unit test");

  QUnit.test("Initialize a model from the DOM", function () {

    var model = new PageContent();
    equal(model.get('content'), '<p>Content</p>', 'new model has default content');

    var $testEl = $('<div about="test">this is content</div>');
    model.loadFromElement($testEl);

    equal(model.get('content'), 'this is content', 'loaded model has expected content');
    equal(model.get('id'), 'test', 'loaded model has expected id');
    equal(model.get('about'), 'test', 'loaded model has expected about');
  });
});

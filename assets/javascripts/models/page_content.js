/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

define('models/page_content', [
  'module',
  'jquery',
  'underscore',
  'backbone',
  'backbone.memento'
], function (module, $, _, Backbone, Memento) {
  var backendPathPrefix = '/polly/';
  if (typeof module.config()['backendPathPrefix'] !== 'undefined') {
    backendPathPrefix = module.config()['backendPathPrefix'];
  }
  var PageContent = Backbone.Model.extend({
    urlRoot: backendPathPrefix + 'content',
    defaults: {
      about: null,
      content: "<p>Content</p>"
    },
    initialize: function(){
      var memento = new Backbone.Memento(this);
      _.extend(this, memento);
    },
    loadFromElement: function ($el) {
      this.set('id', $el.attr('about'));
      this.set('about', $el.attr('about'));
      this.set('content', $el.html());
    }
  });
  return PageContent;
});


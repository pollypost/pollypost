/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

define('views/page_content', [
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  var PageContentView = Backbone.View.extend({
    initialize: function () {
      // on change/sync/...
      this.listenTo(this.model, "change", this.render);
    },
    render: function() {
      this.$el.html( this.model.get('content') );
      return this;
    }
  });
  return PageContentView;
});

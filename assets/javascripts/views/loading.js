/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

define('views/loading', [
  'jquery',
  'backbone',
  'text!templates/loading.html'
], function ($, Backbone, loadingTemplate) {
  var LoadingView = Backbone.View.extend({
    id: 'modal-loading',
    className: 'polly',
    template: _.template(loadingTemplate),
    events: {
      'hidden.bs.modal .modal': function () {
        this.remove();
      }
    },
    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
  return LoadingView;
});


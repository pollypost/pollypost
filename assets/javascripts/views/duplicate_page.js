/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

define('views/duplicate_page', [
  'jquery',
  'underscore',
  'backbone',
  'text!templates/duplicate_page.html',
  'models/page_content'
], function ($, _, Backbone, duplicatePageTemplate, PageContent) {
  var DuplicatePageView = Backbone.View.extend({
    id: 'modal-duplicatepage',
    className: 'polly',
    template: _.template(duplicatePageTemplate),
    initialize: function(options) {
      this.originalPage = options['original']
    },
    events: {
      'click #duplicate-new-page': 'createDuplicatePage',
      'hidden.bs.modal .modal': function () {
        this.remove();
      }
    },
    render: function() {
      this.$el.html(this.template({}));
      return this;
    },
    createDuplicatePage: function() {
      var newabout = this.$el.find('[name=about]').val();
      // clone model
      var newpage = this.originalPage.clone();
      newpage.set('about', newabout);
      newpage.unset('id');

      newpage.save({}, {
        error: function (model, response, options) {
          var text = typeof response['responseJSON'] !== 'undefined' ? response['responseJSON']['message'] : 'Arrgh! Error.';
          require(['jquery.noty'], function (noty) {
            noty({
              text: text,
              layout: 'bottomRight',
              timeout: 2000,
              theme: 'defaultTheme',
              type: 'error'
            });
          });
        },
        success: function (model, response, options) {
          var text = typeof response !== 'undefined' ? response['message'] : 'Yay! Success.';
          console.log(response);
          require(['jquery.noty'], function (noty) {
            noty({
              text: text,
              layout: 'bottomRight',
              timeout: 2000,
              theme: 'defaultTheme',
              type: 'success'
            });

            setTimeout(function() {
              window.location.pathname = response['about'];
            }, 300);
          });
        }
      });
    },
  });
  return DuplicatePageView;
});


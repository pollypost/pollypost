/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

define('views/new_page', [
  'jquery',
  'underscore',
  'backbone',
  'text!templates/new_page.html',
  'models/page_content'
], function ($, _, Backbone, newPageTemplate, PageContent) {
  var NewPageView = Backbone.View.extend({
    id: 'modal-newpage',
    className: 'polly',
    template: _.template(newPageTemplate),
    events: {
      'click #create-new-page': 'createNewPage',
      'hidden.bs.modal .modal': function () {
        this.remove();
      }
    },
    render: function() {
      this.$el.html(this.template({}));
      return this;
    },
    createNewPage: function() {
      var attrs = _.map(this.$el.find('.page-attribute'),function(attrEl) {
        var $attr = $(attrEl);
        return { attribute: $attr.attr('name'), value: $attr.val() };
      });
      var reducedAttrs = _.reduce(attrs, function(memo, attr) {
        memo[attr['attribute']] = attr['value'];
        return memo;
      }, {});
      var newpage = new PageContent();
      newpage.set('about', reducedAttrs['about']);
      newpage.set('content', reducedAttrs['content']);
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
  return NewPageView;
});


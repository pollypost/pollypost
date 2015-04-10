/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

define('views/settings', [
  'jquery',
  'underscore',
  'backbone',
  'text!templates/settings.html'
], function ($, _, Backbone, settingsTemplate) {
  var SettingsView = Backbone.View.extend({
    id: 'modal-settings',
    className: 'polly',
    template: _.template(settingsTemplate),
    events: {
      'click #apply-settings': 'applySettings',
      'hidden.bs.modal .modal': function () {
        this.remove();
      }
    },
    applySettings: function() {
      var attrs = _.map(this.$el.find('.page-attribute'),function(attrEl) {
        var $attr = $(attrEl);
        return { attribute: $attr.attr('name'), value: $attr.val() };
      });
      var reducedAttrs = _.reduce(attrs, function(memo, attr) {
        memo[attr['attribute']] = attr['value'];
        return memo;
      }, {});
      this.model.set('attributes', reducedAttrs);
    },
    render: function() {
      this.$el.html(this.template({
        header: '',
        body: '',
        footer: ''
      }));
      this.renderPageSettingsMode();
      return this;
    },
    renderPageSettingsMode: function() {
      this.$el.find('.modal-footer').html(
        '<button type="button" class="btn btn-default cancel-html-editor" data-dismiss="modal">Cancel</button>' +
        '<button type="button" class="btn btn-primary save-html-editor" data-dismiss="modal" id="apply-settings">Apply</button>'
      );
      this.$el.find('.modal-header').html(
        '<h4 class="modal-title" id="myModalLabel">Settings</h4>'
      );
      if (!this.model.get('attributes')) {
        var that = this;
        this.model.fetch({
          error: function (model, response, options) {
          },
          success: function (model, response, options) {
            if (typeof response['attributes'] !== 'undefined') {
              model.set('attributes', response['attributes']);
              that.setBodyMarkup();
            }
          }
        });
      } else {
        this.setBodyMarkup();
      }
    },
    setBodyMarkup: function () {
      var attributes = this.model.get('attributes');
      var that = this;
      this.$el.find('.modal-body').html(
        _.reduce(_.keys(attributes), function(markup, key) {
          return markup + that.markupForAttribute(key, attributes[key]);
        }, '')
      );
    },
    markupForAttribute: function (attribute, value) {
      var markup = '<div class="form-group">' +
      '  <label for="polly-attribute-'+attribute+'">'+attribute+'</label>' +
      '  <input id="polly-attribute-'+attribute+'" type="text" name="'+attribute+'" value="'+value+'" class="page-attribute form-control input-lg">' +
      '</div>';
      return markup;
    }
  });
  return SettingsView;
});


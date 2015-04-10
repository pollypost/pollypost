/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

define('views/bar_view_mode', [
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'text!templates/bar_view_mode.html'
], function ($, _, Backbone, Bootstrap, viewModeTemplate) {
  var viewModeView = Backbone.View.extend({
    template: _.template(viewModeTemplate),
    className: 'container-fluid bar-inner view-mode',
    render: function() {
      this.$el.html(this.template({}));

      this.$('[data-toggle="popover"]').popover();

      if (typeof $('.edit-this')['ckeditor'] !== 'undefined') {
        $('.edit-this').ckeditor().editor.removeListener('blur');
        // does editor.destroy() unbind all events?
        $('.edit-this').ckeditor().editor.destroy();
        $('.edit-this').prop('contenteditable', false);

        // clean up our listener
        $('.edit-this').off('input');
      }

      return this;
    }
  });
  return viewModeView;
});


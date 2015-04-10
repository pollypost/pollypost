/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

define('views/html_editor', [
  'jquery',
  'underscore',
  'backbone',
  'text!templates/html_editor.html'
], function ($, _, Backbone, htmlEditorTemplate) {
  var HtmlEditorView = Backbone.View.extend({
    id: 'modal-htmleditor',
    className: 'polly',
    template: _.template(htmlEditorTemplate),
    initialize: function(options) {
      this.pagecontent = options['pagecontent'];
      this.loadingDeferred = options['loadingDeferred'];
    },
    events: {
      'hidden.bs.modal .modal': function () {
        this.remove();
      }
    },
    render: function() {
      this.$el.html(this.template());

      var deferred = this.loadingDeferred;
      var pagecontent = this.pagecontent;
      var that = this;
      require(['ace/ace'], function (ace) {
        // Ace editor settings
        var editor = ace.edit(that.$('#editor')[0]);
        var fittingLines = function() {
          var spacing = 15; // to be on the safe side
          var editorLineHeight = 16; // to provide default value
          if (editor.renderer.lineHeight > 1 ) {
            editorLineHeight = editor.renderer.lineHeight;
          };
          spacing += parseFloat($(".modal-dialog").css("margin-top"));
          spacing += parseFloat($(".modal-dialog").css("margin-bottom"));
          spacing += $(".modal-header").is(":visible") ? $(".modal-header").outerHeight() : 0;
          spacing += $(".modal-footer").is(":visible") ? $(".modal-footer").outerHeight() : 0;

          return ($(window).height() - spacing) / editorLineHeight;
        }
        editor.setTheme("ace/theme/clouds");
        editor.getSession().setMode("ace/mode/html");
        editor.setOptions({
          wrap: true,
          tabSize: 2,
          fontSize: 16,
          showInvisibles: true,
          showPrintMargin: false,
          minLines: 5,
          maxLines: fittingLines()
        });
        editor.setValue(pagecontent.get('content'));
        editor.gotoLine(1);

        // TODO load not only the first found
        var $htmlEditor = that.$('#html-editor');
        $htmlEditor.modal('show');

        // apply changes in html editor
        that.$('.save-html-editor', $htmlEditor).on('click', function() {
          pagecontent.set('content', editor.getValue());
        });

        // discard changes in html editor by deleting all content
        that.$('.cancel-html-editor', $htmlEditor).on('click', function() {
          editor.setValue();
        });
        // also discard when ESC is used to close the html editor
        $htmlEditor.on('show.bs.modal', function() {
          // bootstrap's modal.js takes care of unbindig the 'keyup.modal' event
          $(document).on('keyup.modal', function ( e ) {
            if ( e.which == 27 ) {
              editor.setValue();
            }
          });
        });

        // resize modal
        var resizeEditor = function(){
          editor.setOptions({
            maxLines: fittingLines()
          });
          editor.resize();
        }
        $htmlEditor.on('show.bs.modal', function() {
          $(window).on('resize', resizeEditor);
          $('body').addClass("split-screen-editor");
        });
        $htmlEditor.on('shown.bs.modal', function() {
          resizeEditor();
        });
        $htmlEditor.on('hidden.bs.modal', function() {
          $(window).off('resize', resizeEditor);
          $('body').removeClass("split-screen-editor");
        });

        // resolve the deferred so that the loading modal is allowed to disappear
        deferred.resolve();
      });

      return this;
    },
  });
  return HtmlEditorView;
});


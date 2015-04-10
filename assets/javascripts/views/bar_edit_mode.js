/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

define('views/bar_edit_mode', [
  'module',
  'jquery',
  'underscore',
  'backbone',
  'text!templates/bar_edit_mode.html'
], function (module, $, _, Backbone, editModeTemplate) {
  // configure module
  var imageStorage = null; // default value
  if (typeof module.config()['imageStorage'] !== 'undefined') {
    imageStorage = module.config()['imageStorage'];
  }
  var editModeView = Backbone.View.extend({
    template: _.template(editModeTemplate),
    className: 'container-fluid bar-inner edit-mode',
    initialize: function(options) {
      this.pagecontent = options['pagecontent'];
      this.pagecontentview = options['pagecontentview'];
      this.loadingDeferred = options['loadingDeferred'];
    },
    render: function() {
      this.$el.html(this.template({}));

      var pagecontent = this.pagecontent;
      var pagecontentview = this.pagecontentview;
      var deferred = this.loadingDeferred;
      require([
        'ckeditor/adapters/jquery'
      ], function () {
        CKEDITOR.disableAutoInline = true;
        // TODO find right place to config CKEditor with requirejs
        //CKEDITOR.stylesSet.add( 'default', [
        //  // Block Styles
        //  //{ name: 'Red Title', element: 'h3', styles: { 'color': 'Red' } },
        //  { name: 'Narrow', element: 'div', attributes: { 'class': 'col-md-6 col-md-offset-3' } },

        //  // Inline Styles
        //  { name: 'Marker', element: 'span', attributes: { 'class': 'marker' } },
        //  { name: 'Button link', element: 'a', attributes: { 'class': 'btn btn-default' } },

        //  // Object Styles
        //  {
        //    name: 'Image thumbnail',
        //    element: 'img',
        //    attributes: {
        //      'class': 'img-thumbnail'
        //    }
        //  }
        //] );


        // UploadCare general config
        UPLOADCARE_LOCALE = "en";
        UPLOADCARE_TABS = "file url facebook gdrive dropbox instagram evernote flickr skydrive";
        // the UPLOADCARE_PUBLIC_KEY should be set by the backend

        // CKEditor config
        var ckeditorConfig = {
          uploadcare: { crop: '500x300 minimum' },
          removeButtons: 'Cut,Copy,Paste,Anchor,Underline,Strike,Subscript,Superscript,JustifyBlock',
          removeDialogTabs: '',
          allowedContent: true, // disables content filtering - TODO: more specific filters?
          toolbarGroups: [
            { name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
            { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
            { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
            { name: 'forms' },
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
            '/',  // Line break
            { name: 'links' },
            { name: 'insert' },
            { name: 'styles' },
            { name: 'colors' },
            { name: 'tools' },
            { name: 'others' },
            { name: 'about' }
          ]
        };
        // remove uploadcare plugin if not enabled
        if (!imageStorage || imageStorage !== 'uploadcare') {
          // when not set already
          if (typeof ckeditorConfig['removePlugins'] === 'undefined') {
            ckeditorConfig['removePlugins'] = 'uploadcare';
          } else {
            // TODO
          }
        } else  { // remove the Image button as we are using an image storage
          ckeditorConfig['removeButtons'] = [ckeditorConfig['removeButtons'], 'Image'].join(',');
        }

        pagecontentview.$el.prop('contenteditable', true).ckeditor(ckeditorConfig);
        pagecontentview.$el.ckeditor().editor.on('change', function(e, data) {
          var content = e.editor.getData();
          // need to pass the silent option here, otherwise the CKEditor
          // will get confused by the constant model-->view changes
          pagecontent.set('content', content, { silent: true });
        });

        // resolve the deferred so that the loading modal is allowed to disappear
        deferred.resolve();
      });
      return this;
    }
  });
  return editModeView;
});


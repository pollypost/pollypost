/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

define('views/editier_bar', [
  'jquery',
  'underscore',
  'backbone',
  'views/bar_view_mode',
  'views/bar_edit_mode',
  'views/loading'
], function ($, _, Backbone, viewModeView, editModeView, LoadingView) {
  var EditierBarView = Backbone.View.extend({
    tagName: 'div',
    id: 'editier-bar',
    className: 'polly',
    initialize: function(options) {
      this.pagecontent = options['pagecontent'];
      this.pagecontentview = options['pagecontentview'];
      this.currentview = null;
    },
    events: {
      'click #edit-enable': 'renderEditMode',
      'click #edit-disable': 'renderViewMode',
      'click #open-html-editor': 'openHtmlEditor',
      'click #edit-save': 'saveContent',
      'click #open-settings': 'switchToPageSettingsMode',
      'click #add-page': 'openNewPage',
      'click #duplicate-page': 'openDuplicatePage'
    },
    render: function() {
      this.renderViewMode();
      return this;
    },
    renderViewMode: function() {
      var viewmode = new viewModeView();
      this.$el.html(viewmode.render().el);
      if (this.currentview) {
        this.currentview.remove();
      }
      this.currentview = viewmode;

      this.pagecontent.restore();
      return this;
    },
    renderEditMode: function() {
      // display a loading animation if we need more than
      // 200ms to load the view
      var deferred = $.Deferred();
      setTimeout(function() {
        if (deferred.state() === 'pending') {
          var loadingview = new LoadingView();
          $('body').append(loadingview.render().el);
          loadingview.$('.modal').modal('show');
          deferred.done(function() {
            loadingview.$('.modal').modal('hide');
          });
        }
      }, 200);

      var editmode = new editModeView({
        pagecontent: this.pagecontent,
        pagecontentview: this.pagecontentview,
        loadingDeferred: deferred
      });
      this.$el.html(editmode.render().el);
      if (this.currentview) {
        this.currentview.remove();
      }
      this.currentview = editmode;

      this.pagecontent.store();
      return this;
    },
    switchToPageSettingsMode: function (e) {
      var pagecontent = this.pagecontent;
      require(['views/settings'], function (SettingsView) {
        var settingsview = new SettingsView({
          model: pagecontent
        });
        $('body').append(settingsview.render().el);
        settingsview.$('.modal').modal('show');
      });
    },
    openNewPage: function () {
      require(['jquery', 'views/new_page'], function ($, NewPageView) {
        var newpageview = new NewPageView();
        $('body').append(newpageview.render().el);
        newpageview.$('.modal').modal('show');
      });
    },
    openDuplicatePage: function () {
      var pagecontent = this.pagecontent;
      require(['jquery', 'views/duplicate_page'], function ($, DuplicatePageView) {
        var duplicatepageview = new DuplicatePageView({
          original: pagecontent
        });
        $('body').append(duplicatepageview.render().el);
        duplicatepageview.$('.modal').modal('show');
      });
    },
    openHtmlEditor: function () {
      // display a loading animation if we need more than
      // 200ms to load the view
      var deferred = $.Deferred();
      setTimeout(function() {
        if (deferred.state() === 'pending') {
          var loadingview = new LoadingView();
          $('body').append(loadingview.render().el);
          loadingview.$('.modal').modal('show');
          deferred.done(function() {
            loadingview.$('.modal').modal('hide');
          });
        }
      }, 200);

      var pagecontent = this.pagecontent;
      require(['views/html_editor', 'ace/ace'], function (HtmlEditorView, ace) {
        var htmleditorview = new HtmlEditorView({
          pagecontent: pagecontent,
          loadingDeferred: deferred
        });
        $('body').append(htmleditorview.render().el);
        htmleditorview.$('.modal').modal('show');
      });
    },
    saveContent: function () {
      // store this memento
      this.pagecontent.store();

      this.pagecontent.save({}, {
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
          });

          // TODO check for valid/authentic response
          if (typeof response['content'] !== 'undefined') {
            model.set('content', response['content']);
          }
        }
      });
    }
  });
  return EditierBarView;
});


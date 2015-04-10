/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

define([
  'jquery',
  'models/page_content',
  'views/page_content',
  'views/editier_bar'
], function($, PageContent, PageContentView, EditierBarView) {

  var pagecontent = new PageContent();
  pagecontent.loadFromElement($('.edit-this'));
  // store a first memento (restart() will revert to this state)
  pagecontent.store();

  var pagecontentview = new PageContentView({
    model: pagecontent,
    el: $('.edit-this')
  });

  var editierbarview = new EditierBarView({
    pagecontent: pagecontent,
    pagecontentview: pagecontentview
  });
  $('body').append(editierbarview.render().el);

  return {};
  // What we return here will be used by other modules
});

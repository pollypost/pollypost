/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

define('dom-tweaking', [
  'jquery',
  'module'
], function ($, module) {
  // see http://requirejs.org/docs/faq-advanced.html#css¬
  function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    $('head').append(link);
  }

  var baseUrl = '';
  if (typeof module.config()['baseUrl'] !== 'undefined') {
    baseUrl = module.config()['baseUrl'];
  }
  if (typeof module.config()['stylesheets'] !== 'undefined' &&
      $.isArray(module.config()['stylesheets'])) {
    $.each(module.config()['stylesheets'], function (i, v) {
      var url = baseUrl + v;
      loadCss(url);
    });
  }

  return {};
});

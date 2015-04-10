/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

// Defer Qunit so RequireJS can work its magic and resolve all modules.
//QUnit.config.autostart = false;

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  paths: {
    'jquery': '../vendor/assets/javascripts/jquery',
    'underscore': '../vendor/assets/javascripts/underscore',
    'backbone': '../vendor/assets/javascripts/backbone',
    'models': '../assets/javascripts/models'
  }
});

require([
  'page_content_test',
], function() {
  //QUnit.start();
});

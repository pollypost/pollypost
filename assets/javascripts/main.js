/**
 *  This file is part of Pollypost, inline editing for static sites.
 *  Copyright (C) 2015 more onion
 *
 *  Pollypost is free software: you can use, redistribute and/or modify it
 *  under the terms of the GNU General Public License version 3 or later.
 *  See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.
 */

require.config({
  config: {
    'dom-tweaking': {
      'baseUrl': require.toUrl('.'),
      'stylesheets': [ 'application.css' ]
    }
  },
  shim: {
    "bootstrap": {
      deps: ['jquery']
    },
    "backbone.memento": {
      deps: ['backbone']
    },
    "ckeditor/adapters/jquery": {
      deps: ['jquery', 'ckeditor/ckeditor']
    }
  }
});

require([
  'dom-tweaking',
  'app',
  'bootstrap'
], function(dt, App, Bootstrap){

});

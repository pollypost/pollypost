#   This file is part of Pollypost, inline editing for static sites.
#   Copyright (C) 2015 more onion
#
#   Pollypost is free software: you can use, redistribute and/or modify it
#   under the terms of the GNU General Public License version 3 or later.
#   See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.


require "bundler/gem_tasks"
require 'sprockets'
#require 'rake/sprocketstask'
require 'bootstrap-sass'

# "fake" method for font-awesome-sass 4.3.1
# it needs this method but has not defined it
# see https://github.com/FortAwesome/font-awesome-sass/pull/81
module FontAwesome
  module Sass
    class << self
      def javascripts_path
        File.join(File.dirname(__FILE__), 'assets', 'javascripts')
      end
    end
  end
end
require 'font-awesome-sass'

namespace :assets do
  desc "Precompile assets"
  task :precompile do
    env = Sprockets::Environment.new
    env.append_path File.join(File.dirname(__FILE__), 'assets', 'stylesheets')
    env.append_path File.join(File.dirname(__FILE__), 'assets', 'javascripts')
    env.append_path File.join(File.dirname(__FILE__), 'assets', 'images')
    env.append_path File.join(File.dirname(__FILE__), 'vendor', 'assets', 'javascripts')

    env['application.css'].write_to "public/assets/application.css"
    #env.css_compressor = :scss
    #env['application.css'].write_to "public/assets/application.min.css"
    env['application.js'].write_to "public/assets/application.js"
    env['jquery.js'].write_to "public/assets/jquery.js"
    env['underscore.js'].write_to "public/assets/underscore.js"
    env['backbone.js'].write_to "public/assets/backbone.js"
    env['backbone.memento.js'].write_to "public/assets/backbone.memento.js"
    env['require.js'].write_to "public/assets/require.js"
    env['bootstrap.js'].write_to "public/assets/bootstrap.js"
    env['jquery.noty.js'].write_to "public/assets/jquery.noty.js"
    env['main.js'].write_to "public/assets/main.js"
    env['app.js'].write_to "public/assets/app.js"
    env['dom-tweaking.js'].write_to "public/assets/dom-tweaking.js"
    env['text.js'].write_to "public/assets/text.js"
    #env.js_compressor = :uglify
    #env['application.js'].write_to "public/assets/application.min.js"

    FileUtils.copy_entry File.join(File.dirname(__FILE__), 'assets', 'javascripts', 'models'), 'public/assets/models'
    FileUtils.copy_entry File.join(File.dirname(__FILE__), 'assets', 'javascripts', 'views'), 'public/assets/views'
    FileUtils.copy_entry File.join(File.dirname(__FILE__), 'assets', 'javascripts', 'templates'), 'public/assets/templates'

    FileUtils.copy_entry File.join(File.dirname(__FILE__), 'vendor', 'assets', 'ace-1.1.8'), 'public/assets/ace'
    FileUtils.copy_entry File.join(File.dirname(__FILE__), 'vendor', 'assets', 'ckeditor-4.4.7'), 'public/assets/ckeditor'
    FileUtils.copy_entry File.join(File.dirname(__FILE__), 'assets', 'fonts', 'font-awesome-custom'), 'public/assets/font-awesome-custom'

    spec = Gem::Specification.find_by_name("font-awesome-sass")
    gem_root = spec.gem_dir
    FileUtils.copy_entry File.join(gem_root, 'assets', 'fonts', 'font-awesome'), 'public/assets/font-awesome'

  end
end

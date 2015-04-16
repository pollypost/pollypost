#   This file is part of Pollypost, inline editing for static sites.
#   Copyright (C) 2015 more onion
#
#   Pollypost is free software: you can use, redistribute and/or modify it
#   under the terms of the GNU General Public License version 3 or later.
#   See LICENCE.txt or <http://www.gnu.org/licenses/> for more details.


require 'rake'
require 'sprockets'
require 'bootstrap-sass'
require 'font-awesome-sass'

namespace :polly do
  namespace :assets do
    desc 'Precompile assets for the polly interface'
    task :precompile, [:output_dir] do |task, args|
      args.with_defaults(:output_dir => 'public/polly')
      output_root = File.expand_path(args[:output_dir])

      env = Sprockets::Environment.new
      assets_root = File.join(File.dirname(__FILE__), '..', '..', 'assets')
      vendor_root = File.join(File.dirname(__FILE__), '..', '..', 'vendor')
      env.append_path File.join(assets_root, 'stylesheets')
      env.append_path File.join(assets_root, 'javascripts')
      env.append_path File.join(assets_root, 'images')
      env.append_path File.join(vendor_root, 'assets', 'javascripts')

      env['application.css'].write_to File.join(output_root, 'application.css')
      env['jquery.js'].write_to File.join(output_root, 'jquery.js')
      env['underscore.js'].write_to File.join(output_root, 'underscore.js')
      env['backbone.js'].write_to File.join(output_root, 'backbone.js')
      env['backbone.memento.js'].write_to File.join(output_root, 'backbone.memento.js')
      env['require.js'].write_to File.join(output_root, 'require.js')
      env['bootstrap.js'].write_to File.join(output_root, 'bootstrap.js')
      env['jquery.noty.js'].write_to File.join(output_root, 'jquery.noty.js')
      env['main.js'].write_to File.join(output_root, 'main.js')
      env['app.js'].write_to File.join(output_root, 'app.js')
      env['dom-tweaking.js'].write_to File.join(output_root, 'dom-tweaking.js')
      env['text.js'].write_to File.join(output_root, 'text.js')

      FileUtils.copy_entry File.join(assets_root, 'javascripts', 'models'), File.join(output_root, 'models')
      FileUtils.copy_entry File.join(assets_root, 'javascripts', 'views'), File.join(output_root, 'views')
      FileUtils.copy_entry File.join(assets_root, 'javascripts', 'templates'), File.join(output_root, 'templates')

      FileUtils.copy_entry File.join(vendor_root, 'assets', 'ace-1.1.8'), File.join(output_root, 'ace')
      FileUtils.copy_entry File.join(vendor_root, 'assets', 'ckeditor-4.4.7'), File.join(output_root, 'ckeditor')
      FileUtils.copy_entry File.join(assets_root, 'fonts', 'font-awesome-custom'), File.join(output_root, 'font-awesome-custom')

      spec = Gem::Specification.find_by_name('font-awesome-sass')
      gem_root = spec.gem_dir
      FileUtils.copy_entry File.join(gem_root, 'assets', 'fonts', 'font-awesome'), File.join(output_root, 'font-awesome')
    end
  end
end

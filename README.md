# Pollypost

Have you met Polly? Polly likes crackers. And inline editing.

As a treat to Polly (and everyone else), Pollypost makes inline editing possible even for static sites. Edit pages and manage your site from your browser!
Pollypost provides an interface for managing static sites via a webbrowser. Browser based inline editing is made possible by connecting editing tools to a compatible backend (e.g. nanoc-polly).

## Integrations

### Backend

Pollypost needs the help of a backend implemention to store changes made with Pollypost to your site.

At the moment, there is only one backend available: [nanoc-polly](https://github.com/pollypost/nanoc-polly). It integrates Pollypost in websites generated with [nanoc](http://nanoc.ws/). So if you're using nanoc, make sure to install nanoc-polly as well. If not, we're very, very sorry, there's no easy way for your to try Pollypost right now (we're busy setting up a demo page, though).

Our goal is to provide backends for many popular static site generators (and maybe even other ones). However, as Pollypost is just a pet project at this moment, this will take a lot of time. To speed up the process and make sure Pollypost works with your favorite static site generator, too, feel free to contribute backends of your own!

### Editors

Pollypost comes with [CKEditor](http://ckeditor.com/) for inline editing and [ACE](http://ace.c9.io/) as html editor.

In the future, we hope Pollypost will be able to work with any inline editor of your choice. However, that is not our top priority right now. As said before, we're happy if you'd like to contribute!

### File storage

Pollypost expects your images (and other content you like to include in your pages) to be already hosted somewhere on the internet, for example on a CDN. Then you just need to paste their URL in Pollypost.

To make things easier, we've teamed up with [Uploadcare](https://uploadcare.com/):  if you [use this link to create an account](https://uploadcare.com/accounts/signup/?ref=kzq5yypdz1), you'll get 30 days for free on paid plans. We've integrated Uploadcare in Pollypost using the [CKEditor Plugin](http://ckeditor.com/addon/uploadcare). This way you can upload files to Uploadcare from your inline editor and insert them to your page with a single click.

Enable Uploadcare in Pollypost by setting the image storage to 'uploadcare' and adding your Uploadcare API Key in the config options. See [nanoc-polly](https://github.com/pollypost/nanoc-polly) for instructions on how to do that.

## Getting started

### Installation

Install pollypost yourself as:

    $ gem install pollypost

Or, if you're using [Bundler](http://bundler.io/), add this line to your application's Gemfile:

```ruby
gem 'pollypost'
```

And then execute:

    $ bundle install

#### Development version

In case you want to use the most up-to-date development version, add this github path to your Gemfile:

```ruby
gem 'pollypost', :github => 'pollypost/pollypost'

```
Or, if you cloned the source files to your local file system:

```ruby
gem 'pollypost', :path => './path_to/pollypost'
```

### Compiling the assets

Before you can use Pollypost on your site, you have to compile the asset files first:

Include this line in your Rakefile, if you already have one, or create a file named `Rakefile` in your nanoc root folder and add this line:

```ruby
require 'pollypost/rake'
```

Then you should be able to generate the Pollypost assets with the command

    $ rake polly:assets:precompile

(If you use bundle and the path is not found, try to put `bundle exec` before the command!)

The first time, this will add a `public/polly` folder to your nanoc project with all the assets needed by Pollypost. Every time you run the command again, the files in this folder will be updated.

To change the location or name of the Pollypost assets folder, add your custom path when running rake:

    $ rake polly:assets:precompile[output_directory]


### Marking content for editing

To edit content with Pollypost, you have to first mark it as editable: enclose it in a wrapper that has the class `edit-this` and an additional attribute `about` that is set to that file's path in the backend. With nanoc-polly, you can use `item_about @item` to generate its value (see [nanoc-polly](https://github.com/pollypost/nanoc-polly) for details).

This wrapper should not be in the same file as the content! In nanoc, we recommend to put it in the layout file.

```html
<div class="edit-this" about="<%= item_about @item %>">
  <%= yield %>
</div>
```

Also make sure there is no templating (e.g. erb) used in the editable content. It would be replaced by the editor, since the editor is working on the compiled site with the compiled content and does not know about any templates. On save, the whole content file will be replaced with the editor's content. Don't worry about metadata, the metadata header will be preserved.


## Usage

Make sure you have precompiled the Pollypost asset files and your backend is up and running, too (see [nanoc-polly](https://github.com/pollypost/nanoc-polly) for details).

Pollypost should now load on your site automatically. It looks like a bar on top of every page.

### View mode

In view mode, you can view the page without an editor. That's the default state.

Click the '+' in the middle of the bar to add a new page or duplicate the current page.

Click the 'edit' button to change into edit mode.

### Edit mode

In edit mode, the inline editor is active. Click on the part of the page you'd like to change and start editing. The CKEditor toolbar will appear as soon as you click on an editable area.

To save your changes, click 'save'.

To return to view mode, click on the 'x' next to the save button. Any unsaved changes you made will be lost!

#### HTML editing

To edit the html source code, click on the '</>' button in the top bar. This will open an overlay with ACE as editor. Click 'Apply' to apply your changes and view them on the page. They will not be saved permanently until you click the 'save' button!

#### Page settings

The button on the left opens the page settings dialog where you can edit the metadata of you page.


## Contributing

1. Fork it ( https://github.com/pollypost/pollypost/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request


## License

Copyright (C) 2015 [more onion](https://www.more-onion.com)

Pollypost is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

Pollypost is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License (LICENSE.md) along with this program. If not, see <http://www.gnu.org/licenses/>.

### Third party code

Tools and libraries Pollypost relies on include

* module loader: [RequireJS](http://requirejs.org/)
* structure: [Backbone.js](http://backbonejs.org/) , [Backbone.Memento](http://github.com/derickbailey/backbone.memento)
* testing: [QUnit](http://qunitjs.com/) , [Sinon.JS](http://sinonjs.org/)
* utilities: [Underscore.js](http://underscorejs.org/) , [jQuery](http://jquery.com/)
* frontend: [Bootstrap](http://getbootstrap.com/) , [Font-Awesome](http://fortawesome.github.io/Font-Awesome/) , [jQueryUI](http://jqueryui.com/) , [noty](http://ned.im/noty/#/about)
* editors: [CKEditor](http://ckeditor.com/) , [Ace](http://ace.c9.io/#nav=about)
* backend: [nanoc](http://nanoc.ws/)

They all come with their own copyright and license as stated in the respective files.
Thank you for sharing your code!

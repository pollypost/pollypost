# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'pollypost/version'

Gem::Specification.new do |spec|
  spec.name          = "pollypost"
  spec.version       = Pollypost::VERSION
  spec.authors       = ["Alex Berger", "Katharina Zwinger"]
  spec.email         = ["alex@more-onion.com", "katharina@more-onion.com"]
  spec.summary       = %q{Enables browser based editing.}
  spec.description   = %q{Pollypost provides an interface for managing static sites via a webbrowser. Browser based inline editing is made possible by connecting editing tools to a compatible backend (e.g. nanoc-polly).}
  spec.homepage      = "http://www.pollypost.org"
  spec.license       = "GPL-3.0"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency "rake", "~> 10.0"
  spec.add_dependency "bootstrap-sass", "~> 3.3.0"
  spec.add_dependency "font-awesome-sass", "~> 4.3.0"
  spec.add_dependency "sprockets", "~> 2.12"
  spec.add_dependency "uglifier"
  spec.add_development_dependency "bundler", "~> 1.7"
end

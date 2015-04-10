# QUnit

Cookbook: http://qunitjs.com/cookbook/
API: http://api.qunitjs.com/

## Basics

Each test may contain a number of assertions. If one or more assertions fail, the test fails. On the results page you see a list of all assertions by clicking on a test.

```js
QUnit.test( "test name", function( assert ) {
  // passes if the first argument is truthy
  assert.ok( truthy, "optional message" );
  // a simple comparison assertion with type coercion
  assert.equal( actual, expected, "optional message" );
  // a much stricter comparison than equal() using ===
  assert.deepEqual( actual, expected, "optional message" );
});
```
For more built-in assertions see http://api.qunitjs.com/category/assert/
For how to write custom assertions have a look at http://qunitjs.com/cookbook/#custom-assertions

`#quint-fixture` provides a test-space for DOM manipulations. It will be resetted after every test.

Modules are used to group related tests. The module name will show on the test results page and results can be filtered by module.

All tests that follow `QUnit.module( "module name" );` in the test code will belong to that module.

It's also possible to define code that is run before and/or after each test of a module by adding a hooks argument. Hooks share the same context as their test, so it can be used to add properties.

```js
QUnit.module( "module name", {
  beforeEach: function() {},
  afterEach: function() {}
});
```
(In many tutorials you will see 'setup' and 'teardown' in place of 'beforeEach' and 'afterEach', those are deprecated and no longer supported by QUnit 2.x)


# Sinon.JS

API: http://sinonjs.org/docs

## Fake Server

```js
var server = sinon.fakeServer.create(); // creates a new server
server.respondWith([method], [url], response);  // specifes a response for HTTP requests
server.respond(); // triggers responses to pending requests
server.restore(); // restores the native constructor
```

'response' is either a string representing the response body or an array with status, headers and body. If an URL is given, the server only uses that response for requests to this URL, specifing a HTTP method resticts the response to requests with this method.

If no response set by respondWith() matches a request, respond() triggers the default response [404, {}, ""].

// some assertions
// ---------------
//
// * ok ( state, message ) – passes if the first argument is truthy
// * equal ( actual, expected, message ) – a simple comparison
//   assertion with type coercion
// * notEqual ( actual, expected, message ) – the opposite of the above
// * expect( amount ) – the number of assertions expected to run within
//   each test
// * strictEqual( actual, expected, message) – offers a much stricter
//   comparison than equal() and is considered the preferred method of
//   checking equality as it avoids stumbling on subtle coercion bugs
// * deepEqual( actual, expected, message ) – similar to strictEqual,
//   comparing the contents (with ===) of the given objects, arrays and primitives.
//
// more see:  http://api.qunitjs.com/category/assert/

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

// ---------------------------------------------
QUnit.module("A test module", {
  beforeEach: function() {
    this.myString = "Hello Backbone.js";
  },
  afterEach: function() { }
});
QUnit.test( "Our first QUnit test - asserting results", function(){
    // ok( boolean, message )
    ok( true, "the test succeeds");
    ok( false, "the test fails");
    // equal( actualValue, expectedValue, message )
    equal( this.myString, "Hello Backbone.js", "The value expected is Hello Backbone.js!");
});

// ---------------------------------------------
QUnit.module("Faking response data", {
  beforeEach: function () {
    var testData = { foo: 'bar', name: 'phil' };
    this.server = sinon.fakeServer.create();
    this.server.respondWith("GET", "/api/testmodel/1", [200, { "Content-Type": "application/json" }, JSON.stringify(testData)]);
  },
  afterEach: function () {
    this.server.restore();
  }
});

QUnit.test("Fetching TestModel", function () {
  var TestModel = Backbone.Model.extend({
    url: function() { return '/api/testmodel' + (this.id ? '/'+this.id : ''); }
  });
  var model = new TestModel({ id: 1 });
  model.fetch();
  this.server.respond();

  equal(model.get('foo'), 'bar', 'fetched model has expected attributes');
});

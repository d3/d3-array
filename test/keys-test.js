var tape = require("tape"),
    arrays = require("../");

require("./isNaN");

tape("keys(object) enumerates every entry", function(test) {
  test.deepEqual(arrays.keys({a: 1, b: 2}).sort(arrays.ascending), ["a", "b"]);
  test.end();
});

tape("keys(object) includes keys defined on prototypes", function(test) {
  function abc() {
    this.a = 1;
    this.b = 2;
  }
  abc.prototype.c = 3;
  test.deepEqual(arrays.keys(new abc).sort(arrays.ascending), ["a", "b", "c"]);
  test.end();
});

tape("keys(object) includes null, undefined and NaN values", function(test) {
  test.deepEqual(arrays.keys({a: null, b: undefined, c: NaN}).sort(arrays.ascending), ["a", "b", "c"]);
  test.end();
});

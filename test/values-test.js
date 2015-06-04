var tape = require("tape"),
    arrays = require("../");

require("./isNaN");

tape("values(object) enumerates every value", function(test) {
  test.deepEqual(arrays.values({a: 1, b: 2}).sort(arrays.ascending), [1, 2]);
  test.end();
});

tape("values(object) includes values defined on prototypes", function(test) {
  function abc() {
    this.a = 1;
    this.b = 2;
  }
  abc.prototype.c = 3;
  test.deepEqual(arrays.values(new abc).sort(arrays.ascending), [1, 2, 3]);
  test.end();
});

tape("values(object) includes null, undefined and NaN values", function(test) {
  var v = arrays.values({a: null, b: undefined, c: NaN}).map(box).sort(order).map(unbox);
  test.equal(v[0], null);
  test.equal(v[1], undefined);
  test.isNaN(v[2]);
  test.equal(v.length, 3);
  test.end();
});

function box(number) {
  return {number: number};
}

function unbox(box) {
  return box.number;
}

function order(a, b) {
  a = a.number;
  b = b.number;
  return arrays.ascending(a, b)
      || isNaN(a) - isNaN(b)
      || (b === b) - (a === a);
}

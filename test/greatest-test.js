var tape = require("tape"),
    arrays = require("../");

tape("greatest(array) compares using natural order", function(test) {
  test.strictEqual(arrays.greatest([0, 1]), 1);
  test.strictEqual(arrays.greatest([1, 0]), 1);
  test.strictEqual(arrays.greatest([0, "1"]), "1");
  test.strictEqual(arrays.greatest(["1", 0]), "1");
  test.strictEqual(arrays.greatest(["10", "2"]), "2");
  test.strictEqual(arrays.greatest(["2", "10"]), "2");
  test.strictEqual(arrays.greatest(["10", "2", NaN]), "2");
  test.strictEqual(arrays.greatest([NaN, "10", "2"]), "2");
  test.strictEqual(arrays.greatest(["2", NaN, "10"]), "2");
  test.strictEqual(arrays.greatest([2, NaN, 10]), 10);
  test.strictEqual(arrays.greatest([10, 2, NaN]), 10);
  test.strictEqual(arrays.greatest([NaN, 10, 2]), 10);
  test.end();
});

tape("greatest(array, compare) compares using the specified compare function", function(test) {
  var a = {name: "a"}, b = {name: "b"};
  test.deepEqual(arrays.greatest([a, b], function(a, b) { return a.name.localeCompare(b.name); }), {name: "b"});
  test.strictEqual(arrays.greatest([1, 0], arrays.descending), 0);
  test.strictEqual(arrays.greatest(["1", 0], arrays.descending), 0);
  test.strictEqual(arrays.greatest(["2", "10"], arrays.descending), "10");
  test.strictEqual(arrays.greatest(["2", NaN, "10"], arrays.descending), "10");
  test.strictEqual(arrays.greatest([2, NaN, 10], arrays.descending), 2);
  test.end();
});

tape("greatest(array, accessor) uses the specified accessor function", function(test) {
  var a = {name: "a", v: 42}, b = {name: "b", v: 0.42};
  test.deepEqual(arrays.greatest([a, b], d => d.name), b);
  test.deepEqual(arrays.greatest([a, b], d => d.v), a);
  test.end();
});

tape("greatest(array) returns undefined if the array is empty", function(test) {
  test.strictEqual(arrays.greatest([]), undefined);
  test.end();
});

tape("greatest(array) returns undefined if the array contains only incomparable values", function(test) {
  test.strictEqual(arrays.greatest([NaN, undefined]), undefined);
  test.strictEqual(arrays.greatest([NaN, "foo"], function(a, b) { return a - b; }), undefined);
  test.end();
});

tape("greatest(array) returns the first of equal values", function(test) {
  test.deepEqual(arrays.greatest([2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), descendingValue), {value: 0, index: 4});
  test.deepEqual(arrays.greatest([3, 2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), ascendingValue), {value: 3, index: 0});
  test.end();
});

function box(value, index) {
  return {value, index};
}

function ascendingValue(a, b) {
  return a.value - b.value;
}

function descendingValue(a, b) {
  return b.value - a.value;
}

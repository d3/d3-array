var tape = require("tape"),
    arrays = require("../");

tape("greatestIndex(array) compares using natural order", function(test) {
  test.strictEqual(arrays.greatestIndex([0, 1]), 1);
  test.strictEqual(arrays.greatestIndex([1, 0]), 0);
  test.strictEqual(arrays.greatestIndex([0, "1"]), 1);
  test.strictEqual(arrays.greatestIndex(["1", 0]), 0);
  test.strictEqual(arrays.greatestIndex(["10", "2"]), 1);
  test.strictEqual(arrays.greatestIndex(["2", "10"]), 0);
  test.strictEqual(arrays.greatestIndex(["10", "2", NaN]), 1);
  test.strictEqual(arrays.greatestIndex([NaN, "10", "2"]), 2);
  test.strictEqual(arrays.greatestIndex(["2", NaN, "10"]), 0);
  test.strictEqual(arrays.greatestIndex([2, NaN, 10]), 2);
  test.strictEqual(arrays.greatestIndex([10, 2, NaN]), 0);
  test.strictEqual(arrays.greatestIndex([NaN, 10, 2]), 1);
  test.end();
});

tape("greatestIndex(array, compare) compares using the specified compare function", function(test) {
  var a = {name: "a"}, b = {name: "b"};
  test.strictEqual(arrays.greatestIndex([a, b], function(a, b) { return a.name.localeCompare(b.name); }), 1);
  test.strictEqual(arrays.greatestIndex([1, 0], arrays.ascending), 0);
  test.strictEqual(arrays.greatestIndex(["1", 0], arrays.ascending), 0);
  test.strictEqual(arrays.greatestIndex(["2", "10"], arrays.ascending), 0);
  test.strictEqual(arrays.greatestIndex(["2", NaN, "10"], arrays.ascending), 0);
  test.strictEqual(arrays.greatestIndex([2, NaN, 10], arrays.ascending), 2);
  test.end();
});

tape("greatestIndex(array, accessor) uses the specified accessor function", function(test) {
  var a = {name: "a", v: 42}, b = {name: "b", v: 0.42};
  test.deepEqual(arrays.greatestIndex([a, b], d => d.name), 1);
  test.deepEqual(arrays.greatestIndex([a, b], d => d.v), 0);
  test.end();
});

tape("greatestIndex(array) returns -1 if the array is empty", function(test) {
  test.strictEqual(arrays.greatestIndex([]), -1);
  test.end();
});

tape("greatestIndex(array) returns -1 if the array contains only incomparable values", function(test) {
  test.strictEqual(arrays.greatestIndex([NaN, undefined]), -1);
  test.strictEqual(arrays.greatestIndex([NaN, "foo"], function(a, b) { return a - b; }), -1);
  test.end();
});

tape("greatestIndex(array) returns the first of equal values", function(test) {
  test.strictEqual(arrays.greatestIndex([-2, -2, -1, -1, 0, 0, 0, -3, 0]), 4);
  test.strictEqual(arrays.greatestIndex([-3, -2, -2, -1, -1, 0, 0, 0, -3, 0], arrays.descending), 0);
  test.end();
});

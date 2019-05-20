var tape = require("tape"),
    arrays = require("../");

tape("leastIndex(array) compares using natural order", function(test) {
  test.strictEqual(arrays.leastIndex([0, 1]), 0);
  test.strictEqual(arrays.leastIndex([1, 0]), 1);
  test.strictEqual(arrays.leastIndex([0, "1"]), 0);
  test.strictEqual(arrays.leastIndex(["1", 0]), 1);
  test.strictEqual(arrays.leastIndex(["10", "2"]), 0);
  test.strictEqual(arrays.leastIndex(["2", "10"]), 1);
  test.strictEqual(arrays.leastIndex(["10", "2", NaN]), 0);
  test.strictEqual(arrays.leastIndex([NaN, "10", "2"]), 1);
  test.strictEqual(arrays.leastIndex(["2", NaN, "10"]), 2);
  test.strictEqual(arrays.leastIndex([2, NaN, 10]), 0);
  test.strictEqual(arrays.leastIndex([10, 2, NaN]), 1);
  test.strictEqual(arrays.leastIndex([NaN, 10, 2]), 2);
  test.end();
});

tape("leastIndex(array, compare) compares using the specified compare function", function(test) {
  var a = {name: "a"}, b = {name: "b"};
  test.strictEqual(arrays.leastIndex([a, b], function(a, b) { return a.name.localeCompare(b.name); }), 0);
  test.strictEqual(arrays.leastIndex([1, 0], arrays.descending), 0);
  test.strictEqual(arrays.leastIndex(["1", 0], arrays.descending), 0);
  test.strictEqual(arrays.leastIndex(["2", "10"], arrays.descending), 0);
  test.strictEqual(arrays.leastIndex(["2", NaN, "10"], arrays.descending), 0);
  test.strictEqual(arrays.leastIndex([2, NaN, 10], arrays.descending), 2);
  test.end();
});

tape("leastIndex(array) returns -1 if the array is empty", function(test) {
  test.strictEqual(arrays.leastIndex([]), -1);
  test.end();
});

tape("leastIndex(array) returns -1 if the array contains only incomparable values", function(test) {
  test.strictEqual(arrays.leastIndex([NaN, undefined]), -1);
  test.strictEqual(arrays.leastIndex([NaN, "foo"], function(a, b) { return a - b; }), -1);
  test.end();
});

tape("leastIndex(array) returns the first of equal values", function(test) {
  test.strictEqual(arrays.leastIndex([2, 2, 1, 1, 0, 0, 0, 3, 0]), 4);
  test.strictEqual(arrays.leastIndex([3, 2, 2, 1, 1, 0, 0, 0, 3, 0], arrays.descending), 0);
  test.end();
});

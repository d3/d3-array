var tape = require("tape"),
    arrays = require("../");

tape("least(array) compares using natural order", function(test) {
  test.strictEqual(arrays.least([0, 1]), 0);
  test.strictEqual(arrays.least([1, 0]), 0);
  test.strictEqual(arrays.least([0, "1"]), 0);
  test.strictEqual(arrays.least(["1", 0]), 0);
  test.strictEqual(arrays.least(["10", "2"]), "10");
  test.strictEqual(arrays.least(["2", "10"]), "10");
  test.strictEqual(arrays.least(["10", "2", NaN]), "10");
  test.strictEqual(arrays.least([NaN, "10", "2"]), "10");
  test.strictEqual(arrays.least(["2", NaN, "10"]), "10");
  test.strictEqual(arrays.least([2, NaN, 10]), 2);
  test.strictEqual(arrays.least([10, 2, NaN]), 2);
  test.strictEqual(arrays.least([NaN, 10, 2]), 2);
  test.end();
});

tape("least(array, compare) compares using the specified compare function", function(test) {
  var a = {name: "a"}, b = {name: "b"};
  test.deepEqual(arrays.least([a, b], function(a, b) { return a.name.localeCompare(b.name); }), {name: "a"});
  test.strictEqual(arrays.least([1, 0], arrays.descending), 1);
  test.strictEqual(arrays.least(["1", 0], arrays.descending), "1");
  test.strictEqual(arrays.least(["2", "10"], arrays.descending), "2");
  test.strictEqual(arrays.least(["2", NaN, "10"], arrays.descending), "2");
  test.strictEqual(arrays.least([2, NaN, 10], arrays.descending), 10);
  test.end();
});

tape("least(array) returns undefined if the array is empty", function(test) {
  test.strictEqual(arrays.least([]), undefined);
  test.end();
});

tape("least(array) returns undefined if the array contains only incomparable values", function(test) {
  test.strictEqual(arrays.least([NaN, undefined]), undefined);
  test.strictEqual(arrays.least([NaN, "foo"], function(a, b) { return a - b; }), undefined);
  test.end();
});

tape("least(array) returns the first of equal values", function(test) {
  test.deepEqual(arrays.least([2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), ascendingValue), {value: 0, index: 4});
  test.deepEqual(arrays.least([3, 2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), descendingValue), {value: 3, index: 0});
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

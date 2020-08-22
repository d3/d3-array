const tape = require("tape-await");
const d3 = require("../");

tape("scan(array) compares using natural order", (test) => {
  test.strictEqual(d3.scan([0, 1]), 0);
  test.strictEqual(d3.scan([1, 0]), 1);
  test.strictEqual(d3.scan([0, "1"]), 0);
  test.strictEqual(d3.scan(["1", 0]), 1);
  test.strictEqual(d3.scan(["10", "2"]), 0);
  test.strictEqual(d3.scan(["2", "10"]), 1);
  test.strictEqual(d3.scan(["10", "2", NaN]), 0);
  test.strictEqual(d3.scan([NaN, "10", "2"]), 1);
  test.strictEqual(d3.scan(["2", NaN, "10"]), 2);
  test.strictEqual(d3.scan([2, NaN, 10]), 0);
  test.strictEqual(d3.scan([10, 2, NaN]), 1);
  test.strictEqual(d3.scan([NaN, 10, 2]), 2);
});

tape("scan(array, compare) compares using the specified compare function", (test) => {
  var a = {name: "a"}, b = {name: "b"};
  test.strictEqual(d3.scan([a, b], (a, b) => a.name.localeCompare(b.name)), 0);
  test.strictEqual(d3.scan([1, 0], d3.descending), 0);
  test.strictEqual(d3.scan(["1", 0], d3.descending), 0);
  test.strictEqual(d3.scan(["2", "10"], d3.descending), 0);
  test.strictEqual(d3.scan(["2", NaN, "10"], d3.descending), 0);
  test.strictEqual(d3.scan([2, NaN, 10], d3.descending), 2);
});

tape("scan(array) returns undefined if the array is empty", (test) => {
  test.strictEqual(d3.scan([]), undefined);
});

tape("scan(array) returns undefined if the array contains only incomparable values", (test) => {
  test.strictEqual(d3.scan([NaN, undefined]), undefined);
  test.strictEqual(d3.scan([NaN, "foo"], (a, b) => a - b), undefined);
});

tape("scan(array) returns the first of equal values", (test) => {
  test.strictEqual(d3.scan([2, 2, 1, 1, 0, 0, 0, 3, 0]), 4);
  test.strictEqual(d3.scan([3, 2, 2, 1, 1, 0, 0, 0, 3, 0], d3.descending), 0);
});

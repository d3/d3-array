const tape = require("tape-await");
const d3 = require("../");

tape("greatestIndex(array) compares using natural order", (test) => {
  test.strictEqual(d3.greatestIndex([0, 1]), 1);
  test.strictEqual(d3.greatestIndex([1, 0]), 0);
  test.strictEqual(d3.greatestIndex([0, "1"]), 1);
  test.strictEqual(d3.greatestIndex(["1", 0]), 0);
  test.strictEqual(d3.greatestIndex(["10", "2"]), 1);
  test.strictEqual(d3.greatestIndex(["2", "10"]), 0);
  test.strictEqual(d3.greatestIndex(["10", "2", NaN]), 1);
  test.strictEqual(d3.greatestIndex([NaN, "10", "2"]), 2);
  test.strictEqual(d3.greatestIndex(["2", NaN, "10"]), 0);
  test.strictEqual(d3.greatestIndex([2, NaN, 10]), 2);
  test.strictEqual(d3.greatestIndex([10, 2, NaN]), 0);
  test.strictEqual(d3.greatestIndex([NaN, 10, 2]), 1);
});

tape("greatestIndex(array, compare) compares using the specified compare function", (test) => {
  const a = {name: "a"}, b = {name: "b"};
  test.strictEqual(d3.greatestIndex([a, b], (a, b) => a.name.localeCompare(b.name)), 1);
  test.strictEqual(d3.greatestIndex([1, 0], d3.ascending), 0);
  test.strictEqual(d3.greatestIndex(["1", 0], d3.ascending), 0);
  test.strictEqual(d3.greatestIndex(["2", "10"], d3.ascending), 0);
  test.strictEqual(d3.greatestIndex(["2", NaN, "10"], d3.ascending), 0);
  test.strictEqual(d3.greatestIndex([2, NaN, 10], d3.ascending), 2);
});

tape("greatestIndex(array, accessor) uses the specified accessor function", (test) => {
  const a = {name: "a", v: 42}, b = {name: "b", v: 0.42};
  test.deepEqual(d3.greatestIndex([a, b], d => d.name), 1);
  test.deepEqual(d3.greatestIndex([a, b], d => d.v), 0);
});

tape("greatestIndex(array) returns -1 if the array is empty", (test) => {
  test.strictEqual(d3.greatestIndex([]), -1);
});

tape("greatestIndex(array) returns -1 if the array contains only incomparable values", (test) => {
  test.strictEqual(d3.greatestIndex([NaN, undefined]), -1);
  test.strictEqual(d3.greatestIndex([NaN, "foo"], (a, b) => a - b), -1);
});

tape("greatestIndex(array) returns the first of equal values", (test) => {
  test.strictEqual(d3.greatestIndex([-2, -2, -1, -1, 0, 0, 0, -3, 0]), 4);
  test.strictEqual(d3.greatestIndex([-3, -2, -2, -1, -1, 0, 0, 0, -3, 0], d3.descending), 0);
});

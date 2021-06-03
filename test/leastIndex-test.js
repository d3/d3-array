const tape = require("tape-await");
const d3 = require("../");

tape("leastIndex(array) compares using natural order", (test) => {
  test.strictEqual(d3.leastIndex([0, 1]), 0);
  test.strictEqual(d3.leastIndex([1, 0]), 1);
  test.strictEqual(d3.leastIndex([0, "1"]), 0);
  test.strictEqual(d3.leastIndex(["1", 0]), 1);
  test.strictEqual(d3.leastIndex(["10", "2"]), 0);
  test.strictEqual(d3.leastIndex(["2", "10"]), 1);
  test.strictEqual(d3.leastIndex(["10", "2", NaN]), 0);
  test.strictEqual(d3.leastIndex([NaN, "10", "2"]), 1);
  test.strictEqual(d3.leastIndex(["2", NaN, "10"]), 2);
  test.strictEqual(d3.leastIndex([2, NaN, 10]), 0);
  test.strictEqual(d3.leastIndex([10, 2, NaN]), 1);
  test.strictEqual(d3.leastIndex([NaN, 10, 2]), 2);
});

tape("leastIndex(array, compare) compares using the specified compare function", (test) => {
  const a = {name: "a"}, b = {name: "b"};
  test.strictEqual(d3.leastIndex([a, b], (a, b) => a.name.localeCompare(b.name)), 0);
  test.strictEqual(d3.leastIndex([1, 0], d3.descending), 0);
  test.strictEqual(d3.leastIndex(["1", 0], d3.descending), 0);
  test.strictEqual(d3.leastIndex(["2", "10"], d3.descending), 0);
  test.strictEqual(d3.leastIndex(["2", NaN, "10"], d3.descending), 0);
  test.strictEqual(d3.leastIndex([2, NaN, 10], d3.descending), 2);
});

tape("leastIndex(array, accessor) uses the specified accessor function", (test) => {
  const a = {name: "a", v: 42}, b = {name: "b", v: 0.42};
  test.deepEqual(d3.leastIndex([a, b], d => d.name), 0);
  test.deepEqual(d3.leastIndex([a, b], d => d.v), 1);
});

tape("leastIndex(array) returns -1 if the array is empty", (test) => {
  test.strictEqual(d3.leastIndex([]), -1);
});

tape("leastIndex(array) returns -1 if the array contains only incomparable values", (test) => {
  test.strictEqual(d3.leastIndex([NaN, undefined]), -1);
  test.strictEqual(d3.leastIndex([NaN, "foo"], (a, b) => a - b), -1);
});

tape("leastIndex(array) returns the first of equal values", (test) => {
  test.strictEqual(d3.leastIndex([2, 2, 1, 1, 0, 0, 0, 3, 0]), 4);
  test.strictEqual(d3.leastIndex([3, 2, 2, 1, 1, 0, 0, 0, 3, 0], d3.descending), 0);
});

tape("leastIndex(array) ignores nulls", (test) => {
  test.deepEqual(d3.leastIndex([null, 2, null]), 1);
});

tape("leastIndex(array, accessor) ignores nulls", (test) => {
  test.deepEqual(d3.leastIndex([null, 2, null], d => d), 1);
});

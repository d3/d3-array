const tape = require("tape-await");
const d3 = require("../");

tape("least(array) compares using natural order", (test) => {
  test.strictEqual(d3.least([0, 1]), 0);
  test.strictEqual(d3.least([1, 0]), 0);
  test.strictEqual(d3.least([0, "1"]), 0);
  test.strictEqual(d3.least(["1", 0]), 0);
  test.strictEqual(d3.least(["10", "2"]), "10");
  test.strictEqual(d3.least(["2", "10"]), "10");
  test.strictEqual(d3.least(["10", "2", NaN]), "10");
  test.strictEqual(d3.least([NaN, "10", "2"]), "10");
  test.strictEqual(d3.least(["2", NaN, "10"]), "10");
  test.strictEqual(d3.least([2, NaN, 10]), 2);
  test.strictEqual(d3.least([10, 2, NaN]), 2);
  test.strictEqual(d3.least([NaN, 10, 2]), 2);
});

tape("least(array, compare) compares using the specified compare function", (test) => {
  const a = {name: "a"}, b = {name: "b"};
  test.deepEqual(d3.least([a, b], (a, b) => a.name.localeCompare(b.name)), {name: "a"});
  test.strictEqual(d3.least([1, 0], d3.descending), 1);
  test.strictEqual(d3.least(["1", 0], d3.descending), "1");
  test.strictEqual(d3.least(["2", "10"], d3.descending), "2");
  test.strictEqual(d3.least(["2", NaN, "10"], d3.descending), "2");
  test.strictEqual(d3.least([2, NaN, 10], d3.descending), 10);
});

tape("least(array, accessor) uses the specified accessor function", (test) => {
  const a = {name: "a", v: 42}, b = {name: "b", v: 0.42};
  test.deepEqual(d3.least([a, b], d => d.name), a);
  test.deepEqual(d3.least([a, b], d => d.v), b);
});

tape("least(array) returns undefined if the array is empty", (test) => {
  test.strictEqual(d3.least([]), undefined);
});

tape("least(array) returns undefined if the array contains only incomparable values", (test) => {
  test.strictEqual(d3.least([NaN, undefined]), undefined);
  test.strictEqual(d3.least([NaN, "foo"], (a, b) => a - b), undefined);
});

tape("least(array) returns the first of equal values", (test) => {
  test.deepEqual(d3.least([2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), ascendingValue), {value: 0, index: 4});
  test.deepEqual(d3.least([3, 2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), descendingValue), {value: 3, index: 0});
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

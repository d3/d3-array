const tape = require("tape-await");
const d3 = require("../");

tape("greatest(array) compares using natural order", (test) => {
  test.strictEqual(d3.greatest([0, 1]), 1);
  test.strictEqual(d3.greatest([1, 0]), 1);
  test.strictEqual(d3.greatest([0, "1"]), "1");
  test.strictEqual(d3.greatest(["1", 0]), "1");
  test.strictEqual(d3.greatest(["10", "2"]), "2");
  test.strictEqual(d3.greatest(["2", "10"]), "2");
  test.strictEqual(d3.greatest(["10", "2", NaN]), "2");
  test.strictEqual(d3.greatest([NaN, "10", "2"]), "2");
  test.strictEqual(d3.greatest(["2", NaN, "10"]), "2");
  test.strictEqual(d3.greatest([2, NaN, 10]), 10);
  test.strictEqual(d3.greatest([10, 2, NaN]), 10);
  test.strictEqual(d3.greatest([NaN, 10, 2]), 10);
});

tape("greatest(array, compare) compares using the specified compare function", (test) => {
  var a = {name: "a"}, b = {name: "b"};
  test.deepEqual(d3.greatest([a, b], (a, b) => a.name.localeCompare(b.name)), {name: "b"});
  test.strictEqual(d3.greatest([1, 0], d3.descending), 0);
  test.strictEqual(d3.greatest(["1", 0], d3.descending), 0);
  test.strictEqual(d3.greatest(["2", "10"], d3.descending), "10");
  test.strictEqual(d3.greatest(["2", NaN, "10"], d3.descending), "10");
  test.strictEqual(d3.greatest([2, NaN, 10], d3.descending), 2);
});

tape("greatest(array, accessor) uses the specified accessor function", (test) => {
  var a = {name: "a", v: 42}, b = {name: "b", v: 0.42};
  test.deepEqual(d3.greatest([a, b], d => d.name), b);
  test.deepEqual(d3.greatest([a, b], d => d.v), a);
});

tape("greatest(array) returns undefined if the array is empty", (test) => {
  test.strictEqual(d3.greatest([]), undefined);
});

tape("greatest(array) returns undefined if the array contains only incomparable values", (test) => {
  test.strictEqual(d3.greatest([NaN, undefined]), undefined);
  test.strictEqual(d3.greatest([NaN, "foo"], (a, b) => a - b), undefined);
});

tape("greatest(array) returns the first of equal values", (test) => {
  test.deepEqual(d3.greatest([2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), descendingValue), {value: 0, index: 4});
  test.deepEqual(d3.greatest([3, 2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), ascendingValue), {value: 3, index: 0});
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

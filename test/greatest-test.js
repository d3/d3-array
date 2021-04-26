import assert from "assert";
import * as d3 from "../src/index.js";

it("greatest(array) compares using natural order", () => {
  assert.strictEqual(d3.greatest([0, 1]), 1);
  assert.strictEqual(d3.greatest([1, 0]), 1);
  assert.strictEqual(d3.greatest([0, "1"]), "1");
  assert.strictEqual(d3.greatest(["1", 0]), "1");
  assert.strictEqual(d3.greatest(["10", "2"]), "2");
  assert.strictEqual(d3.greatest(["2", "10"]), "2");
  assert.strictEqual(d3.greatest(["10", "2", NaN]), "2");
  assert.strictEqual(d3.greatest([NaN, "10", "2"]), "2");
  assert.strictEqual(d3.greatest(["2", NaN, "10"]), "2");
  assert.strictEqual(d3.greatest([2, NaN, 10]), 10);
  assert.strictEqual(d3.greatest([10, 2, NaN]), 10);
  assert.strictEqual(d3.greatest([NaN, 10, 2]), 10);
});

it("greatest(array, compare) compares using the specified compare function", () => {
  var a = {name: "a"}, b = {name: "b"};
  assert.deepEqual(d3.greatest([a, b], (a, b) => a.name.localeCompare(b.name)), {name: "b"});
  assert.strictEqual(d3.greatest([1, 0], d3.descending), 0);
  assert.strictEqual(d3.greatest(["1", 0], d3.descending), 0);
  assert.strictEqual(d3.greatest(["2", "10"], d3.descending), "10");
  assert.strictEqual(d3.greatest(["2", NaN, "10"], d3.descending), "10");
  assert.strictEqual(d3.greatest([2, NaN, 10], d3.descending), 2);
});

it("greatest(array, accessor) uses the specified accessor function", () => {
  var a = {name: "a", v: 42}, b = {name: "b", v: 0.42};
  assert.deepEqual(d3.greatest([a, b], d => d.name), b);
  assert.deepEqual(d3.greatest([a, b], d => d.v), a);
});

it("greatest(array) returns undefined if the array is empty", () => {
  assert.strictEqual(d3.greatest([]), undefined);
});

it("greatest(array) returns undefined if the array contains only incomparable values", () => {
  assert.strictEqual(d3.greatest([NaN, undefined]), undefined);
  assert.strictEqual(d3.greatest([NaN, "foo"], (a, b) => a - b), undefined);
});

it("greatest(array) returns the first of equal values", () => {
  assert.deepEqual(d3.greatest([2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), descendingValue), {value: 0, index: 4});
  assert.deepEqual(d3.greatest([3, 2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), ascendingValue), {value: 3, index: 0});
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

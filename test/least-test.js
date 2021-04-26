import assert from "assert";
import * as d3 from "../src/index.js";

it("least(array) compares using natural order", () => {
  assert.strictEqual(d3.least([0, 1]), 0);
  assert.strictEqual(d3.least([1, 0]), 0);
  assert.strictEqual(d3.least([0, "1"]), 0);
  assert.strictEqual(d3.least(["1", 0]), 0);
  assert.strictEqual(d3.least(["10", "2"]), "10");
  assert.strictEqual(d3.least(["2", "10"]), "10");
  assert.strictEqual(d3.least(["10", "2", NaN]), "10");
  assert.strictEqual(d3.least([NaN, "10", "2"]), "10");
  assert.strictEqual(d3.least(["2", NaN, "10"]), "10");
  assert.strictEqual(d3.least([2, NaN, 10]), 2);
  assert.strictEqual(d3.least([10, 2, NaN]), 2);
  assert.strictEqual(d3.least([NaN, 10, 2]), 2);
});

it("least(array, compare) compares using the specified compare function", () => {
  const a = {name: "a"}, b = {name: "b"};
  assert.deepStrictEqual(d3.least([a, b], (a, b) => a.name.localeCompare(b.name)), {name: "a"});
  assert.strictEqual(d3.least([1, 0], d3.descending), 1);
  assert.strictEqual(d3.least(["1", 0], d3.descending), "1");
  assert.strictEqual(d3.least(["2", "10"], d3.descending), "2");
  assert.strictEqual(d3.least(["2", NaN, "10"], d3.descending), "2");
  assert.strictEqual(d3.least([2, NaN, 10], d3.descending), 10);
});

it("least(array, accessor) uses the specified accessor function", () => {
  const a = {name: "a", v: 42}, b = {name: "b", v: 0.42};
  assert.deepStrictEqual(d3.least([a, b], d => d.name), a);
  assert.deepStrictEqual(d3.least([a, b], d => d.v), b);
});

it("least(array) returns undefined if the array is empty", () => {
  assert.strictEqual(d3.least([]), undefined);
});

it("least(array) returns undefined if the array contains only incomparable values", () => {
  assert.strictEqual(d3.least([NaN, undefined]), undefined);
  assert.strictEqual(d3.least([NaN, "foo"], (a, b) => a - b), undefined);
});

it("least(array) returns the first of equal values", () => {
  assert.deepStrictEqual(d3.least([2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), ascendingValue), {value: 0, index: 4});
  assert.deepStrictEqual(d3.least([3, 2, 2, 1, 1, 0, 0, 0, 3, 0].map(box), descendingValue), {value: 3, index: 0});
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

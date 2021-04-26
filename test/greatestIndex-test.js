import assert from "assert";
import * as d3 from "../src/index.js";

it("greatestIndex(array) compares using natural order", () => {
  assert.strictEqual(d3.greatestIndex([0, 1]), 1);
  assert.strictEqual(d3.greatestIndex([1, 0]), 0);
  assert.strictEqual(d3.greatestIndex([0, "1"]), 1);
  assert.strictEqual(d3.greatestIndex(["1", 0]), 0);
  assert.strictEqual(d3.greatestIndex(["10", "2"]), 1);
  assert.strictEqual(d3.greatestIndex(["2", "10"]), 0);
  assert.strictEqual(d3.greatestIndex(["10", "2", NaN]), 1);
  assert.strictEqual(d3.greatestIndex([NaN, "10", "2"]), 2);
  assert.strictEqual(d3.greatestIndex(["2", NaN, "10"]), 0);
  assert.strictEqual(d3.greatestIndex([2, NaN, 10]), 2);
  assert.strictEqual(d3.greatestIndex([10, 2, NaN]), 0);
  assert.strictEqual(d3.greatestIndex([NaN, 10, 2]), 1);
});

it("greatestIndex(array, compare) compares using the specified compare function", () => {
  const a = {name: "a"}, b = {name: "b"};
  assert.strictEqual(d3.greatestIndex([a, b], (a, b) => a.name.localeCompare(b.name)), 1);
  assert.strictEqual(d3.greatestIndex([1, 0], d3.ascending), 0);
  assert.strictEqual(d3.greatestIndex(["1", 0], d3.ascending), 0);
  assert.strictEqual(d3.greatestIndex(["2", "10"], d3.ascending), 0);
  assert.strictEqual(d3.greatestIndex(["2", NaN, "10"], d3.ascending), 0);
  assert.strictEqual(d3.greatestIndex([2, NaN, 10], d3.ascending), 2);
});

it("greatestIndex(array, accessor) uses the specified accessor function", () => {
  const a = {name: "a", v: 42}, b = {name: "b", v: 0.42};
  assert.deepStrictEqual(d3.greatestIndex([a, b], d => d.name), 1);
  assert.deepStrictEqual(d3.greatestIndex([a, b], d => d.v), 0);
});

it("greatestIndex(array) returns -1 if the array is empty", () => {
  assert.strictEqual(d3.greatestIndex([]), -1);
});

it("greatestIndex(array) returns -1 if the array contains only incomparable values", () => {
  assert.strictEqual(d3.greatestIndex([NaN, undefined]), -1);
  assert.strictEqual(d3.greatestIndex([NaN, "foo"], (a, b) => a - b), -1);
});

it("greatestIndex(array) returns the first of equal values", () => {
  assert.strictEqual(d3.greatestIndex([-2, -2, -1, -1, 0, 0, 0, -3, 0]), 4);
  assert.strictEqual(d3.greatestIndex([-3, -2, -2, -1, -1, 0, 0, 0, -3, 0], d3.descending), 0);
});

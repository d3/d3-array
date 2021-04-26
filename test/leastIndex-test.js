import assert from "assert";
import * as d3 from "../src/index.js";

it("leastIndex(array) compares using natural order", () => {
  assert.strictEqual(d3.leastIndex([0, 1]), 0);
  assert.strictEqual(d3.leastIndex([1, 0]), 1);
  assert.strictEqual(d3.leastIndex([0, "1"]), 0);
  assert.strictEqual(d3.leastIndex(["1", 0]), 1);
  assert.strictEqual(d3.leastIndex(["10", "2"]), 0);
  assert.strictEqual(d3.leastIndex(["2", "10"]), 1);
  assert.strictEqual(d3.leastIndex(["10", "2", NaN]), 0);
  assert.strictEqual(d3.leastIndex([NaN, "10", "2"]), 1);
  assert.strictEqual(d3.leastIndex(["2", NaN, "10"]), 2);
  assert.strictEqual(d3.leastIndex([2, NaN, 10]), 0);
  assert.strictEqual(d3.leastIndex([10, 2, NaN]), 1);
  assert.strictEqual(d3.leastIndex([NaN, 10, 2]), 2);
});

it("leastIndex(array, compare) compares using the specified compare function", () => {
  const a = {name: "a"}, b = {name: "b"};
  assert.strictEqual(d3.leastIndex([a, b], (a, b) => a.name.localeCompare(b.name)), 0);
  assert.strictEqual(d3.leastIndex([1, 0], d3.descending), 0);
  assert.strictEqual(d3.leastIndex(["1", 0], d3.descending), 0);
  assert.strictEqual(d3.leastIndex(["2", "10"], d3.descending), 0);
  assert.strictEqual(d3.leastIndex(["2", NaN, "10"], d3.descending), 0);
  assert.strictEqual(d3.leastIndex([2, NaN, 10], d3.descending), 2);
});

it("leastIndex(array, accessor) uses the specified accessor function", () => {
  const a = {name: "a", v: 42}, b = {name: "b", v: 0.42};
  assert.deepStrictEqual(d3.leastIndex([a, b], d => d.name), 0);
  assert.deepStrictEqual(d3.leastIndex([a, b], d => d.v), 1);
});

it("leastIndex(array) returns -1 if the array is empty", () => {
  assert.strictEqual(d3.leastIndex([]), -1);
});

it("leastIndex(array) returns -1 if the array contains only incomparable values", () => {
  assert.strictEqual(d3.leastIndex([NaN, undefined]), -1);
  assert.strictEqual(d3.leastIndex([NaN, "foo"], (a, b) => a - b), -1);
});

it("leastIndex(array) returns the first of equal values", () => {
  assert.strictEqual(d3.leastIndex([2, 2, 1, 1, 0, 0, 0, 3, 0]), 4);
  assert.strictEqual(d3.leastIndex([3, 2, 2, 1, 1, 0, 0, 0, 3, 0], d3.descending), 0);
});

import assert from "assert";
import * as d3 from "../src/index.js";

it("scan(array) compares using natural order", () => {
  assert.strictEqual(d3.scan([0, 1]), 0);
  assert.strictEqual(d3.scan([1, 0]), 1);
  assert.strictEqual(d3.scan([0, "1"]), 0);
  assert.strictEqual(d3.scan(["1", 0]), 1);
  assert.strictEqual(d3.scan(["10", "2"]), 0);
  assert.strictEqual(d3.scan(["2", "10"]), 1);
  assert.strictEqual(d3.scan(["10", "2", NaN]), 0);
  assert.strictEqual(d3.scan([NaN, "10", "2"]), 1);
  assert.strictEqual(d3.scan(["2", NaN, "10"]), 2);
  assert.strictEqual(d3.scan([2, NaN, 10]), 0);
  assert.strictEqual(d3.scan([10, 2, NaN]), 1);
  assert.strictEqual(d3.scan([NaN, 10, 2]), 2);
});

it("scan(array, compare) compares using the specified compare function", () => {
  var a = {name: "a"}, b = {name: "b"};
  assert.strictEqual(d3.scan([a, b], (a, b) => a.name.localeCompare(b.name)), 0);
  assert.strictEqual(d3.scan([1, 0], d3.descending), 0);
  assert.strictEqual(d3.scan(["1", 0], d3.descending), 0);
  assert.strictEqual(d3.scan(["2", "10"], d3.descending), 0);
  assert.strictEqual(d3.scan(["2", NaN, "10"], d3.descending), 0);
  assert.strictEqual(d3.scan([2, NaN, 10], d3.descending), 2);
});

it("scan(array) returns undefined if the array is empty", () => {
  assert.strictEqual(d3.scan([]), undefined);
});

it("scan(array) returns undefined if the array contains only incomparable values", () => {
  assert.strictEqual(d3.scan([NaN, undefined]), undefined);
  assert.strictEqual(d3.scan([NaN, "foo"], (a, b) => a - b), undefined);
});

it("scan(array) returns the first of equal values", () => {
  assert.strictEqual(d3.scan([2, 2, 1, 1, 0, 0, 0, 3, 0]), 4);
  assert.strictEqual(d3.scan([3, 2, 2, 1, 1, 0, 0, 0, 3, 0], d3.descending), 0);
});

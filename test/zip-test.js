import assert from "assert";
import * as d3 from "../src/index.js";

it("zip() and zip([]) return an empty array", () => {
  assert.deepEqual(d3.zip(), []);
  assert.deepEqual(d3.zip([]), []);
});

it("zip([a, b, …]) returns [[a], [b], …]", () => {
  assert.deepEqual(d3.zip([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]]);
});

it("zip([a1, b1, …], [a2, b2, …]) returns [[a1, a2], [b1, b2], …]", () => {
  assert.deepEqual(d3.zip([1, 2], [3, 4]), [[1, 3], [2, 4]]);
  assert.deepEqual(d3.zip([1, 2, 3, 4, 5], [2, 4, 6, 8, 10]), [[1, 2], [2, 4], [3, 6], [4, 8], [5, 10]]);
});

it("zip([a1, b1, …], [a2, b2, …], [a3, b3, …]) returns [[a1, a2, a3], [b1, b2, b3], …]", () => {
  assert.deepEqual(d3.zip([1, 2, 3], [4, 5, 6], [7, 8, 9]), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
});

it("zip(…) ignores extra elements given an irregular matrix", () => {
  assert.deepEqual(d3.zip([1, 2], [3, 4], [5, 6, 7]), [[1, 3, 5], [2, 4, 6]]);
});

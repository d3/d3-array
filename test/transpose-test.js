import assert from "assert";
import * as d3 from "../src/index.js";

it("transpose([]) and transpose([[]]) return an empty array", () => {
  assert.deepEqual(d3.transpose([]), []);
  assert.deepEqual(d3.transpose([[]]), []);
});

it("transpose([[a, b, …]]) returns [[a], [b], …]", () => {
  assert.deepEqual(d3.transpose([[1, 2, 3, 4, 5]]), [[1], [2], [3], [4], [5]]);
});

it("transpose([[a1, b1, …], [a2, b2, …]]) returns [[a1, a2], [b1, b2], …]", () => {
  assert.deepEqual(d3.transpose([[1, 2], [3, 4]]), [[1, 3], [2, 4]]);
  assert.deepEqual(d3.transpose([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]]), [[1, 2], [2, 4], [3, 6], [4, 8], [5, 10]]);
});

it("transpose([[a1, b1, …], [a2, b2, …], [a3, b3, …]]) returns [[a1, a2, a3], [b1, b2, b3], …]", () => {
  assert.deepEqual(d3.transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
});

it("transpose(…) ignores extra elements given an irregular matrix", () => {
  assert.deepEqual(d3.transpose([[1, 2], [3, 4], [5, 6, 7]]), [[1, 3, 5], [2, 4, 6]]);
});

it("transpose(…) returns a copy", () => {
  const matrix = [[1, 2], [3, 4]];
  const tranpose = d3.transpose(matrix);
  matrix[0][0] = matrix[0][1] = matrix[1][0] = matrix[1][1] = 0;
  assert.deepEqual(tranpose, [[1, 3], [2, 4]]);
});

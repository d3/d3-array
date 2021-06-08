import assert from "assert";
import {transpose} from "../src/index.js";

it("transpose([]) and transpose([[]]) return an empty array", () => {
  assert.deepStrictEqual(transpose([]), []);
  assert.deepStrictEqual(transpose([[]]), []);
});

it("transpose([[a, b, …]]) returns [[a], [b], …]", () => {
  assert.deepStrictEqual(transpose([[1, 2, 3, 4, 5]]), [[1], [2], [3], [4], [5]]);
});

it("transpose([[a1, b1, …], [a2, b2, …]]) returns [[a1, a2], [b1, b2], …]", () => {
  assert.deepStrictEqual(transpose([[1, 2], [3, 4]]), [[1, 3], [2, 4]]);
  assert.deepStrictEqual(transpose([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]]), [[1, 2], [2, 4], [3, 6], [4, 8], [5, 10]]);
});

it("transpose([[a1, b1, …], [a2, b2, …], [a3, b3, …]]) returns [[a1, a2, a3], [b1, b2, b3], …]", () => {
  assert.deepStrictEqual(transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
});

it("transpose(…) ignores extra elements given an irregular matrix", () => {
  assert.deepStrictEqual(transpose([[1, 2], [3, 4], [5, 6, 7]]), [[1, 3, 5], [2, 4, 6]]);
});

it("transpose(…) returns a copy", () => {
  const matrix = [[1, 2], [3, 4]];
  const t = transpose(matrix);
  matrix[0][0] = matrix[0][1] = matrix[1][0] = matrix[1][1] = 0;
  assert.deepStrictEqual(t, [[1, 3], [2, 4]]);
});

tape("transpose([objects]) transposes an array of objects", function(test) {
  test.deepEqual(arrays.transpose([{a:1, b:2}, {a:3, b:4}, {a:5, b:6}]), {a: [1, 3, 5], b: [2, 4, 6]});
  test.end();
});

tape("transpose([objects]) only uses properties present in all the objects", function(test) {
  test.deepEqual(arrays.transpose([{a:1, b:2, c:-1}, {a:3, b:4}, {a:5, b:6, d:-1}]), {a: [1, 3, 5], b:[2, 4, 6]});
  test.end();
});

tape("transpose(object) transposes an object of arrays", function(test) {
  test.deepEqual(arrays.transpose({a: [1, 3, 5], b: [2, 4, 6]}), [{a:1, b:2}, {a:3, b:4}, {a:5, b:6}]);
  test.end();
});

tape("transpose(object) ignores extra elements", function(test) {
  test.deepEqual(arrays.transpose({a: [1, 3, 5], b: [2, 4, 6, 8]}), [{a:1, b:2}, {a:3, b:4}, {a:5, b:6}]);
  test.end();
});

tape("transpose(object) transposes an object of objects", function(test) {
  test.deepEqual(arrays.transpose({A: {a:1, b:2, c:-1}, B: {a:3, b:4}, C: {a:5, b:6, d:-1}}), { a: { A: 1, B: 3, C: 5 }, b: { A: 2, B: 4, C: 6 } });
  test.end();
});


import {test} from "vitest";
import assert from "assert";
import {cross} from "../src/index.js";

test("cross() returns an empty array", () => {
  assert.deepStrictEqual(cross(), []);
});

test("cross([]) returns an empty array", () => {
  assert.deepStrictEqual(cross([]), []);
});

test("cross([1, 2], []) returns an empty array", () => {
  assert.deepStrictEqual(cross([1, 2], []), []);
});

test("cross({length: weird}) returns an empty array", () => {
  assert.deepStrictEqual(cross({length: NaN}), []);
  assert.deepStrictEqual(cross({length: 0.5}), []);
  assert.deepStrictEqual(cross({length: -1}), []);
  assert.deepStrictEqual(cross({length: undefined}), []);
});

test("cross(...strings) returns the expected result", () => {
  assert.deepStrictEqual(cross("foo", "bar", (a, b) => a + b), ["fb", "fa", "fr", "ob", "oa", "or", "ob", "oa", "or"]);
});

test("cross(a) returns the expected result", () => {
  assert.deepStrictEqual(cross([1, 2]), [[1], [2]]);
});

test("cross(a, b) returns Cartesian product a×b", () => {
  assert.deepStrictEqual(cross([1, 2], ["x", "y"]), [[1, "x"], [1, "y"], [2, "x"], [2, "y"]]);
});

test("cross(a, b, c) returns Cartesian product a×b×c", () => {
  assert.deepStrictEqual(cross([1, 2], [3, 4], [5, 6, 7]), [
    [1, 3, 5],
    [1, 3, 6],
    [1, 3, 7],
    [1, 4, 5],
    [1, 4, 6],
    [1, 4, 7],
    [2, 3, 5],
    [2, 3, 6],
    [2, 3, 7],
    [2, 4, 5],
    [2, 4, 6],
    [2, 4, 7]
  ]);
});

test("cross(a, b, f) invokes the specified function for each pair", () => {
  assert.deepStrictEqual(cross([1, 2], ["x", "y"], (a, b) => a + b), ["1x", "1y", "2x", "2y"]);
});

test("cross(a, b, c, f) invokes the specified function for each triple", () => {
  assert.deepStrictEqual(cross([1, 2], [3, 4], [5, 6, 7], (a, b, c) => a + b + c), [9, 10, 11, 10, 11, 12, 10, 11, 12, 11, 12, 13]);
});

test("cross(a, b) returns Cartesian product a×b of generators", () => {
  assert.deepStrictEqual(cross(generate(1, 2), generate("x", "y")), [[1, "x"], [1, "y"], [2, "x"], [2, "y"]]);
});

function* generate(...values) {
  yield* values;
}

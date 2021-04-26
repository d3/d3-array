import assert from "assert";
import * as d3 from "../src/index.js";

it("cross() returns an empty array", () => {
  assert.deepStrictEqual(d3.cross(), []);
});

it("cross([]) returns an empty array", () => {
  assert.deepStrictEqual(d3.cross([]), []);
});

it("cross([1, 2], []) returns an empty array", () => {
  assert.deepStrictEqual(d3.cross([1, 2], []), []);
});

it("cross({length: weird}) returns an empty array", () => {
  assert.deepStrictEqual(d3.cross({length: NaN}), []);
  assert.deepStrictEqual(d3.cross({length: 0.5}), []);
  assert.deepStrictEqual(d3.cross({length: -1}), []);
  assert.deepStrictEqual(d3.cross({length: undefined}), []);
});

it("cross(...strings) returns the expected result", () => {
  assert.deepStrictEqual(d3.cross("foo", "bar", (a, b) => a + b), ["fb", "fa", "fr", "ob", "oa", "or", "ob", "oa", "or"]);
});

it("cross(a) returns the expected result", () => {
  assert.deepStrictEqual(d3.cross([1, 2]), [[1], [2]]);
});

it("cross(a, b) returns Cartesian product a×b", () => {
  assert.deepStrictEqual(d3.cross([1, 2], ["x", "y"]), [[1, "x"], [1, "y"], [2, "x"], [2, "y"]]);
});

it("cross(a, b, c) returns Cartesian product a×b×c", () => {
  assert.deepStrictEqual(d3.cross([1, 2], [3, 4], [5, 6, 7]), [
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

it("cross(a, b, f) invokes the specified function for each pair", () => {
  assert.deepStrictEqual(d3.cross([1, 2], ["x", "y"], (a, b) => a + b), ["1x", "1y", "2x", "2y"]);
});

it("cross(a, b, c, f) invokes the specified function for each triple", () => {
  assert.deepStrictEqual(d3.cross([1, 2], [3, 4], [5, 6, 7], (a, b, c) => a + b + c), [9, 10, 11, 10, 11, 12, 10, 11, 12, 11, 12, 13]);
});

it("cross(a, b) returns Cartesian product a×b of generators", () => {
  assert.deepStrictEqual(d3.cross(generate(1, 2), generate("x", "y")), [[1, "x"], [1, "y"], [2, "x"], [2, "y"]]);
});

function* generate(...values) {
  yield* values;
}

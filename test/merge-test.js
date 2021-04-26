import assert from "assert";
import * as d3 from "../src/index.js";

it("merge(d3) merges an array of d3", () => {
  const a = {}, b = {}, c = {}, d = {}, e = {}, f = {};
  assert.deepStrictEqual(d3.merge([[a], [b, c], [d, e, f]]), [a, b, c, d, e, f]);
});

it("merge(d3) returns a new array when zero d3 are passed", () => {
  const input = [];
  const output = d3.merge(input);
  assert.deepStrictEqual(output, []);
  input.push([0.1]);
  assert.deepStrictEqual(input, [[0.1]]);
  assert.deepStrictEqual(output, []);
});

it("merge(d3) returns a new array when one array is passed", () => {
  const input = [[1, 2, 3]];
  const output = d3.merge(input);
  assert.deepStrictEqual(output, [1, 2, 3]);
  input.push([4.1]);
  input[0].push(3.1);
  assert.deepStrictEqual(input, [[1, 2, 3, 3.1], [4.1]]);
  assert.deepStrictEqual(output, [1, 2, 3]);
});

it("merge(d3) returns a new array when two or more d3 are passed", () => {
  const input = [[1, 2, 3], [4, 5], [6]];
  const output = d3.merge(input);
  assert.deepStrictEqual(output, [1, 2, 3, 4, 5, 6]);
  input.push([7.1]);
  input[0].push(3.1);
  input[1].push(5.1);
  input[2].push(6.1);
  assert.deepStrictEqual(input, [[1, 2, 3, 3.1], [4, 5, 5.1], [6, 6.1], [7.1]]);
  assert.deepStrictEqual(output, [1, 2, 3, 4, 5, 6]);
});

it("merge(d3) does not modify the input d3", () => {
  const input = [[1, 2, 3], [4, 5], [6]];
  d3.merge(input);
  assert.deepStrictEqual(input, [[1, 2, 3], [4, 5], [6]]);
});

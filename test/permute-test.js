import assert from "assert";
import * as d3 from "../src/index.js";

it("permute(…) permutes according to the specified index", () => {
  assert.deepEqual(d3.permute([3, 4, 5], [2, 1, 0]), [5, 4, 3]);
  assert.deepEqual(d3.permute([3, 4, 5], [2, 0, 1]), [5, 3, 4]);
  assert.deepEqual(d3.permute([3, 4, 5], [0, 1, 2]), [3, 4, 5]);
});

it("permute(…) does not modify the input array", () => {
  const input = [3, 4, 5];
  d3.permute(input, [2, 1, 0]);
  assert.deepEqual(input, [3, 4, 5]);
});

it("permute(…) can duplicate input values", () => {
  assert.deepEqual(d3.permute([3, 4, 5], [0, 1, 0]), [3, 4, 3]);
  assert.deepEqual(d3.permute([3, 4, 5], [2, 2, 2]), [5, 5, 5]);
  assert.deepEqual(d3.permute([3, 4, 5], [0, 1, 1]), [3, 4, 4]);
});

it("permute(…) can return more elements", () => {
  assert.deepEqual(d3.permute([3, 4, 5], [0, 0, 1, 2]), [3, 3, 4, 5]);
  assert.deepEqual(d3.permute([3, 4, 5], [0, 1, 1, 1]), [3, 4, 4, 4]);
});

it("permute(…) can return fewer elements", () => {
  assert.deepEqual(d3.permute([3, 4, 5], [0]), [3]);
  assert.deepEqual(d3.permute([3, 4, 5], [1, 2]), [4, 5]);
  assert.deepEqual(d3.permute([3, 4, 5], []), []);
});

it("permute(…) can return undefined elements", () => {
  assert.deepEqual(d3.permute([3, 4, 5], [10]), [undefined]);
  assert.deepEqual(d3.permute([3, 4, 5], [-1]), [undefined]);
  assert.deepEqual(d3.permute([3, 4, 5], [0, -1]), [3, undefined]);
});

it("permute(…) can take an object as the source", () => {
  assert.deepEqual(d3.permute({foo: 1, bar: 2}, ["bar", "foo"]), [2, 1]);
});

it("permute(…) can take a typed array as the source", () => {
  assert.deepEqual(d3.permute(Float32Array.of(1, 2), [0, 0, 1, 0]), [1, 1, 2, 1]);
  assert.equal(Array.isArray(d3.permute(Float32Array.of(1, 2), [0])), true);
});

it("permute(…) can take an iterable as the keys", () => {
  assert.deepEqual(d3.permute({foo: 1, bar: 2}, new Set(["bar", "foo"])), [2, 1]);
});

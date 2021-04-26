import assert from "assert";
import * as d3 from "../src/index.js";

it("map(values, mapper) returns the mapped values", () => {
  assert.deepEqual(d3.map([1, 2, 3, 2, 1], x => x * 2), [2, 4, 6, 4, 2]);
});

it("map(values, mapper) accepts an iterable", () => {
  assert.deepEqual(d3.map(new Set([1, 2, 3, 2, 1]), x => x * 2), [2, 4, 6]);
  assert.deepEqual(d3.map((function*() { yield* [1, 2, 3, 2, 1]; })(), x => x * 2), [2, 4, 6, 4, 2]);
});

it("map(values, mapper) accepts a typed array", () => {
  assert.deepEqual(d3.map(Uint8Array.of(1, 2, 3, 2, 1), x => x * 2), [2, 4, 6, 4, 2]);
});

it("map(values, mapper) enforces that test is a function", () => {
  assert.throws(() => d3.map([]), TypeError);
});

it("map(values, mapper) enforces that values is iterable", () => {
  assert.throws(() => d3.map({}, () => true), TypeError);
});

it.skip("map(values, mapper) passes test (value, index, values)", () => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  d3.map(values, function() { calls.push([this, ...arguments]); });
  assert.deepEqual(calls, [
    [global, 5, 0, values],
    [global, 4, 1, values],
    [global, 3, 2, values],
    [global, 2, 3, values],
    [global, 1, 4, values]
  ]);
});

it("map(values, mapper) does not skip sparse elements", () => {
  // eslint-disable-next-line no-sparse-arrays
  assert.deepEqual(d3.map([, 1, 2,,], x => x * 2), [NaN, 2, 4, NaN]);
});

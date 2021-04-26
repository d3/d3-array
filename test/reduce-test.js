import assert from "assert";
import * as d3 from "../src/index.js";

it("reduce(values, reducer) returns the reduced value", () => {
  assert.strictEqual(d3.reduce([1, 2, 3, 2, 1], (p, v) => p + v), 9);
  assert.strictEqual(d3.reduce([1, 2], (p, v) => p + v), 3);
  assert.strictEqual(d3.reduce([1], (p, v) => p + v), 1);
  assert.strictEqual(d3.reduce([], (p, v) => p + v), undefined);
});

it("reduce(values, reducer, initial) returns the reduced value", () => {
  assert.strictEqual(d3.reduce([1, 2, 3, 2, 1], (p, v) => p + v, 0), 9);
  assert.strictEqual(d3.reduce([1], (p, v) => p + v, 0), 1);
  assert.strictEqual(d3.reduce([], (p, v) => p + v, 0), 0);
  assert.deepEqual(d3.reduce([1, 2, 3, 2, 1], (p, v) => p.concat(v), []), [1, 2, 3, 2, 1]);
});

it("reduce(values, reducer) accepts an iterable", () => {
  assert.strictEqual(d3.reduce(new Set([1, 2, 3, 2, 1]), (p, v) => p + v), 6);
  assert.strictEqual(d3.reduce((function*() { yield* [1, 2, 3, 2, 1]; })(), (p, v) => p + v), 9);
  assert.strictEqual(d3.reduce(Uint8Array.of(1, 2, 3, 2, 1), (p, v) => p + v), 9);
});

it("reduce(values, reducer) enforces that test is a function", () => {
  assert.throws(() => d3.reduce([]), TypeError);
});

it("reduce(values, reducer) enforces that values is iterable", () => {
  assert.throws(() => d3.reduce({}, () => true), TypeError);
});

it.skip("reduce(values, reducer) passes reducer (reduced, value, index, values)", () => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  d3.reduce(values, function(p, v) { calls.push([this, ...arguments]); return p + v; });
  assert.deepEqual(calls, [
    [global, 5, 4, 1, values],
    [global, 9, 3, 2, values],
    [global, 12, 2, 3, values],
    [global, 14, 1, 4, values]
  ]);
});

it.skip("reduce(values, reducer, initial) passes reducer (reduced, value, index, values)", () => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  d3.reduce(values, function(p, v) { calls.push([this, ...arguments]); return p + v; }, 0);
  assert.deepEqual(calls, [
    [global, 0, 5, 0, values],
    [global, 5, 4, 1, values],
    [global, 9, 3, 2, values],
    [global, 12, 2, 3, values],
    [global, 14, 1, 4, values]
  ]);
});

it("reduce(values, reducer, initial) does not skip sparse elements", () => {
  // eslint-disable-next-line no-sparse-arrays
  assert.strictEqual(d3.reduce([, 1, 2,,], (p, v) => p + (v === undefined ? -1 : v), 0), 1);
});

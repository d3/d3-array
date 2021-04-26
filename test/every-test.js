import assert from "assert";
import * as d3 from "../src/index.js";

it("every(values, test) returns true if all tests pass", () => {
  assert.strictEqual(d3.every([1, 2, 3, 2, 1], x => x & 1), false);
  assert.strictEqual(d3.every([1, 2, 3, 2, 1], x => x >= 1), true);
});

it("every(values, test) returns true if values is empty", () => {
  assert.strictEqual(d3.every([], () => false), true);
});

it("every(values, test) accepts an iterable", () => {
  assert.strictEqual(d3.every(new Set([1, 2, 3, 2, 1]), x => x >= 1), true);
  assert.strictEqual(d3.every((function*() { yield* [1, 2, 3, 2, 1]; })(), x => x >= 1), true);
  assert.strictEqual(d3.every(Uint8Array.of(1, 2, 3, 2, 1), x => x >= 1), true);
});

it("every(values, test) enforces that test is a function", () => {
  assert.throws(() => d3.every([]), TypeError);
});

it("every(values, test) enforces that values is iterable", () => {
  assert.throws(() => d3.every({}, () => true), TypeError);
});

it("every(values, test) passes test (value, index, values)", () => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  d3.every(values, function() { return calls.push([this, ...arguments]); });
  assert.deepStrictEqual(calls, [
    [undefined, 5, 0, values],
    [undefined, 4, 1, values],
    [undefined, 3, 2, values],
    [undefined, 2, 3, values],
    [undefined, 1, 4, values]
  ]);
});

it("every(values, test) short-circuts when test returns falsey", () => {
  let calls = 0;
  assert.strictEqual(d3.every([1, 2, 3], x => (++calls, x < 2)), false);
  assert.strictEqual(calls, 2);
  assert.strictEqual(d3.every([1, 2, 3], x => (++calls, x - 2)), false);
  assert.strictEqual(calls, 4);
});

it("every(values, test) does not skip sparse elements", () => {
  // eslint-disable-next-line no-sparse-arrays
  assert.deepStrictEqual(d3.every([, 1, 2,,], x => x === undefined || x >=1), true);
  // eslint-disable-next-line no-sparse-arrays
  assert.deepStrictEqual(d3.every([, 1, 2,,], x => x >=1), false);
});

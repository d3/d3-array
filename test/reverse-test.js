import assert from "assert";
import * as d3 from "../src/index.js";

it("reverse(values) returns a reversed copy", () => {
  const input = [1, 3, 2, 5, 4];
  assert.deepEqual(d3.reverse(input), [4, 5, 2, 3, 1]);
  assert.deepEqual(input, [1, 3, 2, 5, 4]); // does not mutate
});

it("reverse(values) returns an array", () => {
  assert.strictEqual(Array.isArray(d3.reverse(Uint8Array.of(1, 2))), true);
});

it("reverse(values) accepts an iterable", () => {
  assert.deepEqual(d3.reverse(new Set([1, 2, 3, 2, 1])), [3, 2, 1]);
  assert.deepEqual(d3.reverse((function*() { yield* [1, 3, 2, 5, 4]; })()), [4, 5, 2, 3, 1]);
  assert.deepEqual(d3.reverse(Uint8Array.of(1, 3, 2, 5, 4)), [4, 5, 2, 3, 1]);
});

it("reverse(values) enforces that values is iterable", () => {
  assert.throws(() => d3.reverse({}), TypeError);
});

it("reverse(values) does not skip sparse elements", () => {
  // eslint-disable-next-line no-sparse-arrays
  assert.deepEqual(d3.reverse([, 1, 2,,]), [undefined, 2, 1, undefined]);
});

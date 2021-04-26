import assert from "assert";
import * as d3 from "../src/index.js";

it("sort(values) returns a sorted copy", () => {
  const input = [1, 3, 2, 5, 4];
  assert.deepEqual(d3.sort(input), [1, 2, 3, 4, 5]);
  assert.deepEqual(input, [1, 3, 2, 5, 4]); // does not mutate
});

it("sort(values) defaults to ascending, not lexicographic", () => {
  const input = [1, "10", 2];
  assert.deepEqual(d3.sort(input), [1, 2, "10"]);
});

it("sort(values, accessor) uses the specified accessor in natural order", () => {
  assert.deepEqual(d3.sort([1, 3, 2, 5, 4], d => d), [1, 2, 3, 4, 5]);
  assert.deepEqual(d3.sort([1, 3, 2, 5, 4], d => -d), [5, 4, 3, 2, 1]);
});

it("sort(values, ...accessors) accepts multiple accessors", () => {
  assert.deepEqual(d3.sort([[1, 0], [2, 1], [2, 0], [1, 1], [3, 0]], ([x]) => x, ([, y]) => y), [[1, 0], [1, 1], [2, 0], [2, 1], [3, 0]]);
  assert.deepEqual(d3.sort([{x: 1, y: 0}, {x: 2, y: 1}, {x: 2, y: 0}, {x: 1, y: 1}, {x: 3, y: 0}], ({x}) => x, ({y}) => y), [{x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 3, y: 0}]);
});

it("sort(values, comparator) uses the specified comparator", () => {
  assert.deepEqual(d3.sort([1, 3, 2, 5, 4], d3.descending), [5, 4, 3, 2, 1]);
});

it("sort(values) returns an array", () => {
  assert.strictEqual(Array.isArray(d3.sort(Uint8Array.of(1, 2))), true);
});

it("sort(values) accepts an iterable", () => {
  assert.deepEqual(d3.sort(new Set([1, 3, 2, 1, 2])), [1, 2, 3]);
  assert.deepEqual(d3.sort((function*() { yield* [1, 3, 2, 5, 4]; })()), [1, 2, 3, 4, 5]);
  assert.deepEqual(d3.sort(Uint8Array.of(1, 3, 2, 5, 4)), [1, 2, 3, 4, 5]);
});

it("sort(values) enforces that values is iterable", () => {
  assert.throws(() => d3.sort({}), TypeError);
});

it("sort(values, comparator) enforces that comparator is a function", () => {
  assert.throws(() => d3.sort([], {}), TypeError);
});

it("sort(values) does not skip sparse elements", () => {
  // eslint-disable-next-line no-sparse-arrays
  assert.deepEqual(d3.sort([, 1, 2,,]), [1, 2, undefined, undefined]);
});

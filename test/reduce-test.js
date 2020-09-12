const tape = require("tape-await");
const d3 = require("../");

tape("reduce(values, reducer) returns the reduced value", (test) => {
  test.strictEqual(d3.reduce([1, 2, 3, 2, 1], (p, v) => p + v), 9);
  test.strictEqual(d3.reduce([1, 2], (p, v) => p + v), 3);
  test.strictEqual(d3.reduce([1], (p, v) => p + v), 1);
  test.strictEqual(d3.reduce([], (p, v) => p + v), undefined);
});

tape("reduce(values, reducer, initial) returns the reduced value", (test) => {
  test.strictEqual(d3.reduce([1, 2, 3, 2, 1], (p, v) => p + v, 0), 9);
  test.strictEqual(d3.reduce([1], (p, v) => p + v, 0), 1);
  test.strictEqual(d3.reduce([], (p, v) => p + v, 0), 0);
  test.deepEqual(d3.reduce([1, 2, 3, 2, 1], (p, v) => p.concat(v), []), [1, 2, 3, 2, 1]);
});

tape("reduce(values, reducer) accepts an iterable", (test) => {
  test.strictEqual(d3.reduce(new Set([1, 2, 3, 2, 1]), (p, v) => p + v), 6);
  test.strictEqual(d3.reduce((function*() { yield* [1, 2, 3, 2, 1]; })(), (p, v) => p + v), 9);
  test.strictEqual(d3.reduce(Uint8Array.of(1, 2, 3, 2, 1), (p, v) => p + v), 9);
});

tape("reduce(values, reducer) enforces that test is a function", (test) => {
  test.throws(() => d3.reduce([]), TypeError);
});

tape("reduce(values, reducer) enforces that values is iterable", (test) => {
  test.throws(() => d3.reduce({}, () => true), TypeError);
});

tape("reduce(values, reducer) passes reducer (reduced, value, index, values)", (test) => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  d3.reduce(values, function(p, v) { calls.push([this, ...arguments]); return p + v; });
  test.deepEqual(calls, [
    [global, 5, 4, 1, values],
    [global, 9, 3, 2, values],
    [global, 12, 2, 3, values],
    [global, 14, 1, 4, values]
  ]);
});

tape("reduce(values, reducer, initial) passes reducer (reduced, value, index, values)", (test) => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  d3.reduce(values, function(p, v) { calls.push([this, ...arguments]); return p + v; }, 0);
  test.deepEqual(calls, [
    [global, 0, 5, 0, values],
    [global, 5, 4, 1, values],
    [global, 9, 3, 2, values],
    [global, 12, 2, 3, values],
    [global, 14, 1, 4, values]
  ]);
});

tape("reduce(values, reducer, initial) does not skip sparse elements", (test) => {
  // eslint-disable-next-line no-sparse-arrays
  test.strictEqual(d3.reduce([, 1, 2,,], (p, v) => p + (v === undefined ? -1 : v), 0), 1);
});

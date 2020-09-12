const tape = require("tape-await");
const d3 = require("../");

tape("map(values, mapper) returns the mapped values", (test) => {
  test.deepEqual(d3.map([1, 2, 3, 2, 1], x => x * 2), [2, 4, 6, 4, 2]);
});

tape("map(values, mapper) accepts an iterable", (test) => {
  test.deepEqual(d3.map(new Set([1, 2, 3, 2, 1]), x => x * 2), [2, 4, 6]);
  test.deepEqual(d3.map((function*() { yield* [1, 2, 3, 2, 1]; })(), x => x * 2), [2, 4, 6, 4, 2]);
});

tape("map(values, mapper) accepts a typed array", (test) => {
  test.deepEqual(d3.map(Uint8Array.of(1, 2, 3, 2, 1), x => x * 2), [2, 4, 6, 4, 2]);
});

tape("map(values, mapper) enforces that test is a function", (test) => {
  test.throws(() => d3.map([]), TypeError);
});

tape("map(values, mapper) enforces that values is iterable", (test) => {
  test.throws(() => d3.map({}, () => true), TypeError);
});

tape("map(values, mapper) passes test (value, index, values)", (test) => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  d3.map(values, function() { calls.push([this, ...arguments]); });
  test.deepEqual(calls, [
    [global, 5, 0, values],
    [global, 4, 1, values],
    [global, 3, 2, values],
    [global, 2, 3, values],
    [global, 1, 4, values]
  ]);
});

tape("map(values, mapper) does not skip sparse elements", (test) => {
  // eslint-disable-next-line no-sparse-arrays
  test.deepEqual(d3.map([, 1, 2,,], x => x * 2), [NaN, 2, 4, NaN]);
});

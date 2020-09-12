const tape = require("tape-await");
const d3 = require("../");

tape("filter(values, test) returns the values that pass the test", (test) => {
  test.deepEqual(d3.filter([1, 2, 3, 2, 1], x => x & 1), [1, 3, 1]);
});

tape("filter(values, test) accepts an iterable", (test) => {
  test.deepEqual(d3.filter(new Set([1, 2, 3, 2, 1]), x => x & 1), [1, 3]);
  test.deepEqual(d3.filter((function*() { yield* [1, 2, 3, 2, 1]; })(), x => x & 1), [1, 3, 1]);
});

tape("filter(values, test) accepts a typed array", (test) => {
  test.deepEqual(d3.filter(Uint8Array.of(1, 2, 3, 2, 1), x => x & 1), [1, 3, 1]);
});

tape("filter(values, test) enforces that test is a function", (test) => {
  test.throws(() => d3.filter([]), TypeError);
});

tape("filter(values, test) enforces that values is iterable", (test) => {
  test.throws(() => d3.filter({}, () => true), TypeError);
});

tape("filter(values, test) passes test (value, index, values)", (test) => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  d3.filter(values, function() { calls.push([this, ...arguments]); });
  test.deepEqual(calls, [
    [global, 5, 0, values],
    [global, 4, 1, values],
    [global, 3, 2, values],
    [global, 2, 3, values],
    [global, 1, 4, values]
  ]);
});

tape("filter(values, test) does not skip sparse elements", (test) => {
  // eslint-disable-next-line no-sparse-arrays
  test.deepEqual(d3.filter([, 1, 2,,], () => true), [undefined, 1, 2, undefined]);
});

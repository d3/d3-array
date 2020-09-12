const tape = require("tape-await");
const d3 = require("../");

tape("some(values, test) returns true if any test passes", (test) => {
  test.strictEqual(d3.some([1, 2, 3, 2, 1], x => x & 1), true);
  test.strictEqual(d3.some([1, 2, 3, 2, 1], x => x > 3), false);
});

tape("some(values, test) returns false if values is empty", (test) => {
  test.strictEqual(d3.some([], () => true), false);
});

tape("some(values, test) accepts an iterable", (test) => {
  test.strictEqual(d3.some(new Set([1, 2, 3, 2, 1]), x => x >= 3), true);
  test.strictEqual(d3.some((function*() { yield* [1, 2, 3, 2, 1]; })(), x => x >= 3), true);
  test.strictEqual(d3.some(Uint8Array.of(1, 2, 3, 2, 1), x => x >= 3), true);
});

tape("some(values, test) enforces that test is a function", (test) => {
  test.throws(() => d3.some([]), TypeError);
});

tape("some(values, test) enforces that values is iterable", (test) => {
  test.throws(() => d3.some({}, () => true), TypeError);
});

tape("some(values, test) passes test (value, index, values)", (test) => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  d3.some(values, function() { calls.push([this, ...arguments]); });
  test.deepEqual(calls, [
    [global, 5, 0, values],
    [global, 4, 1, values],
    [global, 3, 2, values],
    [global, 2, 3, values],
    [global, 1, 4, values]
  ]);
});

tape("some(values, test) short-circuts when test returns truthy", (test) => {
  let calls = 0;
  test.strictEqual(d3.some([1, 2, 3], x => (++calls, x >= 2)), true);
  test.strictEqual(calls, 2);
  test.strictEqual(d3.some([1, 2, 3], x => (++calls, x - 1)), true);
  test.strictEqual(calls, 4);
});

tape("some(values, test) does not skip sparse elements", (test) => {
  // eslint-disable-next-line no-sparse-arrays
  test.deepEqual(d3.some([, 1, 2,,], x => x === undefined), true);
});

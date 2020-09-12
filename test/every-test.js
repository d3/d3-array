const tape = require("tape-await");
const d3 = require("../");

tape("every(values, test) returns true if all tests pass", (test) => {
  test.strictEqual(d3.every([1, 2, 3, 2, 1], x => x & 1), false);
  test.strictEqual(d3.every([1, 2, 3, 2, 1], x => x >= 1), true);
});

tape("every(values, test) returns true if values is empty", (test) => {
  test.strictEqual(d3.every([], () => false), true);
});

tape("every(values, test) accepts an iterable", (test) => {
  test.strictEqual(d3.every(new Set([1, 2, 3, 2, 1]), x => x >= 1), true);
  test.strictEqual(d3.every((function*() { yield* [1, 2, 3, 2, 1]; })(), x => x >= 1), true);
  test.strictEqual(d3.every(Uint8Array.of(1, 2, 3, 2, 1), x => x >= 1), true);
});

tape("every(values, test) enforces that test is a function", (test) => {
  test.throws(() => d3.every([]), TypeError);
});

tape("every(values, test) enforces that values is iterable", (test) => {
  test.throws(() => d3.every({}, () => true), TypeError);
});

tape("every(values, test) passes test (value, index, values)", (test) => {
  const calls = [];
  const values = new Set([5, 4, 3, 2, 1]);
  d3.every(values, function() { return calls.push([this, ...arguments]); });
  test.deepEqual(calls, [
    [global, 5, 0, values],
    [global, 4, 1, values],
    [global, 3, 2, values],
    [global, 2, 3, values],
    [global, 1, 4, values]
  ]);
});

tape("every(values, test) short-circuts when test returns falsey", (test) => {
  let calls = 0;
  test.strictEqual(d3.every([1, 2, 3], x => (++calls, x < 2)), false);
  test.strictEqual(calls, 2);
  test.strictEqual(d3.every([1, 2, 3], x => (++calls, x - 2)), false);
  test.strictEqual(calls, 4);
});

tape("every(values, test) does not skip sparse elements", (test) => {
  // eslint-disable-next-line no-sparse-arrays
  test.deepEqual(d3.every([, 1, 2,,], x => x === undefined || x >=1), true);
  // eslint-disable-next-line no-sparse-arrays
  test.deepEqual(d3.every([, 1, 2,,], x => x >=1), false);
});

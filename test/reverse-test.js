const tape = require("tape-await");
const d3 = require("../");

tape("reverse(values) returns a reversed copy", (test) => {
  const input = [1, 3, 2, 5, 4];
  test.deepEqual(d3.reverse(input), [4, 5, 2, 3, 1]);
  test.deepEqual(input, [1, 3, 2, 5, 4]); // does not mutate
});

tape("reverse(values) returns an array", (test) => {
  test.strictEqual(Array.isArray(d3.reverse(Uint8Array.of(1, 2))), true);
});

tape("reverse(values) accepts an iterable", (test) => {
  test.deepEqual(d3.reverse(new Set([1, 2, 3, 2, 1])), [3, 2, 1]);
  test.deepEqual(d3.reverse((function*() { yield* [1, 3, 2, 5, 4]; })()), [4, 5, 2, 3, 1]);
  test.deepEqual(d3.reverse(Uint8Array.of(1, 3, 2, 5, 4)), [4, 5, 2, 3, 1]);
});

tape("reverse(values) enforces that values is iterable", (test) => {
  test.throws(() => d3.reverse({}), TypeError);
});

tape("reverse(values) does not skip sparse elements", (test) => {
  // eslint-disable-next-line no-sparse-arrays
  test.deepEqual(d3.reverse([, 1, 2,,]), [undefined, 2, 1, undefined]);
});

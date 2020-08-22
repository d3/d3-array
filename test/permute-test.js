const tape = require("tape-await");
const d3 = require("../");

tape("permute(…) permutes according to the specified index", (test) => {
  test.deepEqual(d3.permute([3, 4, 5], [2, 1, 0]), [5, 4, 3]);
  test.deepEqual(d3.permute([3, 4, 5], [2, 0, 1]), [5, 3, 4]);
  test.deepEqual(d3.permute([3, 4, 5], [0, 1, 2]), [3, 4, 5]);
});

tape("permute(…) does not modify the input array", (test) => {
  const input = [3, 4, 5];
  d3.permute(input, [2, 1, 0]);
  test.deepEqual(input, [3, 4, 5]);
});

tape("permute(…) can duplicate input values", (test) => {
  test.deepEqual(d3.permute([3, 4, 5], [0, 1, 0]), [3, 4, 3]);
  test.deepEqual(d3.permute([3, 4, 5], [2, 2, 2]), [5, 5, 5]);
  test.deepEqual(d3.permute([3, 4, 5], [0, 1, 1]), [3, 4, 4]);
});

tape("permute(…) can return more elements", (test) => {
  test.deepEqual(d3.permute([3, 4, 5], [0, 0, 1, 2]), [3, 3, 4, 5]);
  test.deepEqual(d3.permute([3, 4, 5], [0, 1, 1, 1]), [3, 4, 4, 4]);
});

tape("permute(…) can return fewer elements", (test) => {
  test.deepEqual(d3.permute([3, 4, 5], [0]), [3]);
  test.deepEqual(d3.permute([3, 4, 5], [1, 2]), [4, 5]);
  test.deepEqual(d3.permute([3, 4, 5], []), []);
});

tape("permute(…) can return undefined elements", (test) => {
  test.deepEqual(d3.permute([3, 4, 5], [10]), [undefined]);
  test.deepEqual(d3.permute([3, 4, 5], [-1]), [undefined]);
  test.deepEqual(d3.permute([3, 4, 5], [0, -1]), [3, undefined]);
});

tape("permute(…) can take an object as the source", (test) => {
  test.deepEqual(d3.permute({foo: 1, bar: 2}, ["bar", "foo"]), [2, 1]);
});

tape("permute(…) can take a typed array as the source", (test) => {
  test.deepEqual(d3.permute(Float32Array.of(1, 2), [0, 0, 1, 0]), [1, 1, 2, 1]);
  test.equal(Array.isArray(d3.permute(Float32Array.of(1, 2), [0])), true);
});

tape("permute(…) can take an iterable as the keys", (test) => {
  test.deepEqual(d3.permute({foo: 1, bar: 2}, new Set(["bar", "foo"])), [2, 1]);
});

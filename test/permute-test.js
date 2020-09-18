const tape = require("tape-await");
const d3 = require("../");

//#region Based on https://github.com/google/guava/blob/f4b3f611c4e49ecaded58dcb49262f55e56a3322/guava-tests/test/com/google/common/collect/Collections2Test.java

tape("permute(…) permutes zero values", (test) => {
  test.deepEqual(Array.from(d3.permute([])), [[]]);
});

tape("permute(…) permutes one value", (test) => {
  test.deepEqual(Array.from(d3.permute([1])), [[1]]);
});

tape("permute(…) permutes two values", (test) => {
  test.deepEqual(Array.from(d3.permute([1, 2])), [
    [1, 2],
    [2, 1],
  ]);
});

tape("permute(…) permutes three values", (test) => {
  test.deepEqual(Array.from(d3.permute([1, 2, 3])), [
    [1, 2, 3],
    [1, 3, 2],
    [3, 1, 2],

    [3, 2, 1],
    [2, 3, 1],
    [2, 1, 3],
  ]);
});

tape("permute(…) permutes three values out of order", (test) => {
  test.deepEqual(Array.from(d3.permute([3, 2, 1])), [
    [3, 2, 1],
    [3, 1, 2],
    [1, 3, 2],

    [1, 2, 3],
    [2, 1, 3],
    [2, 3, 1],
  ]);
});

tape("permute(…) permutes three repeated values", (test) => {
  test.deepEqual(Array.from(d3.permute([1, 1, 2])), [
    [1, 1, 2],
    [1, 2, 1],
    [2, 1, 1],

    [2, 1, 1],
    [1, 2, 1],
    [1, 1, 2],
  ]);
});

tape("permute(…) permutes values", (test) => {
  test.deepEqual(Array.from(d3.permute([1, 2, 3, 4])), [
    [1, 2, 3, 4],
    [1, 2, 4, 3],
    [1, 4, 2, 3],
    [4, 1, 2, 3],

    [4, 1, 3, 2],
    [1, 4, 3, 2],
    [1, 3, 4, 2],
    [1, 3, 2, 4],

    [3, 1, 2, 4],
    [3, 1, 4, 2],
    [3, 4, 1, 2],
    [4, 3, 1, 2],

    [4, 3, 2, 1],
    [3, 4, 2, 1],
    [3, 2, 4, 1],
    [3, 2, 1, 4],

    [2, 3, 1, 4],
    [2, 3, 4, 1],
    [2, 4, 3, 1],
    [4, 2, 3, 1],

    [4, 2, 1, 3],
    [2, 4, 1, 3],
    [2, 1, 4, 3],
    [2, 1, 3, 4],
  ]);
});

tape("permute(…) permutes count of permutations", (test) => {
  test.equal(count(d3.permute([])), 1);
  test.equal(count(d3.permute([1])), 1);
  test.equal(count(d3.permute([1, 2])), 2);
  test.equal(count(d3.permute([1, 2, 3])), 6);
  test.equal(count(d3.permute([1, 2, 3, 4, 5, 6, 7])), 5040);
  test.equal(count(d3.permute([1, 2, 3, 4, 5, 6, 7, 8])), 40320);
});

//#endregion

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

function count(values) {
  let count = 0;
  // eslint-disable-next-line no-unused-vars
  for (const _value of values) {
    count++;
  }
  return count;
}

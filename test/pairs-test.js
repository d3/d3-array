const tape = require("tape-await");
const d3 = require("../");

tape("pairs(array) returns the empty array if input array has fewer than two elements", (test) => {
  test.deepEqual(d3.pairs([]), []);
  test.deepEqual(d3.pairs([1]), []);
});

tape("pairs(array) returns pairs of adjacent elements in the given array", (test) => {
  const a = {}, b = {}, c = {}, d = {};
  test.deepEqual(d3.pairs([1, 2]), [[1, 2]]);
  test.deepEqual(d3.pairs([1, 2, 3]), [[1, 2], [2, 3]]);
  test.deepEqual(d3.pairs([a, b, c, d]), [[a, b], [b, c], [c, d]]);
});

tape("pairs(array, f) invokes the function f for each pair of adjacent elements", (test) => {
  test.deepEqual(d3.pairs([1, 3, 7], (a, b) => b - a), [2, 4]);
});

tape("pairs(array) includes null or undefined elements in pairs", (test) => {
  test.deepEqual(d3.pairs([1, null, 2]), [[1, null], [null, 2]]);
  test.deepEqual(d3.pairs([1, 2, undefined]), [[1, 2], [2, undefined]]);
});

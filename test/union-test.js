const tape = require("tape-await");
const d3 = require("../");

require("./setEqual");

tape("union(values) returns a set of values", (test) => {
  test.setEqual(d3.union([1, 2, 3, 2, 1]), new Set([1, 2, 3]));
});

tape("union(values, other) returns a set of values", (test) => {
  test.setEqual(d3.union([1, 2], [2, 3, 1]), new Set([1, 2, 3]));
});

tape("union(...values) returns a set of values", (test) => {
  test.setEqual(d3.union([1], [2], [2, 3], [1]), new Set([1, 2, 3]));
});

tape("union(...values) accepts iterables", (test) => {
  test.setEqual(d3.union(new Set([1, 2, 3])), new Set([1, 2, 3]));
  test.setEqual(d3.union(Uint8Array.of(1, 2, 3)), new Set([1, 2, 3]));
});

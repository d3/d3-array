const tape = require("tape-await");
const d3 = require("../");

require("./setEqual");

tape("difference(values, other) returns a set of values", (test) => {
  test.setEqual(d3.difference([1, 2, 3], [2, 1]), new Set([3]));
  test.setEqual(d3.difference([1, 2], [2, 3, 1]), new Set([]));
  test.setEqual(d3.difference([2, 1, 3], [4, 3, 1]), new Set([2]));
});

tape("difference(...values) accepts iterables", (test) => {
  test.setEqual(d3.difference(new Set([1, 2, 3]), new Set([1])), new Set([2, 3]));
});

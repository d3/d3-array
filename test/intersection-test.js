const tape = require("tape-await");
const d3 = require("../");

require("./setEqual");

tape("intersection(values) returns a set of values", (test) => {
  test.setEqual(d3.intersection([1, 2, 3, 2, 1]), new Set([1, 2, 3]));
});

tape("intersection(values, other) returns a set of values", (test) => {
  test.setEqual(d3.intersection([1, 2], [2, 3, 1]), new Set([1, 2]));
  test.setEqual(d3.intersection([2, 1, 3], [4, 3, 1]), new Set([1, 3]));
});

tape("intersection(...values) returns a set of values", (test) => {
  test.setEqual(d3.intersection([1, 2], [2, 1], [2, 3]), new Set([2]));
});

tape("intersection(...values) accepts iterables", (test) => {
  test.setEqual(d3.intersection(new Set([1, 2, 3])), new Set([1, 2, 3]));
});

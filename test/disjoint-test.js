const tape = require("tape-await");
const d3 = require("../");

tape("disjoint(values, other) returns true if sets are disjoint", (test) => {
  test.equal(d3.disjoint([1], [2]), true);
  test.equal(d3.disjoint([2, 3], [3, 4]), false);
  test.equal(d3.disjoint([1], []), true);
});

const tape = require("tape-await");
const d3 = require("../");

tape("subset(values, other) returns true if values is a subset of others", (test) => {
  test.equal(d3.subset([2], [1, 2]), true);
  test.equal(d3.subset([3, 4], [2, 3]), false);
  test.equal(d3.subset([], [1]), true);
});

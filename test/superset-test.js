const tape = require("tape-await");
const d3 = require("../");

tape("superset(values, other) returns true if values is a superset of others", (test) => {
  test.equal(d3.superset([1, 2], [2]), true);
  test.equal(d3.superset([2, 3], [3, 4]), false);
  test.equal(d3.superset([1], []), true);
});

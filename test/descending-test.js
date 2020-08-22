const tape = require("tape-await");
const d3 = require("../");

require("./isNaN");

tape("descending(a, b) returns a positive number if a < b", (test) => {
  test.ok(d3.descending(0, 1) > 0);
  test.ok(d3.descending("a", "b") > 0);
});

tape("descending(a, b) returns a negative number if a > b", (test) => {
  test.ok(d3.descending(1, 0) < 0);
  test.ok(d3.descending("b", "a") < 0);
});

tape("descending(a, b) returns zero if a >= b and a <= b", (test) => {
  test.equal(d3.descending(0, 0), 0);
  test.equal(d3.descending("a", "a"), 0);
  test.equal(d3.descending("0", 0), 0);
  test.equal(d3.descending(0, "0"), 0);
});

tape("descending(a, b) returns NaN if a and b are not comparable", (test) => {
  test.isNaN(d3.descending(0, undefined));
  test.isNaN(d3.descending(undefined, 0));
  test.isNaN(d3.descending(undefined, undefined));
  test.isNaN(d3.descending(0, NaN));
  test.isNaN(d3.descending(NaN, 0));
  test.isNaN(d3.descending(NaN, NaN));
});

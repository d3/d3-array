const tape = require("tape-await");
const d3 = require("../");

require("./isNaN");

tape("ascending(a, b) returns a negative number if a < b", (test) => {
  test.ok(d3.ascending(0, 1) < 0);
  test.ok(d3.ascending("a", "b") < 0);
});

tape("ascending(a, b) returns a positive number if a > b", (test) => {
  test.ok(d3.ascending(1, 0) > 0);
  test.ok(d3.ascending("b", "a") > 0);
});

tape("ascending(a, b) returns zero if a >= b and a <= b", (test) => {
  test.equal(d3.ascending(0, 0), 0);
  test.equal(d3.ascending("a", "a"), 0);
  test.equal(d3.ascending("0", 0), 0);
  test.equal(d3.ascending(0, "0"), 0);
});

tape("ascending(a, b) returns NaN if a and b are not comparable", (test) => {
  test.isNaN(d3.ascending(0, undefined));
  test.isNaN(d3.ascending(undefined, 0));
  test.isNaN(d3.ascending(undefined, undefined));
  test.isNaN(d3.ascending(0, NaN));
  test.isNaN(d3.ascending(NaN, 0));
  test.isNaN(d3.ascending(NaN, NaN));
});

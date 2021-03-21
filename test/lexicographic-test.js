const tape = require("tape-await");
const d3 = require("../");

require("./isNaN");

tape("lexicographic([a], [b]) returns a negative number if a < b", (test) => {
  test.ok(d3.lexicographic([0], [1]) < 0);
  test.ok(d3.lexicographic(["a"], ["b"]) < 0);
});

tape("lexicographic([a], [b]) returns a positive number if a > b", (test) => {
  test.ok(d3.ascending([1], [0]) > 0);
  test.ok(d3.ascending(["b"], ["a"]) > 0);
});

tape("lexicographic([a], [b]) returns 0 if a >= b and a <= b", (test) => {
  test.equal(d3.lexicographic([0], [0]), 0);
  test.equal(d3.lexicographic(["a"], ["a"]), 0);
  test.equal(d3.lexicographic(["0"], [0]), 0);
  test.equal(d3.lexicographic([0], ["0"]), 0);
});

tape("lexicographic([a0, a1], [b0, b1]) returns lexicographic([a1], [b1]) if a0 >= b0 and a0 <= b0", (test) => {
  test.equal(d3.lexicographic([0, 1], [0, 1]), 0);
  test.equal(d3.lexicographic([0, 0], [0, 1]), -1);
  test.equal(d3.lexicographic([0, 0], [0, -1]), 1);
  test.equal(d3.lexicographic([0, 0], [0, 0]), 0);
  test.equal(d3.lexicographic([0, 0, 0], [0, 0, 1]), -1);
  test.equal(d3.lexicographic([0, 0, 0], [0, 0, -1]), 1);
  test.equal(d3.lexicographic([0, 0, "a"], [0, 0, "b"]), -1);
  test.equal(d3.lexicographic([0, "a", 0], [0, "b", 0]), -1);
  test.equal(d3.lexicographic(["a", 0, 0], ["b", 0, -1]), -1);
});

tape("lexicographic(a, b) returns NaN if tested elements of a and b are not comparable", (test) => {
  test.isNaN(d3.lexicographic([0, 0], [undefined, 0]));
  test.isNaN(d3.lexicographic([undefined, 0], [0, 0]));
  test.isNaN(d3.lexicographic([undefined, 0], [undefined, 0]));
  test.isNaN(d3.lexicographic([0, 0], [NaN, 0]));
  test.isNaN(d3.lexicographic([NaN, 0], [0, 0]));
  test.isNaN(d3.lexicographic([NaN, 0], [NaN, 0]));
});

tape("lexicographic(a, b) ignores non-tested non-comparable elements", (test) => {
  test.isNaN(d3.lexicographic([0, 0], [0, undefined]));
  test.equal(d3.lexicographic([0, 0], [1, undefined]), -1);
});

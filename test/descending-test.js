import assert from "assert";
import * as d3 from "../src/index.js";

it("descending(a, b) returns a positive number if a < b", () => {
  assert(d3.descending(0, 1) > 0);
  assert(d3.descending("a", "b") > 0);
});

it("descending(a, b) returns a negative number if a > b", () => {
  assert(d3.descending(1, 0) < 0);
  assert(d3.descending("b", "a") < 0);
});

it("descending(a, b) returns zero if a >= b and a <= b", () => {
  assert.equal(d3.descending(0, 0), 0);
  assert.equal(d3.descending("a", "a"), 0);
  assert.equal(d3.descending("0", 0), 0);
  assert.equal(d3.descending(0, "0"), 0);
});

it("descending(a, b) returns NaN if a and b are not comparable", () => {
  assert(isNaN(d3.descending(0, undefined)));
  assert(isNaN(d3.descending(undefined, 0)));
  assert(isNaN(d3.descending(undefined, undefined)));
  assert(isNaN(d3.descending(0, NaN)));
  assert(isNaN(d3.descending(NaN, 0)));
  assert(isNaN(d3.descending(NaN, NaN)));
});

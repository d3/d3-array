import assert from "assert";
import * as d3 from "../src/index.js";

it("ascending(a, b) returns a negative number if a < b", () => {
  assert(d3.ascending(0, 1) < 0);
  assert(d3.ascending("a", "b") < 0);
});

it("ascending(a, b) returns a positive number if a > b", () => {
  assert(d3.ascending(1, 0) > 0);
  assert(d3.ascending("b", "a") > 0);
});

it("ascending(a, b) returns zero if a >= b and a <= b", () => {
  assert.equal(d3.ascending(0, 0), 0);
  assert.equal(d3.ascending("a", "a"), 0);
  assert.equal(d3.ascending("0", 0), 0);
  assert.equal(d3.ascending(0, "0"), 0);
});

it("ascending(a, b) returns NaN if a and b are not comparable", () => {
  assert(isNaN(d3.ascending(0, undefined)));
  assert(isNaN(d3.ascending(undefined, 0)));
  assert(isNaN(d3.ascending(undefined, undefined)));
  assert(isNaN(d3.ascending(0, NaN)));
  assert(isNaN(d3.ascending(NaN, 0)));
  assert(isNaN(d3.ascending(NaN, NaN)));
});

import assert from "assert";
import * as d3 from "../src/index.js";
import setEqual from "./setEqual.js";

it("difference(values, other) returns a set of values", () => {
  assert(setEqual(d3.difference([1, 2, 3], [2, 1]), new Set([3])));
  assert(setEqual(d3.difference([1, 2], [2, 3, 1]), new Set([])));
  assert(setEqual(d3.difference([2, 1, 3], [4, 3, 1]), new Set([2])));
});

it("difference(...values) accepts iterables", () => {
  assert(setEqual(d3.difference(new Set([1, 2, 3]), new Set([1])), new Set([2, 3])));
});

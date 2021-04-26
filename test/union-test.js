import assert from "assert";
import * as d3 from "../src/index.js";

import setEqual from "./setEqual.js";

it("union(values) returns a set of values", () => {
  assert(setEqual(d3.union([1, 2, 3, 2, 1]), new Set([1, 2, 3])));
});

it("union(values, other) returns a set of values", () => {
  assert(setEqual(d3.union([1, 2], [2, 3, 1]), new Set([1, 2, 3])));
});

it("union(...values) returns a set of values", () => {
  assert(setEqual(d3.union([1], [2], [2, 3], [1]), new Set([1, 2, 3])));
});

it("union(...values) accepts iterables", () => {
  assert(setEqual(d3.union(new Set([1, 2, 3])), new Set([1, 2, 3])));
  assert(setEqual(d3.union(Uint8Array.of(1, 2, 3)), new Set([1, 2, 3])));
});

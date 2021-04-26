import * as d3 from "../src/index.js";
import {assertSetEqual} from "./asserts.js";

it("intersection(values) returns a set of values", () => {
  assertSetEqual(d3.intersection([1, 2, 3, 2, 1]), new Set([1, 2, 3]));
});

it("intersection(values, other) returns a set of values", () => {
  assertSetEqual(d3.intersection([1, 2], [2, 3, 1]), new Set([1, 2]));
  assertSetEqual(d3.intersection([2, 1, 3], [4, 3, 1]), new Set([1, 3]));
});

it("intersection(...values) returns a set of values", () => {
  assertSetEqual(d3.intersection([1, 2], [2, 1], [2, 3]), new Set([2]));
});

it("intersection(...values) accepts iterables", () => {
  assertSetEqual(d3.intersection(new Set([1, 2, 3])), new Set([1, 2, 3]));
});

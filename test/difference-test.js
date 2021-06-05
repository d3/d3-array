import {difference} from "../src/index.js";
import {assertSetEqual} from "./asserts.js";

it("difference(values, other) returns a set of values", () => {
  assertSetEqual(difference([1, 2, 3], [2, 1]), new Set([3]));
  assertSetEqual(difference([1, 2], [2, 3, 1]), new Set([]));
  assertSetEqual(difference([2, 1, 3], [4, 3, 1]), new Set([2]));
});

it("difference(...values) accepts iterables", () => {
  assertSetEqual(difference(new Set([1, 2, 3]), new Set([1])), new Set([2, 3]));
});

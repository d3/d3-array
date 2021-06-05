import {union} from "../src/index.js";
import {assertSetEqual} from "./asserts.js";

it("union(values) returns a set of values", () => {
  assertSetEqual(union([1, 2, 3, 2, 1]), new Set([1, 2, 3]));
});

it("union(values, other) returns a set of values", () => {
  assertSetEqual(union([1, 2], [2, 3, 1]), new Set([1, 2, 3]));
});

it("union(...values) returns a set of values", () => {
  assertSetEqual(union([1], [2], [2, 3], [1]), new Set([1, 2, 3]));
});

it("union(...values) accepts iterables", () => {
  assertSetEqual(union(new Set([1, 2, 3])), new Set([1, 2, 3]));
  assertSetEqual(union(Uint8Array.of(1, 2, 3)), new Set([1, 2, 3]));
});

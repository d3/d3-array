import assert from "assert";
import rank from "../src/rank.js";

it("rank(numbers) returns the rank of numbers", () => {
  assert.deepStrictEqual(rank([1000, 10, 0]), Float64Array.of(2, 1, 0));
  assert.deepStrictEqual(rank([1.2, 1.1, 1.2, 1.0, 1.5, 1.2]), Float64Array.of(2, 1, 2, 0, 5, 2));
});

it("rank(strings) returns the rank of letters", () => {
  assert.deepStrictEqual(rank([..."EDGFCBA"]), Float64Array.of(4, 3, 6, 5, 2, 1, 0));
});

it("rank(dates) returns the rank of Dates", () => {
  assert.deepStrictEqual(rank([new Date(2000, 0, 1), new Date(2000, 0, 1), new Date(1999, 0, 1), new Date(2001, 0, 1)]), Float64Array.of(1, 1, 0, 3));
});

it("rank(iterator) accepts an iterator", () => {
  assert.deepStrictEqual(rank(new Set(["B", "C", "A"])), Float64Array.of(1, 2, 0));
  assert.deepStrictEqual(rank({length: 3}, (_, i) => i), Float64Array.of(0, 1, 2));
});

it("rank(undefineds) ranks undefined as NaN", () => {
  assert.deepStrictEqual(rank([1.2, 1.1, undefined, 1.0, undefined, 1.5]), Float64Array.of(2, 1, NaN, 0, NaN, 3));
  assert.deepStrictEqual(rank([, null, , 1.2, 1.1, undefined, 1.0, NaN, 1.5]), Float64Array.of(NaN, NaN, NaN, 2, 1, NaN, 0, NaN, 3));
});

it("rank(values, valueof) accepts an accessor", () => {
  assert.deepStrictEqual(rank([{x: 3}, {x: 1}, {x: 2}, {x: 4}, {}], d => d.x), Float64Array.of(2, 0, 1, 3, NaN));
});

it("rank(values, ties) computes the ties as expected", () => {
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "c"]), Float64Array.of(0, 1, 1, 1, 4));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "b", "c"]), Float64Array.of(0, 1, 1, 1, 1, 5));
});

it("rank(values, ties) handles NaNs as expected", () => {
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "c", null]), Float64Array.of(0, 1, 1, 1, 4, NaN));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "b", "c", null]), Float64Array.of(0, 1, 1, 1, 1, 5, NaN));
});

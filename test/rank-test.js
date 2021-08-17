import assert from "assert";
import rank from "../src/rank.js";

it("rank(numbers) returns the rank of numbers", () => {
  assert.deepStrictEqual(rank([1000, 10, 0]), new Float64Array([2, 1, 0]));
  assert.deepStrictEqual(rank([1.2, 1.1, 1.2, 1.0, 1.5, 1.2]), new Float64Array([2, 1, 2, 0, 5, 2]));
});

it("rank(strings) returns the rank of letters", () => {
  assert.deepStrictEqual(rank([..."EDGFCBA"]), new Float64Array([4, 3, 6, 5, 2, 1, 0]));
});

it("rank(dates) returns the rank of Dates", () => {
  assert.deepStrictEqual(rank([new Date(2000, 0, 1), new Date(2000, 0, 1), new Date(1999, 0, 1), new Date(2001, 0, 1)]), new Float64Array([1, 1, 0, 3]));
});

it("rank(iterator) accepts an iterator", () => {
  assert.deepStrictEqual(rank(new Set(["B", "C", "A"])), new Float64Array([1, 2, 0]));
  assert.deepStrictEqual(rank(new Set(["B", "C", "A"]), "high"), new Float64Array([1, 2, 0]));
  assert.deepStrictEqual(rank({length: 3}, (_, i) => i), new Float64Array([0, 1, 2]));
});

it("rank(undefineds) ranks undefined as NaN", () => {
  assert.deepStrictEqual(rank([1.2, 1.1, undefined, 1.0, undefined, 1.5]), new Float64Array([2, 1, NaN, 0, NaN, 3]));
  assert.deepStrictEqual(rank([, null, , 1.2, 1.1, undefined, 1.0, NaN, 1.5]), new Float64Array([NaN, NaN, NaN, 2, 1, NaN, 0, NaN, 3]));
});

it("rank(values, valueof) accepts an accessor", () => {
  assert.deepStrictEqual(rank([{x: 3}, {x: 1}, {x: 2}, {x: 4}, {}], d => d.x), new Float64Array([2, 0, 1, 3, NaN]));
});

it("rank(values, ties) computes the ties as expected", () => {
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "c"], "low"), new Float64Array([0, 1, 1, 1, 4]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "c"], "mean"), new Float64Array([0, 2, 2, 2, 4]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "c"], "round"), new Float64Array([0, 2, 2, 2, 4]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "c"], "high"), new Float64Array([0, 3, 3, 3, 4]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "c"], "order"), new Float64Array([0, 1, 2, 3, 4]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "b", "c"], "low"), new Float64Array([0, 1, 1, 1, 1, 5]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "b", "c"], "mean"), new Float64Array([0, 2.5, 2.5, 2.5, 2.5, 5]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "b", "c"], "round"), new Float64Array([0, 2, 2, 2, 2, 5]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "b", "c"], "high"), new Float64Array([0, 4, 4, 4, 4, 5]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "b", "c"], "order"), new Float64Array([0, 1, 2, 3, 4, 5]));
});

it("rank(values, ties) handles NaNs as expected", () => {
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "c", null], "low"), new Float64Array([0, 1, 1, 1, 4, NaN]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "c", null], "mean"), new Float64Array([0, 2, 2, 2, 4, NaN]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "c", null], "round"), new Float64Array([0, 2, 2, 2, 4, NaN]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "c", null], "high"), new Float64Array([0, 3, 3, 3, 4, NaN]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "c", null], "order"), new Float64Array([0, 1, 2, 3, 4, NaN]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "b", "c", null], "low"), new Float64Array([0, 1, 1, 1, 1, 5, NaN]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "b", "c", null], "mean"), new Float64Array([0, 2.5, 2.5, 2.5, 2.5, 5, NaN]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "b", "c", null], "round"), new Float64Array([0, 2, 2, 2, 2, 5, NaN]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "b", "c", null], "high"), new Float64Array([0, 4, 4, 4, 4, 5, NaN]));
  assert.deepStrictEqual(rank(["a", "b", "b", "b", "b", "c", null], "order"), new Float64Array([0, 1, 2, 3, 4, 5, NaN]));
});

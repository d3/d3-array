import assert from "assert";
import * as d3 from "../src/index.js";

it("max(array) returns the greatest numeric value for numbers", () => {
  assert.deepStrictEqual(d3.max([1]), 1);
  assert.deepStrictEqual(d3.max([5, 1, 2, 3, 4]), 5);
  assert.deepStrictEqual(d3.max([20, 3]), 20);
  assert.deepStrictEqual(d3.max([3, 20]), 20);
});

it("max(array) returns the greatest lexicographic value for strings", () => {
  assert.deepStrictEqual(d3.max(["c", "a", "b"]), "c");
  assert.deepStrictEqual(d3.max(["20", "3"]), "3");
  assert.deepStrictEqual(d3.max(["3", "20"]), "3");
});

it("max(array) ignores null, undefined and NaN", () => {
  const o = {valueOf: () => NaN};
  assert.deepStrictEqual(d3.max([NaN, 1, 2, 3, 4, 5]), 5);
  assert.deepStrictEqual(d3.max([o, 1, 2, 3, 4, 5]), 5);
  assert.deepStrictEqual(d3.max([1, 2, 3, 4, 5, NaN]), 5);
  assert.deepStrictEqual(d3.max([1, 2, 3, 4, 5, o]), 5);
  assert.deepStrictEqual(d3.max([10, null, 3, undefined, 5, NaN]), 10);
  assert.deepStrictEqual(d3.max([-1, null, -3, undefined, -5, NaN]), -1);
});

it("max(array) compares heterogenous types as numbers", () => {
  assert.strictEqual(d3.max([20, "3"]), 20);
  assert.strictEqual(d3.max(["20", 3]), "20");
  assert.strictEqual(d3.max([3, "20"]), "20");
  assert.strictEqual(d3.max(["3", 20]), 20);
});

it("max(array) returns undefined if the array contains no numbers", () => {
  assert.strictEqual(d3.max([]), undefined);
  assert.strictEqual(d3.max([null]), undefined);
  assert.strictEqual(d3.max([undefined]), undefined);
  assert.strictEqual(d3.max([NaN]), undefined);
  assert.strictEqual(d3.max([NaN, NaN]), undefined);
});

it("max(array, f) returns the greatest numeric value for numbers", () => {
  assert.deepStrictEqual(d3.max([1].map(box), unbox), 1);
  assert.deepStrictEqual(d3.max([5, 1, 2, 3, 4].map(box), unbox), 5);
  assert.deepStrictEqual(d3.max([20, 3].map(box), unbox), 20);
  assert.deepStrictEqual(d3.max([3, 20].map(box), unbox), 20);
});

it("max(array, f) returns the greatest lexicographic value for strings", () => {
  assert.deepStrictEqual(d3.max(["c", "a", "b"].map(box), unbox), "c");
  assert.deepStrictEqual(d3.max(["20", "3"].map(box), unbox), "3");
  assert.deepStrictEqual(d3.max(["3", "20"].map(box), unbox), "3");
});

it("max(array, f) ignores null, undefined and NaN", () => {
  const o = {valueOf: () => NaN};
  assert.deepStrictEqual(d3.max([NaN, 1, 2, 3, 4, 5].map(box), unbox), 5);
  assert.deepStrictEqual(d3.max([o, 1, 2, 3, 4, 5].map(box), unbox), 5);
  assert.deepStrictEqual(d3.max([1, 2, 3, 4, 5, NaN].map(box), unbox), 5);
  assert.deepStrictEqual(d3.max([1, 2, 3, 4, 5, o].map(box), unbox), 5);
  assert.deepStrictEqual(d3.max([10, null, 3, undefined, 5, NaN].map(box), unbox), 10);
  assert.deepStrictEqual(d3.max([-1, null, -3, undefined, -5, NaN].map(box), unbox), -1);
});

it("max(array, f) compares heterogenous types as numbers", () => {
  assert.strictEqual(d3.max([20, "3"].map(box), unbox), 20);
  assert.strictEqual(d3.max(["20", 3].map(box), unbox), "20");
  assert.strictEqual(d3.max([3, "20"].map(box), unbox), "20");
  assert.strictEqual(d3.max(["3", 20].map(box), unbox), 20);
});

it("max(array, f) returns undefined if the array contains no observed values", () => {
  assert.strictEqual(d3.max([].map(box), unbox), undefined);
  assert.strictEqual(d3.max([null].map(box), unbox), undefined);
  assert.strictEqual(d3.max([undefined].map(box), unbox), undefined);
  assert.strictEqual(d3.max([NaN].map(box), unbox), undefined);
  assert.strictEqual(d3.max([NaN, NaN].map(box), unbox), undefined);
});

it("max(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.max(array, (d, i, array) => results.push([d, i, array]));
  assert.deepStrictEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

it("max(array, f) uses the global context", () => {
  const results = [];
  d3.max([1, 2], function() { results.push(this); });
  assert.deepStrictEqual(results, [undefined, undefined]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

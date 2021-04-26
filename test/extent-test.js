import assert from "assert";
import * as d3 from "../src/index.js";

it("extent(array) returns the least and greatest numeric values for numbers", () => {
  assert.deepStrictEqual(d3.extent([1]), [1, 1]);
  assert.deepStrictEqual(d3.extent([5, 1, 2, 3, 4]), [1, 5]);
  assert.deepStrictEqual(d3.extent([20, 3]), [3, 20]);
  assert.deepStrictEqual(d3.extent([3, 20]), [3, 20]);
});

it("extent(array) returns the least and greatest lexicographic value for strings", () => {
  assert.deepStrictEqual(d3.extent(["c", "a", "b"]), ["a", "c"]);
  assert.deepStrictEqual(d3.extent(["20", "3"]), ["20", "3"]);
  assert.deepStrictEqual(d3.extent(["3", "20"]), ["20", "3"]);
});

it("extent(array) ignores null, undefined and NaN", () => {
  const o = {valueOf: () => NaN};
  assert.deepStrictEqual(d3.extent([NaN, 1, 2, 3, 4, 5]), [1, 5]);
  assert.deepStrictEqual(d3.extent([o, 1, 2, 3, 4, 5]), [1, 5]);
  assert.deepStrictEqual(d3.extent([1, 2, 3, 4, 5, NaN]), [1, 5]);
  assert.deepStrictEqual(d3.extent([1, 2, 3, 4, 5, o]), [1, 5]);
  assert.deepStrictEqual(d3.extent([10, null, 3, undefined, 5, NaN]), [3, 10]);
  assert.deepStrictEqual(d3.extent([-1, null, -3, undefined, -5, NaN]), [-5, -1]);
});

it("extent(array) compares heterogenous types as numbers", () => {
  assert.deepStrictEqual(d3.extent([20, "3"]), ["3", 20]);
  assert.deepStrictEqual(d3.extent(["20", 3]), [3, "20"]);
  assert.deepStrictEqual(d3.extent([3, "20"]), [3, "20"]);
  assert.deepStrictEqual(d3.extent(["3", 20]), ["3", 20]);
});

it("extent(array) returns undefined if the array contains no numbers", () => {
  assert.deepStrictEqual(d3.extent([]), [undefined, undefined]);
  assert.deepStrictEqual(d3.extent([null]), [undefined, undefined]);
  assert.deepStrictEqual(d3.extent([undefined]), [undefined, undefined]);
  assert.deepStrictEqual(d3.extent([NaN]), [undefined, undefined]);
  assert.deepStrictEqual(d3.extent([NaN, NaN]), [undefined, undefined]);
});

it("extent(array, f) returns the least and greatest numeric value for numbers", () => {
  assert.deepStrictEqual(d3.extent([1].map(box), unbox), [1, 1]);
  assert.deepStrictEqual(d3.extent([5, 1, 2, 3, 4].map(box), unbox), [1, 5]);
  assert.deepStrictEqual(d3.extent([20, 3].map(box), unbox), [3, 20]);
  assert.deepStrictEqual(d3.extent([3, 20].map(box), unbox), [3, 20]);
});

it("extent(array, f) returns the least and greatest lexicographic value for strings", () => {
  assert.deepStrictEqual(d3.extent(["c", "a", "b"].map(box), unbox), ["a", "c"]);
  assert.deepStrictEqual(d3.extent(["20", "3"].map(box), unbox), ["20", "3"]);
  assert.deepStrictEqual(d3.extent(["3", "20"].map(box), unbox), ["20", "3"]);
});

it("extent(array, f) ignores null, undefined and NaN", () => {
  const o = {valueOf: () => NaN};
  assert.deepStrictEqual(d3.extent([NaN, 1, 2, 3, 4, 5].map(box), unbox), [1, 5]);
  assert.deepStrictEqual(d3.extent([o, 1, 2, 3, 4, 5].map(box), unbox), [1, 5]);
  assert.deepStrictEqual(d3.extent([1, 2, 3, 4, 5, NaN].map(box), unbox), [1, 5]);
  assert.deepStrictEqual(d3.extent([1, 2, 3, 4, 5, o].map(box), unbox), [1, 5]);
  assert.deepStrictEqual(d3.extent([10, null, 3, undefined, 5, NaN].map(box), unbox), [3, 10]);
  assert.deepStrictEqual(d3.extent([-1, null, -3, undefined, -5, NaN].map(box), unbox), [-5, -1]);
});

it("extent(array, f) compares heterogenous types as numbers", () => {
  assert.deepStrictEqual(d3.extent([20, "3"].map(box), unbox), ["3", 20]);
  assert.deepStrictEqual(d3.extent(["20", 3].map(box), unbox), [3, "20"]);
  assert.deepStrictEqual(d3.extent([3, "20"].map(box), unbox), [3, "20"]);
  assert.deepStrictEqual(d3.extent(["3", 20].map(box), unbox), ["3", 20]);
});

it("extent(array, f) returns undefined if the array contains no observed values", () => {
  assert.deepStrictEqual(d3.extent([].map(box), unbox), [undefined, undefined]);
  assert.deepStrictEqual(d3.extent([null].map(box), unbox), [undefined, undefined]);
  assert.deepStrictEqual(d3.extent([undefined].map(box), unbox), [undefined, undefined]);
  assert.deepStrictEqual(d3.extent([NaN].map(box), unbox), [undefined, undefined]);
  assert.deepStrictEqual(d3.extent([NaN, NaN].map(box), unbox), [undefined, undefined]);
});

it("extent(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.extent(array, (d, i, array) => results.push([d, i, array]));
  assert.deepStrictEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

it("extent(array, f) uses the global context", () => {
  const results = [];
  d3.extent([1, 2], function() { results.push(this); });
  assert.deepStrictEqual(results, [undefined, undefined]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

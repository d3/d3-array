import assert from "assert";
import * as d3 from "../src/index.js";

it("min(array) returns the least numeric value for numbers", () => {
  assert.deepEqual(d3.min([1]), 1);
  assert.deepEqual(d3.min([5, 1, 2, 3, 4]), 1);
  assert.deepEqual(d3.min([20, 3]), 3);
  assert.deepEqual(d3.min([3, 20]), 3);
});

it("min(array) returns the least lexicographic value for strings", () => {
  assert.deepEqual(d3.min(["c", "a", "b"]), "a");
  assert.deepEqual(d3.min(["20", "3"]), "20");
  assert.deepEqual(d3.min(["3", "20"]), "20");
});

it("min(array) ignores null, undefined and NaN", () => {
  const o = {valueOf: () => NaN};
  assert.deepEqual(d3.min([NaN, 1, 2, 3, 4, 5]), 1);
  assert.deepEqual(d3.min([o, 1, 2, 3, 4, 5]), 1);
  assert.deepEqual(d3.min([1, 2, 3, 4, 5, NaN]), 1);
  assert.deepEqual(d3.min([1, 2, 3, 4, 5, o]), 1);
  assert.deepEqual(d3.min([10, null, 3, undefined, 5, NaN]), 3);
  assert.deepEqual(d3.min([-1, null, -3, undefined, -5, NaN]), -5);
});

it("min(array) compares heterogenous types as numbers", () => {
  assert.equal(d3.min([20, "3"]), "3");
  assert.equal(d3.min(["20", 3]), 3);
  assert.equal(d3.min([3, "20"]), 3);
  assert.equal(d3.min(["3", 20]), "3");
});

it("min(array) returns undefined if the array contains no numbers", () => {
  assert.equal(d3.min([]), undefined);
  assert.equal(d3.min([null]), undefined);
  assert.equal(d3.min([undefined]), undefined);
  assert.equal(d3.min([NaN]), undefined);
  assert.equal(d3.min([NaN, NaN]), undefined);
});

it("min(array, f) returns the least numeric value for numbers", () => {
  assert.deepEqual(d3.min([1].map(box), unbox), 1);
  assert.deepEqual(d3.min([5, 1, 2, 3, 4].map(box), unbox), 1);
  assert.deepEqual(d3.min([20, 3].map(box), unbox), 3);
  assert.deepEqual(d3.min([3, 20].map(box), unbox), 3);
});

it("min(array, f) returns the least lexicographic value for strings", () => {
  assert.deepEqual(d3.min(["c", "a", "b"].map(box), unbox), "a");
  assert.deepEqual(d3.min(["20", "3"].map(box), unbox), "20");
  assert.deepEqual(d3.min(["3", "20"].map(box), unbox), "20");
});

it("min(array, f) ignores null, undefined and NaN", () => {
  const o = {valueOf: () => NaN};
  assert.deepEqual(d3.min([NaN, 1, 2, 3, 4, 5].map(box), unbox), 1);
  assert.deepEqual(d3.min([o, 1, 2, 3, 4, 5].map(box), unbox), 1);
  assert.deepEqual(d3.min([1, 2, 3, 4, 5, NaN].map(box), unbox), 1);
  assert.deepEqual(d3.min([1, 2, 3, 4, 5, o].map(box), unbox), 1);
  assert.deepEqual(d3.min([10, null, 3, undefined, 5, NaN].map(box), unbox), 3);
  assert.deepEqual(d3.min([-1, null, -3, undefined, -5, NaN].map(box), unbox), -5);
});

it("min(array, f) compares heterogenous types as numbers", () => {
  assert.equal(d3.min([20, "3"].map(box), unbox), "3");
  assert.equal(d3.min(["20", 3].map(box), unbox), 3);
  assert.equal(d3.min([3, "20"].map(box), unbox), 3);
  assert.equal(d3.min(["3", 20].map(box), unbox), "3");
});

it("min(array, f) returns undefined if the array contains no observed values", () => {
  assert.equal(d3.min([].map(box), unbox), undefined);
  assert.equal(d3.min([null].map(box), unbox), undefined);
  assert.equal(d3.min([undefined].map(box), unbox), undefined);
  assert.equal(d3.min([NaN].map(box), unbox), undefined);
  assert.equal(d3.min([NaN, NaN].map(box), unbox), undefined);
});

it("min(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.min(array, (d, i, array) => results.push([d, i, array]));
  assert.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

it.skip("min(array, f) uses the global context", () => {
  const results = [];
  d3.min([1, 2], function() { results.push(this); });
  assert.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

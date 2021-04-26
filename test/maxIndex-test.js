import assert from "assert";
import * as d3 from "../src/index.js";

it("maxIndex(array) returns the index of the greatest numeric value for numbers", () => {
  assert.deepEqual(d3.maxIndex([1]), 0);
  assert.deepEqual(d3.maxIndex([5, 1, 2, 3, 4]), 0);
  assert.deepEqual(d3.maxIndex([20, 3]), 0);
  assert.deepEqual(d3.maxIndex([3, 20]), 1);
});

it("maxIndex(array) returns the greatest lexicographic value for strings", () => {
  assert.deepEqual(d3.maxIndex(["c", "a", "b"]), 0);
  assert.deepEqual(d3.maxIndex(["20", "3"]), 1);
  assert.deepEqual(d3.maxIndex(["3", "20"]), 0);
});

it("maxIndex(array) ignores null, undefined and NaN", () => {
  const o = {valueOf: () => NaN};
  assert.deepEqual(d3.maxIndex([NaN, 1, 2, 3, 4, 5]), 5);
  assert.deepEqual(d3.maxIndex([o, 1, 2, 3, 4, 5]), 5);
  assert.deepEqual(d3.maxIndex([1, 2, 3, 4, 5, NaN]), 4);
  assert.deepEqual(d3.maxIndex([1, 2, 3, 4, 5, o]), 4);
  assert.deepEqual(d3.maxIndex([10, null, 3, undefined, 5, NaN]), 0);
  assert.deepEqual(d3.maxIndex([-1, null, -3, undefined, -5, NaN]), 0);
});

it("maxIndex(array) compares heterogenous types as numbers", () => {
  assert.equal(d3.maxIndex([20, "3"]), 0);
  assert.equal(d3.maxIndex(["20", 3]), 0);
  assert.equal(d3.maxIndex([3, "20"]), 1);
  assert.equal(d3.maxIndex(["3", 20]), 1);
});

it("maxIndex(array) returns -1 if the array contains no numbers", () => {
  assert.equal(d3.maxIndex([]), -1);
  assert.equal(d3.maxIndex([null]), -1);
  assert.equal(d3.maxIndex([undefined]), -1);
  assert.equal(d3.maxIndex([NaN]), -1);
  assert.equal(d3.maxIndex([NaN, NaN]), -1);
});

it("maxIndex(array, f) returns the greatest numeric value for numbers", () => {
  assert.deepEqual(d3.maxIndex([1].map(box), unbox), 0);
  assert.deepEqual(d3.maxIndex([5, 1, 2, 3, 4].map(box), unbox), 0);
  assert.deepEqual(d3.maxIndex([20, 3].map(box), unbox), 0);
  assert.deepEqual(d3.maxIndex([3, 20].map(box), unbox), 1);
});

it("maxIndex(array, f) returns the greatest lexicographic value for strings", () => {
  assert.deepEqual(d3.maxIndex(["c", "a", "b"].map(box), unbox), 0);
  assert.deepEqual(d3.maxIndex(["20", "3"].map(box), unbox), 1);
  assert.deepEqual(d3.maxIndex(["3", "20"].map(box), unbox), 0);
});

it("maxIndex(array, f) ignores null, undefined and NaN", () => {
  const o = {valueOf: () => NaN};
  assert.deepEqual(d3.maxIndex([NaN, 1, 2, 3, 4, 5].map(box), unbox), 5);
  assert.deepEqual(d3.maxIndex([o, 1, 2, 3, 4, 5].map(box), unbox), 5);
  assert.deepEqual(d3.maxIndex([1, 2, 3, 4, 5, NaN].map(box), unbox), 4);
  assert.deepEqual(d3.maxIndex([1, 2, 3, 4, 5, o].map(box), unbox), 4);
  assert.deepEqual(d3.maxIndex([10, null, 3, undefined, 5, NaN].map(box), unbox), 0);
  assert.deepEqual(d3.maxIndex([-1, null, -3, undefined, -5, NaN].map(box), unbox), 0);
});

it("maxIndex(array, f) compares heterogenous types as numbers", () => {
  assert.equal(d3.maxIndex([20, "3"].map(box), unbox), 0);
  assert.equal(d3.maxIndex(["20", 3].map(box), unbox), 0);
  assert.equal(d3.maxIndex([3, "20"].map(box), unbox), 1);
  assert.equal(d3.maxIndex(["3", 20].map(box), unbox), 1);
});

it("maxIndex(array, f) returns -1 if the array contains no observed values", () => {
  assert.equal(d3.maxIndex([].map(box), unbox), -1);
  assert.equal(d3.maxIndex([null].map(box), unbox), -1);
  assert.equal(d3.maxIndex([undefined].map(box), unbox), -1);
  assert.equal(d3.maxIndex([NaN].map(box), unbox), -1);
  assert.equal(d3.maxIndex([NaN, NaN].map(box), unbox), -1);
});

it("maxIndex(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.maxIndex(array, (d, i, array) => results.push([d, i, array]));
  assert.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

it.skip("maxIndex(array, f) uses the global context", () => {
  const results = [];
  d3.maxIndex([1, 2], function() { results.push(this); });
  assert.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

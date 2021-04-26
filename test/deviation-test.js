import assert from "assert";
import * as d3 from "../src/index.js";

it("deviation(array) returns the standard deviation of the specified numbers", () => {
  assert.equal(d3.deviation([5, 1, 2, 3, 4]), Math.sqrt(2.5));
  assert.equal(d3.deviation([20, 3]), Math.sqrt(144.5));
  assert.equal(d3.deviation([3, 20]), Math.sqrt(144.5));
});

it("deviation(array) ignores null, undefined and NaN", () => {
  assert.equal(d3.deviation([NaN, 1, 2, 3, 4, 5]), Math.sqrt(2.5));
  assert.equal(d3.deviation([1, 2, 3, 4, 5, NaN]), Math.sqrt(2.5));
  assert.equal(d3.deviation([10, null, 3, undefined, 5, NaN]), Math.sqrt(13));
});

it("deviation(array) can handle large numbers without overflowing", () => {
  assert.equal(d3.deviation([Number.MAX_VALUE, Number.MAX_VALUE]), 0);
  assert.equal(d3.deviation([-Number.MAX_VALUE, -Number.MAX_VALUE]), 0);
});

it("deviation(array) returns undefined if the array has fewer than two numbers", () => {
  assert.equal(d3.deviation([1]), undefined);
  assert.equal(d3.deviation([]), undefined);
  assert.equal(d3.deviation([null]), undefined);
  assert.equal(d3.deviation([undefined]), undefined);
  assert.equal(d3.deviation([NaN]), undefined);
  assert.equal(d3.deviation([NaN, NaN]), undefined);
});

it("deviation(array, f) returns the deviation of the specified numbers", () => {
  assert.equal(d3.deviation([5, 1, 2, 3, 4].map(box), unbox), Math.sqrt(2.5));
  assert.equal(d3.deviation([20, 3].map(box), unbox), Math.sqrt(144.5));
  assert.equal(d3.deviation([3, 20].map(box), unbox), Math.sqrt(144.5));
});

it("deviation(array, f) ignores null, undefined and NaN", () => {
  assert.equal(d3.deviation([NaN, 1, 2, 3, 4, 5].map(box), unbox), Math.sqrt(2.5));
  assert.equal(d3.deviation([1, 2, 3, 4, 5, NaN].map(box), unbox), Math.sqrt(2.5));
  assert.equal(d3.deviation([10, null, 3, undefined, 5, NaN].map(box), unbox), Math.sqrt(13));
});

it("deviation(array, f) can handle large numbers without overflowing", () => {
  assert.equal(d3.deviation([Number.MAX_VALUE, Number.MAX_VALUE].map(box), unbox), 0);
  assert.equal(d3.deviation([-Number.MAX_VALUE, -Number.MAX_VALUE].map(box), unbox), 0);
});

it("deviation(array, f) returns undefined if the array has fewer than two numbers", () => {
  assert.equal(d3.deviation([1].map(box), unbox), undefined);
  assert.equal(d3.deviation([].map(box), unbox), undefined);
  assert.equal(d3.deviation([null].map(box), unbox), undefined);
  assert.equal(d3.deviation([undefined].map(box), unbox), undefined);
  assert.equal(d3.deviation([NaN].map(box), unbox), undefined);
  assert.equal(d3.deviation([NaN, NaN].map(box), unbox), undefined);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

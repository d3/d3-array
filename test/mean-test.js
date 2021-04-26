import assert from "assert";
import * as d3 from "../src/index.js";
import {OneTimeNumber} from "./OneTimeNumber.js";

it("mean(array) returns the mean value for numbers", () => {
  assert.strictEqual(d3.mean([1]), 1);
  assert.strictEqual(d3.mean([5, 1, 2, 3, 4]), 3);
  assert.strictEqual(d3.mean([20, 3]), 11.5);
  assert.strictEqual(d3.mean([3, 20]), 11.5);
});

it("mean(array) ignores null, undefined and NaN", () => {
  assert.strictEqual(d3.mean([NaN, 1, 2, 3, 4, 5]), 3);
  assert.strictEqual(d3.mean([1, 2, 3, 4, 5, NaN]), 3);
  assert.strictEqual(d3.mean([10, null, 3, undefined, 5, NaN]), 6);
});

it("mean(array) returns undefined if the array contains no observed values", () => {
  assert.strictEqual(d3.mean([]), undefined);
  assert.strictEqual(d3.mean([null]), undefined);
  assert.strictEqual(d3.mean([undefined]), undefined);
  assert.strictEqual(d3.mean([NaN]), undefined);
  assert.strictEqual(d3.mean([NaN, NaN]), undefined);
});

it("mean(array) coerces values to numbers", () => {
  assert.strictEqual(d3.mean(["1"]), 1);
  assert.strictEqual(d3.mean(["5", "1", "2", "3", "4"]), 3);
  assert.strictEqual(d3.mean(["20", "3"]), 11.5);
  assert.strictEqual(d3.mean(["3", "20"]), 11.5);
});

it("mean(array) coerces values exactly once", () => {
  const numbers = [1, new OneTimeNumber(3)];
  assert.strictEqual(d3.mean(numbers), 2);
  assert.strictEqual(d3.mean(numbers), 1);
});

it("mean(array, f) returns the mean value for numbers", () => {
  assert.strictEqual(d3.mean([1].map(box), unbox), 1);
  assert.strictEqual(d3.mean([5, 1, 2, 3, 4].map(box), unbox), 3);
  assert.strictEqual(d3.mean([20, 3].map(box), unbox), 11.5);
  assert.strictEqual(d3.mean([3, 20].map(box), unbox), 11.5);
});

it("mean(array, f) ignores null, undefined and NaN", () => {
  assert.strictEqual(d3.mean([NaN, 1, 2, 3, 4, 5].map(box), unbox), 3);
  assert.strictEqual(d3.mean([1, 2, 3, 4, 5, NaN].map(box), unbox), 3);
  assert.strictEqual(d3.mean([10, null, 3, undefined, 5, NaN].map(box), unbox), 6);
});

it("mean(array, f) returns undefined if the array contains no observed values", () => {
  assert.strictEqual(d3.mean([].map(box), unbox), undefined);
  assert.strictEqual(d3.mean([null].map(box), unbox), undefined);
  assert.strictEqual(d3.mean([undefined].map(box), unbox), undefined);
  assert.strictEqual(d3.mean([NaN].map(box), unbox), undefined);
  assert.strictEqual(d3.mean([NaN, NaN].map(box), unbox), undefined);
});

it("mean(array, f) coerces values to numbers", () => {
  assert.strictEqual(d3.mean(["1"].map(box), unbox), 1);
  assert.strictEqual(d3.mean(["5", "1", "2", "3", "4"].map(box), unbox), 3);
  assert.strictEqual(d3.mean(["20", "3"].map(box), unbox), 11.5);
  assert.strictEqual(d3.mean(["3", "20"].map(box), unbox), 11.5);
});

it("mean(array, f) coerces values exactly once", () => {
  const numbers = [1, new OneTimeNumber(3)].map(box);
  assert.strictEqual(d3.mean(numbers, unbox), 2);
  assert.strictEqual(d3.mean(numbers, unbox), 1);
});

it("mean(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const strings = ["a", "b", "c"];
  d3.mean(strings, (d, i, array) => results.push([d, i, array]));
  assert.deepStrictEqual(results, [["a", 0, strings], ["b", 1, strings], ["c", 2, strings]]);
});

it("mean(array, f) uses the global context", () => {
  const results = [];
  d3.mean([1, 2], function() { results.push(this); });
  assert.deepStrictEqual(results, [undefined, undefined]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

import assert from "assert";
import {gmean} from "../src/index.js";
import {OneTimeNumber} from "./OneTimeNumber.js";

it("gmean(array) returns the geometric mean value for numbers", () => {
  assert.strictEqual(gmean([1]), 1);
  assert.strictEqual(gmean([2, 4, 8, 16, 32]), 8);
});

it("gmean(array) ignores null, undefined and NaN", () => {
  assert.strictEqual(gmean([NaN, 2, 4, 8, 16, 32]), 8);
  assert.strictEqual(gmean([10, null, undefined, 1, NaN]), 3.162277660168379);
});

it("gmean(array) returns undefined if the array contains no observed values", () => {
  assert.strictEqual(gmean([]), undefined);
  assert.strictEqual(gmean([null]), undefined);
  assert.strictEqual(gmean([undefined]), undefined);
  assert.strictEqual(gmean([NaN]), undefined);
  assert.strictEqual(gmean([NaN, NaN]), undefined);
});

it("gmean(array) coerces values to numbers", () => {
  assert.strictEqual(gmean(["1"]), 1);
  assert.strictEqual(gmean(["5", "1", "2", "3", "4"]), 2.605171084697352);
  assert.strictEqual(gmean(["20", "3"]), 7.745966692414834);
});

it("gmean(array) coerces values exactly once", () => {
  const numbers = [1, new OneTimeNumber(3)];
  assert.strictEqual(gmean(numbers), 1.7320508075688772);
  assert.strictEqual(gmean(numbers), 1);
});

it("gmean(array, f) returns the geometric mean value for numbers", () => {
  assert.strictEqual(gmean([1].map(box), unbox), 1);
  assert.strictEqual(gmean([5, 1, 2, 3, 4].map(box), unbox), 2.605171084697352);
  assert.strictEqual(gmean([20, 3].map(box), unbox), 7.745966692414834);
});

it("gmean(array, f) ignores null, undefined and NaN", () => {
  assert.strictEqual(gmean([NaN, 1, 2, 3, 4, 5].map(box), unbox), 2.605171084697352);
  assert.strictEqual(gmean([10, null, 3, undefined, 5, NaN].map(box), unbox), 5.313292845913056);
});

it("gmean(array, f) returns undefined if the array contains no observed values", () => {
  assert.strictEqual(gmean([].map(box), unbox), undefined);
  assert.strictEqual(gmean([null].map(box), unbox), undefined);
  assert.strictEqual(gmean([undefined].map(box), unbox), undefined);
  assert.strictEqual(gmean([NaN].map(box), unbox), undefined);
  assert.strictEqual(gmean([NaN, NaN].map(box), unbox), undefined);
});

it("gmean(array, f) coerces values to numbers", () => {
  assert.strictEqual(gmean(["1"].map(box), unbox), 1);
  assert.strictEqual(gmean(["1", "2", "3", "4", "5"].map(box), unbox), 2.605171084697352);
  assert.strictEqual(gmean(["20", "3"].map(box), unbox), 7.745966692414834);
});

it("gmean(array, f) coerces values exactly once", () => {
  const numbers = [1, new OneTimeNumber(3)].map(box);
  assert.strictEqual(gmean(numbers, unbox), 1.7320508075688772);
  assert.strictEqual(gmean(numbers, unbox), 1);
});

it("gmean(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const strings = ["a", "b", "c"];
  gmean(strings, (d, i, array) => results.push([d, i, array]));
  assert.deepStrictEqual(results, [["a", 0, strings], ["b", 1, strings], ["c", 2, strings]]);
});

it("gmean(array, f) uses the undefined context", () => {
  const results = [];
  gmean([1, 2], function() { results.push(this); });
  assert.deepStrictEqual(results, [undefined, undefined]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

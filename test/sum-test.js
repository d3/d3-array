import assert from "assert";
import * as d3 from "../src/index.js";

it("sum(array) returns the sum of the specified numbers", () => {
  assert.equal(d3.sum([1]), 1);
  assert.equal(d3.sum([5, 1, 2, 3, 4]), 15);
  assert.equal(d3.sum([20, 3]), 23);
  assert.equal(d3.sum([3, 20]), 23);
});

it("sum(array) observes values that can be coerced to numbers", () => {
  assert.equal(d3.sum(["20", "3"]), 23);
  assert.equal(d3.sum(["3", "20"]), 23);
  assert.equal(d3.sum(["3", 20]), 23);
  assert.equal(d3.sum([20, "3"]), 23);
  assert.equal(d3.sum([3, "20"]), 23);
  assert.equal(d3.sum(["20", 3]), 23);
});

it("sum(array) ignores non-numeric values", () => {
  assert.equal(d3.sum(["a", "b", "c"]), 0);
  assert.equal(d3.sum(["a", 1, "2"]), 3);
});

it("sum(array) ignores null, undefined and NaN", () => {
  assert.equal(d3.sum([NaN, 1, 2, 3, 4, 5]), 15);
  assert.equal(d3.sum([1, 2, 3, 4, 5, NaN]), 15);
  assert.equal(d3.sum([10, null, 3, undefined, 5, NaN]), 18);
});

it("sum(array) returns zero if there are no numbers", () => {
  assert.equal(d3.sum([]), 0);
  assert.equal(d3.sum([NaN]), 0);
  assert.equal(d3.sum([undefined]), 0);
  assert.equal(d3.sum([undefined, NaN]), 0);
  assert.equal(d3.sum([undefined, NaN, {}]), 0);
});

it("sum(array, f) returns the sum of the specified numbers", () => {
  assert.equal(d3.sum([1].map(box), unbox), 1);
  assert.equal(d3.sum([5, 1, 2, 3, 4].map(box), unbox), 15);
  assert.equal(d3.sum([20, 3].map(box), unbox), 23);
  assert.equal(d3.sum([3, 20].map(box), unbox), 23);
});

it("sum(array, f) observes values that can be coerced to numbers", () => {
  assert.equal(d3.sum(["20", "3"].map(box), unbox), 23);
  assert.equal(d3.sum(["3", "20"].map(box), unbox), 23);
  assert.equal(d3.sum(["3", 20].map(box), unbox), 23);
  assert.equal(d3.sum([20, "3"].map(box), unbox), 23);
  assert.equal(d3.sum([3, "20"].map(box), unbox), 23);
  assert.equal(d3.sum(["20", 3].map(box), unbox), 23);
});

it("sum(array, f) ignores non-numeric values", () => {
  assert.equal(d3.sum(["a", "b", "c"].map(box), unbox), 0);
  assert.equal(d3.sum(["a", 1, "2"].map(box), unbox), 3);
});

it("sum(array, f) ignores null, undefined and NaN", () => {
  assert.equal(d3.sum([NaN, 1, 2, 3, 4, 5].map(box), unbox), 15);
  assert.equal(d3.sum([1, 2, 3, 4, 5, NaN].map(box), unbox), 15);
  assert.equal(d3.sum([10, null, 3, undefined, 5, NaN].map(box), unbox), 18);
});

it("sum(array, f) returns zero if there are no numbers", () => {
  assert.equal(d3.sum([].map(box), unbox), 0);
  assert.equal(d3.sum([NaN].map(box), unbox), 0);
  assert.equal(d3.sum([undefined].map(box), unbox), 0);
  assert.equal(d3.sum([undefined, NaN].map(box), unbox), 0);
  assert.equal(d3.sum([undefined, NaN, {}].map(box), unbox), 0);
});

it("sum(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.sum(array, (d, i, array) => results.push([d, i, array]));
  assert.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

it.skip("sum(array, f) uses the global context", () => {
  const results = [];
  d3.sum([1, 2], function() { results.push(this); });
  assert.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

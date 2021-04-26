import assert from "assert";
import * as d3 from "../src/index.js";

it("fcumsum(array) returns a Float64Array of the expected length", () => {
  const A = [.1, .1, .1, .1, .1, .1, .1, .1, .1, .1];
  const R = d3.cumsum(A);
  assert(R instanceof Float64Array);
  assert.equal(R.length, A.length);
});

it("fcumsum(array) is an exact cumsum", () => {
  assert.equal(lastc([.1, .1, .1, .1, .1, .1, .1, .1, .1, .1]), 1);
  assert.equal(lastc([.3, .3, .3, .3, .3, .3, .3, .3, .3, .3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3]), 0);
  assert.equal(lastc(["20", "3"].map(box), unbox), 23);
});

it("fcumsum(array) returns the fsum of the specified numbers", () => {
  assert.equal(lastc([1]), 1);
  assert.equal(lastc([5, 1, 2, 3, 4]), 15);
  assert.equal(lastc([20, 3]), 23);
  assert.equal(lastc([3, 20]), 23);
});

it("fcumsum(array) observes values that can be coerced to numbers", () => {
  assert.equal(lastc(["20", "3"]), 23);
  assert.equal(lastc(["3", "20"]), 23);
  assert.equal(lastc(["3", 20]), 23);
  assert.equal(lastc([20, "3"]), 23);
  assert.equal(lastc([3, "20"]), 23);
  assert.equal(lastc(["20", 3]), 23);
});

it("fcumsum(array) ignores non-numeric values", () => {
  assert.equal(lastc(["a", "b", "c"]), 0);
  assert.equal(lastc(["a", 1, "2"]), 3);
});

it("fcumsum(array) ignores null, undefined and NaN", () => {
  assert.equal(lastc([NaN, 1, 2, 3, 4, 5]), 15);
  assert.equal(lastc([1, 2, 3, 4, 5, NaN]), 15);
  assert.equal(lastc([10, null, 3, undefined, 5, NaN]), 18);
});

it("fcumsum(array) returns an array of zeros if there are no numbers", () => {
  assert.deepEqual(Array.from(d3.fcumsum([])), []);
  assert.deepEqual(Array.from(d3.fcumsum([NaN])), [0]);
  assert.deepEqual(Array.from(d3.fcumsum([undefined])), [0]);
  assert.deepEqual(Array.from(d3.fcumsum([undefined, NaN])), [0, 0]);
  assert.deepEqual(Array.from(d3.fcumsum([undefined, NaN, {}])), [0, 0, 0]);
});

it("fcumsum(array, f) returns the fsum of the specified numbers", () => {
  assert.equal(lastc([1].map(box), unbox), 1);
  assert.equal(lastc([5, 1, 2, 3, 4].map(box), unbox), 15);
  assert.equal(lastc([20, 3].map(box), unbox), 23);
  assert.equal(lastc([3, 20].map(box), unbox), 23);
});

it("fcumsum(array, f) observes values that can be coerced to numbers", () => {
  assert.equal(lastc(["20", "3"].map(box), unbox), 23);
  assert.equal(lastc(["3", "20"].map(box), unbox), 23);
  assert.equal(lastc(["3", 20].map(box), unbox), 23);
  assert.equal(lastc([20, "3"].map(box), unbox), 23);
  assert.equal(lastc([3, "20"].map(box), unbox), 23);
  assert.equal(lastc(["20", 3].map(box), unbox), 23);
});

it("fcumsum(array, f) ignores non-numeric values", () => {
  assert.equal(lastc(["a", "b", "c"].map(box), unbox), 0);
  assert.equal(lastc(["a", 1, "2"].map(box), unbox), 3);
});

it("fcumsum(array, f) ignores null, undefined and NaN", () => {
  assert.equal(lastc([NaN, 1, 2, 3, 4, 5].map(box), unbox), 15);
  assert.equal(lastc([1, 2, 3, 4, 5, NaN].map(box), unbox), 15);
  assert.equal(lastc([10, null, 3, undefined, 5, NaN].map(box), unbox), 18);
});

it("fcumsum(array, f) returns zero if there are no numbers", () => {
  assert.deepEqual(Array.from(d3.fcumsum([].map(box), unbox)), []);
  assert.deepEqual(Array.from(d3.fcumsum([NaN].map(box), unbox)), [0]);
  assert.deepEqual(Array.from(d3.fcumsum([undefined].map(box), unbox)), [0]);
  assert.deepEqual(Array.from(d3.fcumsum([undefined, NaN].map(box), unbox)), [0, 0]);
  assert.deepEqual(Array.from(d3.fcumsum([undefined, NaN, {}].map(box), unbox)), [0, 0, 0]);
});

it("fcumsum(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const array = ["a", "b", "c"];
  lastc(array, (d, i, array) => results.push([d, i, array]));
  assert.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

it("fcumsum(array, f) uses the global context", () => {
  const results = [];
  lastc([1, 2], function() { results.push(this); });
  assert.deepEqual(results, [undefined, undefined]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

function lastc(values, valueof) {
  const array = d3.fcumsum(values, valueof);
  return array[array.length -1];
}
const tape = require("tape-await");
const d3 = require("../");

tape("min(array) returns the least numeric value for numbers", (test) => {
  test.deepEqual(d3.min([1]), 1);
  test.deepEqual(d3.min([5, 1, 2, 3, 4]), 1);
  test.deepEqual(d3.min([20, 3]), 3);
  test.deepEqual(d3.min([3, 20]), 3);
});

tape("min(array) returns the least lexicographic value for strings", (test) => {
  test.deepEqual(d3.min(["c", "a", "b"]), "a");
  test.deepEqual(d3.min(["20", "3"]), "20");
  test.deepEqual(d3.min(["3", "20"]), "20");
});

tape("min(array) ignores null, undefined and NaN", (test) => {
  const o = {valueOf: () => NaN};
  test.deepEqual(d3.min([NaN, 1, 2, 3, 4, 5]), 1);
  test.deepEqual(d3.min([o, 1, 2, 3, 4, 5]), 1);
  test.deepEqual(d3.min([1, 2, 3, 4, 5, NaN]), 1);
  test.deepEqual(d3.min([1, 2, 3, 4, 5, o]), 1);
  test.deepEqual(d3.min([10, null, 3, undefined, 5, NaN]), 3);
  test.deepEqual(d3.min([-1, null, -3, undefined, -5, NaN]), -5);
});

tape("min(array) compares heterogenous types as numbers", (test) => {
  test.equal(d3.min([20, "3"]), "3");
  test.equal(d3.min(["20", 3]), 3);
  test.equal(d3.min([3, "20"]), 3);
  test.equal(d3.min(["3", 20]), "3");
});

tape("min(array) returns undefined if the array contains no numbers", (test) => {
  test.equal(d3.min([]), undefined);
  test.equal(d3.min([null]), undefined);
  test.equal(d3.min([undefined]), undefined);
  test.equal(d3.min([NaN]), undefined);
  test.equal(d3.min([NaN, NaN]), undefined);
});

tape("min(array, f) returns the least numeric value for numbers", (test) => {
  test.deepEqual(d3.min([1].map(box), unbox), 1);
  test.deepEqual(d3.min([5, 1, 2, 3, 4].map(box), unbox), 1);
  test.deepEqual(d3.min([20, 3].map(box), unbox), 3);
  test.deepEqual(d3.min([3, 20].map(box), unbox), 3);
});

tape("min(array, f) returns the least lexicographic value for strings", (test) => {
  test.deepEqual(d3.min(["c", "a", "b"].map(box), unbox), "a");
  test.deepEqual(d3.min(["20", "3"].map(box), unbox), "20");
  test.deepEqual(d3.min(["3", "20"].map(box), unbox), "20");
});

tape("min(array, f) ignores null, undefined and NaN", (test) => {
  const o = {valueOf: () => NaN};
  test.deepEqual(d3.min([NaN, 1, 2, 3, 4, 5].map(box), unbox), 1);
  test.deepEqual(d3.min([o, 1, 2, 3, 4, 5].map(box), unbox), 1);
  test.deepEqual(d3.min([1, 2, 3, 4, 5, NaN].map(box), unbox), 1);
  test.deepEqual(d3.min([1, 2, 3, 4, 5, o].map(box), unbox), 1);
  test.deepEqual(d3.min([10, null, 3, undefined, 5, NaN].map(box), unbox), 3);
  test.deepEqual(d3.min([-1, null, -3, undefined, -5, NaN].map(box), unbox), -5);
});

tape("min(array, f) compares heterogenous types as numbers", (test) => {
  test.equal(d3.min([20, "3"].map(box), unbox), "3");
  test.equal(d3.min(["20", 3].map(box), unbox), 3);
  test.equal(d3.min([3, "20"].map(box), unbox), 3);
  test.equal(d3.min(["3", 20].map(box), unbox), "3");
});

tape("min(array, f) returns undefined if the array contains no observed values", (test) => {
  test.equal(d3.min([].map(box), unbox), undefined);
  test.equal(d3.min([null].map(box), unbox), undefined);
  test.equal(d3.min([undefined].map(box), unbox), undefined);
  test.equal(d3.min([NaN].map(box), unbox), undefined);
  test.equal(d3.min([NaN, NaN].map(box), unbox), undefined);
});

tape("min(array, f) passes the accessor d, i, and array", (test) => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.min(array, (d, i, array) => results.push([d, i, array]));
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

tape("min(array, f) uses the global context", (test) => {
  const results = [];
  d3.min([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

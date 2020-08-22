const tape = require("tape-await");
const d3 = require("../");

tape("max(array) returns the greatest numeric value for numbers", (test) => {
  test.deepEqual(d3.max([1]), 1);
  test.deepEqual(d3.max([5, 1, 2, 3, 4]), 5);
  test.deepEqual(d3.max([20, 3]), 20);
  test.deepEqual(d3.max([3, 20]), 20);
});

tape("max(array) returns the greatest lexicographic value for strings", (test) => {
  test.deepEqual(d3.max(["c", "a", "b"]), "c");
  test.deepEqual(d3.max(["20", "3"]), "3");
  test.deepEqual(d3.max(["3", "20"]), "3");
});

tape("max(array) ignores null, undefined and NaN", (test) => {
  const o = {valueOf: () => NaN};
  test.deepEqual(d3.max([NaN, 1, 2, 3, 4, 5]), 5);
  test.deepEqual(d3.max([o, 1, 2, 3, 4, 5]), 5);
  test.deepEqual(d3.max([1, 2, 3, 4, 5, NaN]), 5);
  test.deepEqual(d3.max([1, 2, 3, 4, 5, o]), 5);
  test.deepEqual(d3.max([10, null, 3, undefined, 5, NaN]), 10);
  test.deepEqual(d3.max([-1, null, -3, undefined, -5, NaN]), -1);
});

tape("max(array) compares heterogenous types as numbers", (test) => {
  test.equal(d3.max([20, "3"]), 20);
  test.equal(d3.max(["20", 3]), "20");
  test.equal(d3.max([3, "20"]), "20");
  test.equal(d3.max(["3", 20]), 20);
});

tape("max(array) returns undefined if the array contains no numbers", (test) => {
  test.equal(d3.max([]), undefined);
  test.equal(d3.max([null]), undefined);
  test.equal(d3.max([undefined]), undefined);
  test.equal(d3.max([NaN]), undefined);
  test.equal(d3.max([NaN, NaN]), undefined);
});

tape("max(array, f) returns the greatest numeric value for numbers", (test) => {
  test.deepEqual(d3.max([1].map(box), unbox), 1);
  test.deepEqual(d3.max([5, 1, 2, 3, 4].map(box), unbox), 5);
  test.deepEqual(d3.max([20, 3].map(box), unbox), 20);
  test.deepEqual(d3.max([3, 20].map(box), unbox), 20);
});

tape("max(array, f) returns the greatest lexicographic value for strings", (test) => {
  test.deepEqual(d3.max(["c", "a", "b"].map(box), unbox), "c");
  test.deepEqual(d3.max(["20", "3"].map(box), unbox), "3");
  test.deepEqual(d3.max(["3", "20"].map(box), unbox), "3");
});

tape("max(array, f) ignores null, undefined and NaN", (test) => {
  const o = {valueOf: () => NaN};
  test.deepEqual(d3.max([NaN, 1, 2, 3, 4, 5].map(box), unbox), 5);
  test.deepEqual(d3.max([o, 1, 2, 3, 4, 5].map(box), unbox), 5);
  test.deepEqual(d3.max([1, 2, 3, 4, 5, NaN].map(box), unbox), 5);
  test.deepEqual(d3.max([1, 2, 3, 4, 5, o].map(box), unbox), 5);
  test.deepEqual(d3.max([10, null, 3, undefined, 5, NaN].map(box), unbox), 10);
  test.deepEqual(d3.max([-1, null, -3, undefined, -5, NaN].map(box), unbox), -1);
});

tape("max(array, f) compares heterogenous types as numbers", (test) => {
  test.equal(d3.max([20, "3"].map(box), unbox), 20);
  test.equal(d3.max(["20", 3].map(box), unbox), "20");
  test.equal(d3.max([3, "20"].map(box), unbox), "20");
  test.equal(d3.max(["3", 20].map(box), unbox), 20);
});

tape("max(array, f) returns undefined if the array contains no observed values", (test) => {
  test.equal(d3.max([].map(box), unbox), undefined);
  test.equal(d3.max([null].map(box), unbox), undefined);
  test.equal(d3.max([undefined].map(box), unbox), undefined);
  test.equal(d3.max([NaN].map(box), unbox), undefined);
  test.equal(d3.max([NaN, NaN].map(box), unbox), undefined);
});

tape("max(array, f) passes the accessor d, i, and array", (test) => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.max(array, (d, i, array) => results.push([d, i, array]));
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

tape("max(array, f) uses the global context", (test) => {
  const results = [];
  d3.max([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

const tape = require("tape-await");
const d3 = require("../");

tape("extent(array) returns the least and greatest numeric values for numbers", (test) => {
  test.deepEqual(d3.extent([1]), [1, 1]);
  test.deepEqual(d3.extent([5, 1, 2, 3, 4]), [1, 5]);
  test.deepEqual(d3.extent([20, 3]), [3, 20]);
  test.deepEqual(d3.extent([3, 20]), [3, 20]);
});

tape("extent(array) returns the least and greatest lexicographic value for strings", (test) => {
  test.deepEqual(d3.extent(["c", "a", "b"]), ["a", "c"]);
  test.deepEqual(d3.extent(["20", "3"]), ["20", "3"]);
  test.deepEqual(d3.extent(["3", "20"]), ["20", "3"]);
});

tape("extent(array) ignores null, undefined and NaN", (test) => {
  const o = {valueOf: () => NaN};
  test.deepEqual(d3.extent([NaN, 1, 2, 3, 4, 5]), [1, 5]);
  test.deepEqual(d3.extent([o, 1, 2, 3, 4, 5]), [1, 5]);
  test.deepEqual(d3.extent([1, 2, 3, 4, 5, NaN]), [1, 5]);
  test.deepEqual(d3.extent([1, 2, 3, 4, 5, o]), [1, 5]);
  test.deepEqual(d3.extent([10, null, 3, undefined, 5, NaN]), [3, 10]);
  test.deepEqual(d3.extent([-1, null, -3, undefined, -5, NaN]), [-5, -1]);
});

tape("extent(array) compares heterogenous types as numbers", (test) => {
  test.deepEqual(d3.extent([20, "3"]), ["3", 20]);
  test.deepEqual(d3.extent(["20", 3]), [3, "20"]);
  test.deepEqual(d3.extent([3, "20"]), [3, "20"]);
  test.deepEqual(d3.extent(["3", 20]), ["3", 20]);
});

tape("extent(array) returns undefined if the array contains no numbers", (test) => {
  test.deepEqual(d3.extent([]), [undefined, undefined]);
  test.deepEqual(d3.extent([null]), [undefined, undefined]);
  test.deepEqual(d3.extent([undefined]), [undefined, undefined]);
  test.deepEqual(d3.extent([NaN]), [undefined, undefined]);
  test.deepEqual(d3.extent([NaN, NaN]), [undefined, undefined]);
});

tape("extent(array, f) returns the least and greatest numeric value for numbers", (test) => {
  test.deepEqual(d3.extent([1].map(box), unbox), [1, 1]);
  test.deepEqual(d3.extent([5, 1, 2, 3, 4].map(box), unbox), [1, 5]);
  test.deepEqual(d3.extent([20, 3].map(box), unbox), [3, 20]);
  test.deepEqual(d3.extent([3, 20].map(box), unbox), [3, 20]);
});

tape("extent(array, f) returns the least and greatest lexicographic value for strings", (test) => {
  test.deepEqual(d3.extent(["c", "a", "b"].map(box), unbox), ["a", "c"]);
  test.deepEqual(d3.extent(["20", "3"].map(box), unbox), ["20", "3"]);
  test.deepEqual(d3.extent(["3", "20"].map(box), unbox), ["20", "3"]);
});

tape("extent(array, f) ignores null, undefined and NaN", (test) => {
  const o = {valueOf: () => NaN};
  test.deepEqual(d3.extent([NaN, 1, 2, 3, 4, 5].map(box), unbox), [1, 5]);
  test.deepEqual(d3.extent([o, 1, 2, 3, 4, 5].map(box), unbox), [1, 5]);
  test.deepEqual(d3.extent([1, 2, 3, 4, 5, NaN].map(box), unbox), [1, 5]);
  test.deepEqual(d3.extent([1, 2, 3, 4, 5, o].map(box), unbox), [1, 5]);
  test.deepEqual(d3.extent([10, null, 3, undefined, 5, NaN].map(box), unbox), [3, 10]);
  test.deepEqual(d3.extent([-1, null, -3, undefined, -5, NaN].map(box), unbox), [-5, -1]);
});

tape("extent(array, f) compares heterogenous types as numbers", (test) => {
  test.deepEqual(d3.extent([20, "3"].map(box), unbox), ["3", 20]);
  test.deepEqual(d3.extent(["20", 3].map(box), unbox), [3, "20"]);
  test.deepEqual(d3.extent([3, "20"].map(box), unbox), [3, "20"]);
  test.deepEqual(d3.extent(["3", 20].map(box), unbox), ["3", 20]);
});

tape("extent(array, f) returns undefined if the array contains no observed values", (test) => {
  test.deepEqual(d3.extent([].map(box), unbox), [undefined, undefined]);
  test.deepEqual(d3.extent([null].map(box), unbox), [undefined, undefined]);
  test.deepEqual(d3.extent([undefined].map(box), unbox), [undefined, undefined]);
  test.deepEqual(d3.extent([NaN].map(box), unbox), [undefined, undefined]);
  test.deepEqual(d3.extent([NaN, NaN].map(box), unbox), [undefined, undefined]);
});

tape("extent(array, f) passes the accessor d, i, and array", (test) => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.extent(array, (d, i, array) => results.push([d, i, array]));
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

tape("extent(array, f) uses the global context", (test) => {
  const results = [];
  d3.extent([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

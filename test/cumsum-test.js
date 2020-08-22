const tape = require("tape-await");
const d3 = require("../");

tape("cumsum(array) returns the cumulative sum of the specified numbers", (test) => {
  test.deepEqual(d3.cumsum([1]), [1]);
  test.deepEqual(d3.cumsum([5, 1, 2, 3, 4]), [5, 6, 8, 11, 15]);
  test.deepEqual(d3.cumsum([20, 3]), [20, 23]);
  test.deepEqual(d3.cumsum([3, 20]), [3, 23]);
});

tape("cumsum(array) observes values that can be coerced to numbers", (test) => {
  test.deepEqual(d3.cumsum(["20", "3"]), [20, 23]);
  test.deepEqual(d3.cumsum(["3", "20"]), [3, 23]);
  test.deepEqual(d3.cumsum(["3", 20]), [3, 23]);
  test.deepEqual(d3.cumsum([20, "3"]), [20, 23]);
  test.deepEqual(d3.cumsum([3, "20"]), [3, 23]);
  test.deepEqual(d3.cumsum(["20", 3]), [20, 23]);
});

tape("cumsum(array) ignores non-numeric values", (test) => {
  test.deepEqual(d3.cumsum(["a", "b", "c"]), [0, 0, 0]);
  test.deepEqual(d3.cumsum(["a", 1, "2"]), [0, 1, 3]);
});

tape("cumsum(array) ignores null, undefined and NaN", (test) => {
  test.deepEqual(d3.cumsum([NaN, 1, 2, 3, 4, 5]), [0, 1, 3, 6, 10, 15]);
  test.deepEqual(d3.cumsum([1, 2, 3, 4, 5, NaN]), [1, 3, 6, 10, 15, 15]);
  test.deepEqual(d3.cumsum([10, null, 3, undefined, 5, NaN]), [10, 10, 13, 13, 18, 18]);
});

tape("cumsum(array) returns zeros if there are no numbers", (test) => {
  test.deepEqual(d3.cumsum([]), []);
  test.deepEqual(d3.cumsum([NaN]), [0]);
  test.deepEqual(d3.cumsum([undefined]), [0]);
  test.deepEqual(d3.cumsum([undefined, NaN]), [0, 0]);
  test.deepEqual(d3.cumsum([undefined, NaN, {}]), [0, 0, 0]);
});

tape("cumsum(array, f) returns the cumsum of the specified numbers", (test) => {
  test.deepEqual(d3.cumsum([1].map(box), unbox), [1]);
  test.deepEqual(d3.cumsum([5, 1, 2, 3, 4].map(box), unbox), [5, 6, 8, 11, 15]);
  test.deepEqual(d3.cumsum([20, 3].map(box), unbox), [20, 23]);
  test.deepEqual(d3.cumsum([3, 20].map(box), unbox), [3, 23]);
});

tape("cumsum(array, f) observes values that can be coerced to numbers", (test) => {
  test.deepEqual(d3.cumsum(["20", "3"].map(box), unbox), [20, 23]);
  test.deepEqual(d3.cumsum(["3", "20"].map(box), unbox), [3, 23]);
  test.deepEqual(d3.cumsum(["3", 20].map(box), unbox), [3, 23]);
  test.deepEqual(d3.cumsum([20, "3"].map(box), unbox), [20, 23]);
  test.deepEqual(d3.cumsum([3, "20"].map(box), unbox), [3, 23]);
  test.deepEqual(d3.cumsum(["20", 3].map(box), unbox), [20, 23]);
});

tape("cumsum(array, f) ignores non-numeric values", (test) => {
  test.deepEqual(d3.cumsum(["a", "b", "c"].map(box), unbox), [0, 0, 0]);
  test.deepEqual(d3.cumsum(["a", 1, "2"].map(box), unbox), [0, 1, 3]);
});

tape("cumsum(array, f) ignores null, undefined and NaN", (test) => {
  test.deepEqual(d3.cumsum([NaN, 1, 2, 3, 4, 5].map(box), unbox), [0, 1, 3, 6, 10, 15]);
  test.deepEqual(d3.cumsum([1, 2, 3, 4, 5, NaN].map(box), unbox), [1, 3, 6, 10, 15, 15]);
  test.deepEqual(d3.cumsum([10, null, 3, undefined, 5, NaN].map(box), unbox), [10, 10, 13, 13, 18, 18]);
});

tape("cumsum(array, f) returns zeros if there are no numbers", (test) => {
  test.deepEqual(d3.cumsum([].map(box), unbox), []);
  test.deepEqual(d3.cumsum([NaN].map(box), unbox), [0]);
  test.deepEqual(d3.cumsum([undefined].map(box), unbox), [0]);
  test.deepEqual(d3.cumsum([undefined, NaN].map(box), unbox), [0, 0]);
  test.deepEqual(d3.cumsum([undefined, NaN, {}].map(box), unbox), [0, 0, 0]);
});

tape("cumsum(array, f) passes the accessor d, i, and array", (test) => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.cumsum(array, (d, i, array) => results.push([d, i, array]));
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

tape("cumsum(array, f) uses the global context", (test) => {
  const results = [];
  d3.cumsum([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

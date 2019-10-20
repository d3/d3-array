var tape = require("tape"),
    arrays = require("../");

tape("cumsum(array) returns the cumulative sum of the specified numbers", function(test) {
  test.deepEqual(arrays.cumsum([1]), [1]);
  test.deepEqual(arrays.cumsum([5, 1, 2, 3, 4]), [5, 6, 8, 11, 15]);
  test.deepEqual(arrays.cumsum([20, 3]), [20, 23]);
  test.deepEqual(arrays.cumsum([3, 20]), [3, 23]);
  test.end();
});

tape("cumsum(array) observes values that can be coerced to numbers", function(test) {
  test.deepEqual(arrays.cumsum(["20", "3"]), [20, 23]);
  test.deepEqual(arrays.cumsum(["3", "20"]), [3, 23]);
  test.deepEqual(arrays.cumsum(["3", 20]), [3, 23]);
  test.deepEqual(arrays.cumsum([20, "3"]), [20, 23]);
  test.deepEqual(arrays.cumsum([3, "20"]), [3, 23]);
  test.deepEqual(arrays.cumsum(["20", 3]), [20, 23]);
  test.end();
});

tape("cumsum(array) ignores non-numeric values", function(test) {
  test.deepEqual(arrays.cumsum(["a", "b", "c"]), [0, 0, 0]);
  test.deepEqual(arrays.cumsum(["a", 1, "2"]), [0, 1, 3]);
  test.end();
});

tape("cumsum(array) ignores null, undefined and NaN", function(test) {
  test.deepEqual(arrays.cumsum([NaN, 1, 2, 3, 4, 5]), [0, 1, 3, 6, 10, 15]);
  test.deepEqual(arrays.cumsum([1, 2, 3, 4, 5, NaN]), [1, 3, 6, 10, 15, 15]);
  test.deepEqual(arrays.cumsum([10, null, 3, undefined, 5, NaN]), [10, 10, 13, 13, 18, 18]);
  test.end();
});

tape("cumsum(array) returns zeros if there are no numbers", function(test) {
  test.deepEqual(arrays.cumsum([]), []);
  test.deepEqual(arrays.cumsum([NaN]), [0]);
  test.deepEqual(arrays.cumsum([undefined]), [0]);
  test.deepEqual(arrays.cumsum([undefined, NaN]), [0, 0]);
  test.deepEqual(arrays.cumsum([undefined, NaN, {}]), [0, 0, 0]);
  test.end();
});

tape("cumsum(array, f) returns the cumsum of the specified numbers", function(test) {
  test.deepEqual(arrays.cumsum([1].map(box), unbox), [1]);
  test.deepEqual(arrays.cumsum([5, 1, 2, 3, 4].map(box), unbox), [5, 6, 8, 11, 15]);
  test.deepEqual(arrays.cumsum([20, 3].map(box), unbox), [20, 23]);
  test.deepEqual(arrays.cumsum([3, 20].map(box), unbox), [3, 23]);
  test.end();
});

tape("cumsum(array, f) observes values that can be coerced to numbers", function(test) {
  test.deepEqual(arrays.cumsum(["20", "3"].map(box), unbox), [20, 23]);
  test.deepEqual(arrays.cumsum(["3", "20"].map(box), unbox), [3, 23]);
  test.deepEqual(arrays.cumsum(["3", 20].map(box), unbox), [3, 23]);
  test.deepEqual(arrays.cumsum([20, "3"].map(box), unbox), [20, 23]);
  test.deepEqual(arrays.cumsum([3, "20"].map(box), unbox), [3, 23]);
  test.deepEqual(arrays.cumsum(["20", 3].map(box), unbox), [20, 23]);
  test.end();
});

tape("cumsum(array, f) ignores non-numeric values", function(test) {
  test.deepEqual(arrays.cumsum(["a", "b", "c"].map(box), unbox), [0, 0, 0]);
  test.deepEqual(arrays.cumsum(["a", 1, "2"].map(box), unbox), [0, 1, 3]);
  test.end();
});

tape("cumsum(array, f) ignores null, undefined and NaN", function(test) {
  test.deepEqual(arrays.cumsum([NaN, 1, 2, 3, 4, 5].map(box), unbox), [0, 1, 3, 6, 10, 15]);
  test.deepEqual(arrays.cumsum([1, 2, 3, 4, 5, NaN].map(box), unbox), [1, 3, 6, 10, 15, 15]);
  test.deepEqual(arrays.cumsum([10, null, 3, undefined, 5, NaN].map(box), unbox), [10, 10, 13, 13, 18, 18]);
  test.end();
});

tape("cumsum(array, f) returns zeros if there are no numbers", function(test) {
  test.deepEqual(arrays.cumsum([].map(box), unbox), []);
  test.deepEqual(arrays.cumsum([NaN].map(box), unbox), [0]);
  test.deepEqual(arrays.cumsum([undefined].map(box), unbox), [0]);
  test.deepEqual(arrays.cumsum([undefined, NaN].map(box), unbox), [0, 0]);
  test.deepEqual(arrays.cumsum([undefined, NaN, {}].map(box), unbox), [0, 0, 0]);
  test.end();
});

tape("cumsum(array, f) passes the accessor d, i, and array", function(test) {
  var results = [], array = ["a", "b", "c"];
  arrays.cumsum(array, function(d, i, array) { results.push([d, i, array]); });
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
  test.end();
});

tape("cumsum(array, f) uses the global context", function(test) {
  var results = [];
  arrays.cumsum([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
  test.end();
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

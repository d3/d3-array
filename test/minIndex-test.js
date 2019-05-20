var tape = require("tape"),
    arrays = require("../");

tape("minIndex(array) returns the index of the least numeric value for numbers", function(test) {
  test.deepEqual(arrays.minIndex([1]), 0);
  test.deepEqual(arrays.minIndex([5, 1, 2, 3, 4]), 1);
  test.deepEqual(arrays.minIndex([20, 3]), 1);
  test.deepEqual(arrays.minIndex([3, 20]), 0);
  test.end();
});

tape("minIndex(array) returns the index of the least lexicographic value for strings", function(test) {
  test.deepEqual(arrays.minIndex(["c", "a", "b"]), 1);
  test.deepEqual(arrays.minIndex(["20", "3"]), 0);
  test.deepEqual(arrays.minIndex(["3", "20"]), 1);
  test.end();
});

tape("minIndex(array) ignores null, undefined and NaN", function(test) {
  var o = {valueOf: function() { return NaN; }};
  test.deepEqual(arrays.minIndex([NaN, 1, 2, 3, 4, 5]), 1);
  test.deepEqual(arrays.minIndex([o, 1, 2, 3, 4, 5]), 1);
  test.deepEqual(arrays.minIndex([1, 2, 3, 4, 5, NaN]), 0);
  test.deepEqual(arrays.minIndex([1, 2, 3, 4, 5, o]), 0);
  test.deepEqual(arrays.minIndex([10, null, 3, undefined, 5, NaN]), 2);
  test.deepEqual(arrays.minIndex([-1, null, -3, undefined, -5, NaN]), 4);
  test.end();
});

tape("minIndex(array) compares heterogenous types as numbers", function(test) {
  test.equal(arrays.minIndex([20, "3"]), 1);
  test.equal(arrays.minIndex(["20", 3]), 1);
  test.equal(arrays.minIndex([3, "20"]), 0);
  test.equal(arrays.minIndex(["3", 20]), 0);
  test.end();
});

tape("minIndex(array) returns -1 if the array contains no numbers", function(test) {
  test.equal(arrays.minIndex([]), -1);
  test.equal(arrays.minIndex([null]), -1);
  test.equal(arrays.minIndex([undefined]), -1);
  test.equal(arrays.minIndex([NaN]), -1);
  test.equal(arrays.minIndex([NaN, NaN]), -1);
  test.end();
});

tape("minIndex(array, f) returns the index of the least numeric value for numbers", function(test) {
  test.deepEqual(arrays.minIndex([1].map(box), unbox), 0);
  test.deepEqual(arrays.minIndex([5, 1, 2, 3, 4].map(box), unbox), 1);
  test.deepEqual(arrays.minIndex([20, 3].map(box), unbox), 1);
  test.deepEqual(arrays.minIndex([3, 20].map(box), unbox), 0);
  test.end();
});

tape("minIndex(array, f) returns the index of the least lexicographic value for strings", function(test) {
  test.deepEqual(arrays.minIndex(["c", "a", "b"].map(box), unbox), 1);
  test.deepEqual(arrays.minIndex(["20", "3"].map(box), unbox), 0);
  test.deepEqual(arrays.minIndex(["3", "20"].map(box), unbox), 1);
  test.end();
});

tape("minIndex(array, f) ignores null, undefined and NaN", function(test) {
  var o = {valueOf: function() { return NaN; }};
  test.deepEqual(arrays.minIndex([NaN, 1, 2, 3, 4, 5].map(box), unbox), 1);
  test.deepEqual(arrays.minIndex([o, 1, 2, 3, 4, 5].map(box), unbox), 1);
  test.deepEqual(arrays.minIndex([1, 2, 3, 4, 5, NaN].map(box), unbox), 0);
  test.deepEqual(arrays.minIndex([1, 2, 3, 4, 5, o].map(box), unbox), 0);
  test.deepEqual(arrays.minIndex([10, null, 3, undefined, 5, NaN].map(box), unbox), 2);
  test.deepEqual(arrays.minIndex([-1, null, -3, undefined, -5, NaN].map(box), unbox), 4);
  test.end();
});

tape("minIndex(array, f) compares heterogenous types as numbers", function(test) {
  test.equal(arrays.minIndex([20, "3"].map(box), unbox), 1);
  test.equal(arrays.minIndex(["20", 3].map(box), unbox), 1);
  test.equal(arrays.minIndex([3, "20"].map(box), unbox), 0);
  test.equal(arrays.minIndex(["3", 20].map(box), unbox), 0);
  test.end();
});

tape("minIndex(array, f) returns -1 if the array contains no observed values", function(test) {
  test.equal(arrays.minIndex([].map(box), unbox), -1);
  test.equal(arrays.minIndex([null].map(box), unbox), -1);
  test.equal(arrays.minIndex([undefined].map(box), unbox), -1);
  test.equal(arrays.minIndex([NaN].map(box), unbox), -1);
  test.equal(arrays.minIndex([NaN, NaN].map(box), unbox), -1);
  test.end();
});

tape("minIndex(array, f) passes the accessor d, i, and array", function(test) {
  var results = [], array = ["a", "b", "c"];
  arrays.minIndex(array, function(d, i, array) { results.push([d, i, array]); });
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
  test.end();
});

tape("minIndex(array, f) uses the global context", function(test) {
  var results = [];
  arrays.minIndex([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
  test.end();
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

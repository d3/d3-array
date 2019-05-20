var tape = require("tape"),
    arrays = require("../");

tape("maxIndex(array) returns the index of the greatest numeric value for numbers", function(test) {
  test.deepEqual(arrays.maxIndex([1]), 0);
  test.deepEqual(arrays.maxIndex([5, 1, 2, 3, 4]), 0);
  test.deepEqual(arrays.maxIndex([20, 3]), 0);
  test.deepEqual(arrays.maxIndex([3, 20]), 1);
  test.end();
});

tape("maxIndex(array) returns the greatest lexicographic value for strings", function(test) {
  test.deepEqual(arrays.maxIndex(["c", "a", "b"]), 0);
  test.deepEqual(arrays.maxIndex(["20", "3"]), 1);
  test.deepEqual(arrays.maxIndex(["3", "20"]), 0);
  test.end();
});

tape("maxIndex(array) ignores null, undefined and NaN", function(test) {
  var o = {valueOf: function() { return NaN; }};
  test.deepEqual(arrays.maxIndex([NaN, 1, 2, 3, 4, 5]), 5);
  test.deepEqual(arrays.maxIndex([o, 1, 2, 3, 4, 5]), 5);
  test.deepEqual(arrays.maxIndex([1, 2, 3, 4, 5, NaN]), 4);
  test.deepEqual(arrays.maxIndex([1, 2, 3, 4, 5, o]), 4);
  test.deepEqual(arrays.maxIndex([10, null, 3, undefined, 5, NaN]), 0);
  test.deepEqual(arrays.maxIndex([-1, null, -3, undefined, -5, NaN]), 0);
  test.end();
});

tape("maxIndex(array) compares heterogenous types as numbers", function(test) {
  test.equal(arrays.maxIndex([20, "3"]), 0);
  test.equal(arrays.maxIndex(["20", 3]), 0);
  test.equal(arrays.maxIndex([3, "20"]), 1);
  test.equal(arrays.maxIndex(["3", 20]), 1);
  test.end();
});

tape("maxIndex(array) returns -1 if the array contains no numbers", function(test) {
  test.equal(arrays.maxIndex([]), -1);
  test.equal(arrays.maxIndex([null]), -1);
  test.equal(arrays.maxIndex([undefined]), -1);
  test.equal(arrays.maxIndex([NaN]), -1);
  test.equal(arrays.maxIndex([NaN, NaN]), -1);
  test.end();
});

tape("maxIndex(array, f) returns the greatest numeric value for numbers", function(test) {
  test.deepEqual(arrays.maxIndex([1].map(box), unbox), 0);
  test.deepEqual(arrays.maxIndex([5, 1, 2, 3, 4].map(box), unbox), 0);
  test.deepEqual(arrays.maxIndex([20, 3].map(box), unbox), 0);
  test.deepEqual(arrays.maxIndex([3, 20].map(box), unbox), 1);
  test.end();
});

tape("maxIndex(array, f) returns the greatest lexicographic value for strings", function(test) {
  test.deepEqual(arrays.maxIndex(["c", "a", "b"].map(box), unbox), 0);
  test.deepEqual(arrays.maxIndex(["20", "3"].map(box), unbox), 1);
  test.deepEqual(arrays.maxIndex(["3", "20"].map(box), unbox), 0);
  test.end();
});

tape("maxIndex(array, f) ignores null, undefined and NaN", function(test) {
  var o = {valueOf: function() { return NaN; }};
  test.deepEqual(arrays.maxIndex([NaN, 1, 2, 3, 4, 5].map(box), unbox), 5);
  test.deepEqual(arrays.maxIndex([o, 1, 2, 3, 4, 5].map(box), unbox), 5);
  test.deepEqual(arrays.maxIndex([1, 2, 3, 4, 5, NaN].map(box), unbox), 4);
  test.deepEqual(arrays.maxIndex([1, 2, 3, 4, 5, o].map(box), unbox), 4);
  test.deepEqual(arrays.maxIndex([10, null, 3, undefined, 5, NaN].map(box), unbox), 0);
  test.deepEqual(arrays.maxIndex([-1, null, -3, undefined, -5, NaN].map(box), unbox), 0);
  test.end();
});

tape("maxIndex(array, f) compares heterogenous types as numbers", function(test) {
  test.equal(arrays.maxIndex([20, "3"].map(box), unbox), 0);
  test.equal(arrays.maxIndex(["20", 3].map(box), unbox), 0);
  test.equal(arrays.maxIndex([3, "20"].map(box), unbox), 1);
  test.equal(arrays.maxIndex(["3", 20].map(box), unbox), 1);
  test.end();
});

tape("maxIndex(array, f) returns -1 if the array contains no observed values", function(test) {
  test.equal(arrays.maxIndex([].map(box), unbox), -1);
  test.equal(arrays.maxIndex([null].map(box), unbox), -1);
  test.equal(arrays.maxIndex([undefined].map(box), unbox), -1);
  test.equal(arrays.maxIndex([NaN].map(box), unbox), -1);
  test.equal(arrays.maxIndex([NaN, NaN].map(box), unbox), -1);
  test.end();
});

tape("maxIndex(array, f) passes the accessor d, i, and array", function(test) {
  var results = [], array = ["a", "b", "c"];
  arrays.maxIndex(array, function(d, i, array) { results.push([d, i, array]); });
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
  test.end();
});

tape("maxIndex(array, f) uses the global context", function(test) {
  var results = [];
  arrays.maxIndex([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
  test.end();
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

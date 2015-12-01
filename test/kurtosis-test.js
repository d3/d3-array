var tape = require("tape"),
    arrays = require("../");

tape("kurtosis(array) returns the kurtosis of the specified numbers", function(test) {
  test.equal(arrays.kurtosis([6, 2, 1, 3]), 1.5);
  test.equal(arrays.kurtosis([3, 1, 2, 6]), 1.5);
  test.equal(arrays.kurtosis([4, 8, 7, 1]), -1.7);
  test.end();
});

tape("kurtosis(array) ignores null, undefined and NaN", function(test) {
  test.equal(arrays.kurtosis([NaN, 6, 2, 1, 3]), 1.5);
  test.equal(arrays.kurtosis([3, 1, 2, 6, NaN]), 1.5);
  test.equal(arrays.kurtosis([4, null, 8, undefined, 7, NaN, 1]), -1.7);
  test.end();
});

tape("kurtosis(array) can handle large numbers without overflowing", function(test) {
  test.equal(arrays.kurtosis([Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE]), -6);
  test.end();
});

tape("kurtosis(array) returns undefined if the array has fewer than four numbers", function(test) {
  test.equal(arrays.kurtosis([1, 2, 3]), undefined);
  test.equal(arrays.kurtosis([]), undefined);
  test.equal(arrays.kurtosis([null]), undefined);
  test.equal(arrays.kurtosis([undefined]), undefined);
  test.equal(arrays.kurtosis([NaN]), undefined);
  test.equal(arrays.kurtosis([NaN, NaN, NaN, NaN]), undefined);
  test.end();
});

tape("kurtosis(array, f) returns the kurtosis of the specified numbers", function(test) {
  test.equal(arrays.kurtosis([6, 2, 1, 3].map(box), unbox), 1.5);
  test.equal(arrays.kurtosis([3, 1, 2, 6].map(box), unbox), 1.5);
  test.equal(arrays.kurtosis([4, 8, 7, 1].map(box), unbox), -1.7);
  test.end();
});

tape("kurtosis(array, f) ignores null, undefined and NaN", function(test) {
  test.equal(arrays.kurtosis([NaN, 6, 2, 1, 3].map(box), unbox), 1.5);
  test.equal(arrays.kurtosis([3, 1, 2, 6, NaN].map(box), unbox), 1.5);
  test.equal(arrays.kurtosis([4, null, 8, undefined, 7, NaN, 1].map(box), unbox), -1.7);
  test.end();
});

tape("kurtosis(array, f) can handle large numbers without overflowing", function(test) {
  test.equal(arrays.kurtosis([Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE].map(box), unbox), 0);
  test.end();
});

tape("kurtosis(array, f) returns undefined if the array has fewer than four numbers", function(test) {
  test.equal(arrays.kurtosis([1, 2, 3].map(box), unbox), undefined);
  test.equal(arrays.kurtosis([].map(box), unbox), undefined);
  test.equal(arrays.kurtosis([null].map(box), unbox), undefined);
  test.equal(arrays.kurtosis([undefined].map(box), unbox), undefined);
  test.equal(arrays.kurtosis([NaN].map(box), unbox), undefined);
  test.equal(arrays.kurtosis([NaN, NaN, NaN, NaN].map(box), unbox), undefined);
  test.end();
});

tape("kurtosis(array, f) passes the accessor d, i, and array", function(test) {
  var results = [], array = ["a", "b", "c", "d"];
  arrays.kurtosis(array, function(d, i, array) { results.push([d, i, array]); });
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array], ["d", 3, array]]]);
  test.end();
});

tape("kurtosis(array, f) uses the global context", function(test) {
  var results = [];
  arrays.kurtosis([1, 2, 3, 4], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
  test.end();
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

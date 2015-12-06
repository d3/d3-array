var tape = require("tape"),
    arrays = require("../");

require("./inDelta");

tape("skewness(array) returns the skewness of the specified numbers", function(test) {
  test.inDelta(arrays.skewness([1, 1, 1, 10]), 2, 0.05);
  test.inDelta(arrays.skewness([1, 1, 10, 1]), 2, 0.05);
  test.inDelta(arrays.skewness([1, 10, 10, 1]), 0, 0.05);
  test.end();
});

tape("skewness(array) ignores null, undefined and NaN", function(test) {
  test.inDelta(arrays.skewness([NaN, 1, 1, 1, 10]), 2, 0.05);
  test.inDelta(arrays.skewness([1, 1, 10, 1, NaN]), 2, 0.05);
  test.inDelta(arrays.skewness([4, null, 4, undefined, 4, NaN, 1]), -2, 0.05);
  test.end();
});

tape("skewness(array) returns undefined if the array has fewer than three numbers", function(test) {
  test.equal(arrays.skewness([1, 2]), undefined);
  test.equal(arrays.skewness([]), undefined);
  test.equal(arrays.skewness([null]), undefined);
  test.equal(arrays.skewness([undefined]), undefined);
  test.equal(arrays.skewness([NaN]), undefined);
  test.equal(arrays.skewness([NaN, NaN, NaN]), undefined);
  test.end();
});

tape("skewness(array, f) returns the skewness of the specified numbers", function(test) {
  test.inDelta(arrays.skewness([1, 1, 1, 10].map(box), unbox), 2, 0.05);
  test.inDelta(arrays.skewness([1, 1, 10, 1].map(box), unbox), 2, 0.05);
  test.inDelta(arrays.skewness([1, 10, 10, 1].map(box), unbox), 0, 0.05);
  test.end();
});

tape("skewness(array, f) ignores null, undefined and NaN", function(test) {
  test.inDelta(arrays.skewness([NaN, 1, 1, 1, 10].map(box), unbox), 2, 0.05);
  test.inDelta(arrays.skewness([1, 1, 10, 1, NaN].map(box), unbox), 2, 0.05);
  test.inDelta(arrays.skewness([4, null, 4, undefined, 4, NaN, 1].map(box), unbox), -2, 0.05);
  test.end();
});

tape("skewness(array, f) returns undefined if the array has fewer than three numbers", function(test) {
  test.equal(arrays.skewness([1, 2].map(box), unbox), undefined);
  test.equal(arrays.skewness([].map(box), unbox), undefined);
  test.equal(arrays.skewness([null].map(box), unbox), undefined);
  test.equal(arrays.skewness([undefined].map(box), unbox), undefined);
  test.equal(arrays.skewness([NaN].map(box), unbox), undefined);
  test.equal(arrays.skewness([NaN, NaN, NaN].map(box), unbox), undefined);
  test.end();
});

tape("skewness(array, f) passes the accessor d, i, and array", function(test) {
  var results = [], array = ["a", "b", "c"];
  arrays.skewness(array, function(d, i, array) { results.push([d, i, array]); });
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
  test.end();
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

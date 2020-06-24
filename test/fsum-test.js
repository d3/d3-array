var tape = require("tape"),
    arrays = require("../");

tape("new Adder() returns an Adder", function(test) {
  test.equal(typeof new arrays.Adder().add, "function");
  test.equal(typeof new arrays.Adder().valueOf, "function");
  test.end();
});

tape("fsum(array) is an exact sum", function(test) {
  test.equal(arrays.fsum([.1, .1, .1, .1, .1, .1, .1, .1, .1, .1]), 1);
  test.equal(arrays.fsum([.3, .3, .3, .3, .3, .3, .3, .3, .3, .3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3]), 0);
  test.equal(arrays.fsum(["20", "3"].map(box), unbox), 23);
  test.end();
});

tape("fsum(array) returns the fsum of the specified numbers", function(test) {
  test.equal(arrays.fsum([1]), 1);
  test.equal(arrays.fsum([5, 1, 2, 3, 4]), 15);
  test.equal(arrays.fsum([20, 3]), 23);
  test.equal(arrays.fsum([3, 20]), 23);
  test.end();
});

tape("fsum(array) observes values that can be coerced to numbers", function(test) {
  test.equal(arrays.fsum(["20", "3"]), 23);
  test.equal(arrays.fsum(["3", "20"]), 23);
  test.equal(arrays.fsum(["3", 20]), 23);
  test.equal(arrays.fsum([20, "3"]), 23);
  test.equal(arrays.fsum([3, "20"]), 23);
  test.equal(arrays.fsum(["20", 3]), 23);
  test.end();
});

tape("fsum(array) ignores non-numeric values", function(test) {
  test.equal(arrays.fsum(["a", "b", "c"]), 0);
  test.equal(arrays.fsum(["a", 1, "2"]), 3);
  test.end();
});

tape("fsum(array) ignores null, undefined and NaN", function(test) {
  test.equal(arrays.fsum([NaN, 1, 2, 3, 4, 5]), 15);
  test.equal(arrays.fsum([1, 2, 3, 4, 5, NaN]), 15);
  test.equal(arrays.fsum([10, null, 3, undefined, 5, NaN]), 18);
  test.end();
});

tape("fsum(array) returns zero if there are no numbers", function(test) {
  test.equal(arrays.fsum([]), 0);
  test.equal(arrays.fsum([NaN]), 0);
  test.equal(arrays.fsum([undefined]), 0);
  test.equal(arrays.fsum([undefined, NaN]), 0);
  test.equal(arrays.fsum([undefined, NaN, {}]), 0);
  test.end();
});

tape("fsum(array, f) returns the fsum of the specified numbers", function(test) {
  test.equal(arrays.fsum([1].map(box), unbox), 1);
  test.equal(arrays.fsum([5, 1, 2, 3, 4].map(box), unbox), 15);
  test.equal(arrays.fsum([20, 3].map(box), unbox), 23);
  test.equal(arrays.fsum([3, 20].map(box), unbox), 23);
  test.end();
});

tape("fsum(array, f) observes values that can be coerced to numbers", function(test) {
  test.equal(arrays.fsum(["20", "3"].map(box), unbox), 23);
  test.equal(arrays.fsum(["3", "20"].map(box), unbox), 23);
  test.equal(arrays.fsum(["3", 20].map(box), unbox), 23);
  test.equal(arrays.fsum([20, "3"].map(box), unbox), 23);
  test.equal(arrays.fsum([3, "20"].map(box), unbox), 23);
  test.equal(arrays.fsum(["20", 3].map(box), unbox), 23);
  test.end();
});

tape("fsum(array, f) ignores non-numeric values", function(test) {
  test.equal(arrays.fsum(["a", "b", "c"].map(box), unbox), 0);
  test.equal(arrays.fsum(["a", 1, "2"].map(box), unbox), 3);
  test.end();
});

tape("fsum(array, f) ignores null, undefined and NaN", function(test) {
  test.equal(arrays.fsum([NaN, 1, 2, 3, 4, 5].map(box), unbox), 15);
  test.equal(arrays.fsum([1, 2, 3, 4, 5, NaN].map(box), unbox), 15);
  test.equal(arrays.fsum([10, null, 3, undefined, 5, NaN].map(box), unbox), 18);
  test.end();
});

tape("fsum(array, f) returns zero if there are no numbers", function(test) {
  test.equal(arrays.fsum([].map(box), unbox), 0);
  test.equal(arrays.fsum([NaN].map(box), unbox), 0);
  test.equal(arrays.fsum([undefined].map(box), unbox), 0);
  test.equal(arrays.fsum([undefined, NaN].map(box), unbox), 0);
  test.equal(arrays.fsum([undefined, NaN, {}].map(box), unbox), 0);
  test.end();
});

tape("fsum(array, f) passes the accessor d, i, and array", function(test) {
  var results = [], array = ["a", "b", "c"];
  arrays.fsum(array, function(d, i, array) { results.push([d, i, array]); });
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
  test.end();
});

tape("fsum(array, f) uses the global context", function(test) {
  var results = [];
  arrays.fsum([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
  test.end();
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

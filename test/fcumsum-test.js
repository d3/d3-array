const tape = require("tape-await");
const d3 = require("../");

tape("fcumsum(array) returns a Float64Array of the expected length", (test) => {
  const A = [.1, .1, .1, .1, .1, .1, .1, .1, .1, .1];
  const R = d3.cumsum(A);
  test.true(R instanceof Float64Array);
  test.equal(R.length, A.length);
});

tape("fcumsum(array) is an exact cumsum", (test) => {
  test.equal(lastc([.1, .1, .1, .1, .1, .1, .1, .1, .1, .1]), 1);
  test.equal(lastc([.3, .3, .3, .3, .3, .3, .3, .3, .3, .3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3]), 0);
  test.equal(lastc(["20", "3"].map(box), unbox), 23);
});

tape("fcumsum(array) returns the fsum of the specified numbers", (test) => {
  test.equal(lastc([1]), 1);
  test.equal(lastc([5, 1, 2, 3, 4]), 15);
  test.equal(lastc([20, 3]), 23);
  test.equal(lastc([3, 20]), 23);
});

tape("fcumsum(array) observes values that can be coerced to numbers", (test) => {
  test.equal(lastc(["20", "3"]), 23);
  test.equal(lastc(["3", "20"]), 23);
  test.equal(lastc(["3", 20]), 23);
  test.equal(lastc([20, "3"]), 23);
  test.equal(lastc([3, "20"]), 23);
  test.equal(lastc(["20", 3]), 23);
});

tape("fcumsum(array) ignores non-numeric values", (test) => {
  test.equal(lastc(["a", "b", "c"]), 0);
  test.equal(lastc(["a", 1, "2"]), 3);
});

tape("fcumsum(array) ignores null, undefined and NaN", (test) => {
  test.equal(lastc([NaN, 1, 2, 3, 4, 5]), 15);
  test.equal(lastc([1, 2, 3, 4, 5, NaN]), 15);
  test.equal(lastc([10, null, 3, undefined, 5, NaN]), 18);
});

tape("fcumsum(array) returns the an array of zeros if there are no numbers", (test) => {
  test.deepEqual(d3.fcumsum([]), []);
  test.deepEqual(d3.fcumsum([NaN]), [0]);
  test.deepEqual(d3.fcumsum([undefined]), [0]);
  test.deepEqual(d3.fcumsum([undefined, NaN]), [0, 0]);
  test.deepEqual(d3.fcumsum([undefined, NaN, {}]), [0, 0, 0]);
});

tape("fcumsum(array, f) returns the fsum of the specified numbers", (test) => {
  test.equal(lastc([1].map(box), unbox), 1);
  test.equal(lastc([5, 1, 2, 3, 4].map(box), unbox), 15);
  test.equal(lastc([20, 3].map(box), unbox), 23);
  test.equal(lastc([3, 20].map(box), unbox), 23);
});

tape("fcumsum(array, f) observes values that can be coerced to numbers", (test) => {
  test.equal(lastc(["20", "3"].map(box), unbox), 23);
  test.equal(lastc(["3", "20"].map(box), unbox), 23);
  test.equal(lastc(["3", 20].map(box), unbox), 23);
  test.equal(lastc([20, "3"].map(box), unbox), 23);
  test.equal(lastc([3, "20"].map(box), unbox), 23);
  test.equal(lastc(["20", 3].map(box), unbox), 23);
});

tape("fcumsum(array, f) ignores non-numeric values", (test) => {
  test.equal(lastc(["a", "b", "c"].map(box), unbox), 0);
  test.equal(lastc(["a", 1, "2"].map(box), unbox), 3);
});

tape("fcumsum(array, f) ignores null, undefined and NaN", (test) => {
  test.equal(lastc([NaN, 1, 2, 3, 4, 5].map(box), unbox), 15);
  test.equal(lastc([1, 2, 3, 4, 5, NaN].map(box), unbox), 15);
  test.equal(lastc([10, null, 3, undefined, 5, NaN].map(box), unbox), 18);
});

tape("fcumsum(array, f) returns zero if there are no numbers", (test) => {
  test.deepEqual(d3.fcumsum([].map(box), unbox), []);
  test.deepEqual(d3.fcumsum([NaN].map(box), unbox), [0]);
  test.deepEqual(d3.fcumsum([undefined].map(box), unbox), [0]);
  test.deepEqual(d3.fcumsum([undefined, NaN].map(box), unbox), [0, 0]);
  test.deepEqual(d3.fcumsum([undefined, NaN, {}].map(box), unbox), [0, 0, 0]);
});

tape("fcumsum(array, f) passes the accessor d, i, and array", (test) => {
  const results = [];
  const array = ["a", "b", "c"];
  lastc(array, (d, i, array) => results.push([d, i, array]));
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

tape("fcumsum(array, f) uses the global context", (test) => {
  const results = [];
  lastc([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

function lastc(values, valueof) {
  const array = d3.fcumsum(values, valueof);
  return array[array.length -1];
}
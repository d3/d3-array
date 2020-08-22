const tape = require("tape-await");
const d3 = require("../");

tape("variance(array) returns the variance of the specified numbers", (test) => {
  test.equal(d3.variance([5, 1, 2, 3, 4]), 2.5);
  test.equal(d3.variance([20, 3]), 144.5);
  test.equal(d3.variance([3, 20]), 144.5);
});

tape("variance(array) ignores null, undefined and NaN", (test) => {
  test.equal(d3.variance([NaN, 1, 2, 3, 4, 5]), 2.5);
  test.equal(d3.variance([1, 2, 3, 4, 5, NaN]), 2.5);
  test.equal(d3.variance([10, null, 3, undefined, 5, NaN]), 13);
});

tape("variance(array) can handle large numbers without overflowing", (test) => {
  test.equal(d3.variance([Number.MAX_VALUE, Number.MAX_VALUE]), 0);
  test.equal(d3.variance([-Number.MAX_VALUE, -Number.MAX_VALUE]), 0);
});

tape("variance(array) returns undefined if the array has fewer than two numbers", (test) => {
  test.equal(d3.variance([1]), undefined);
  test.equal(d3.variance([]), undefined);
  test.equal(d3.variance([null]), undefined);
  test.equal(d3.variance([undefined]), undefined);
  test.equal(d3.variance([NaN]), undefined);
  test.equal(d3.variance([NaN, NaN]), undefined);
});

tape("variance(array, f) returns the variance of the specified numbers", (test) => {
  test.equal(d3.variance([5, 1, 2, 3, 4].map(box), unbox), 2.5);
  test.equal(d3.variance([20, 3].map(box), unbox), 144.5);
  test.equal(d3.variance([3, 20].map(box), unbox), 144.5);
});

tape("variance(array, f) ignores null, undefined and NaN", (test) => {
  test.equal(d3.variance([NaN, 1, 2, 3, 4, 5].map(box), unbox), 2.5);
  test.equal(d3.variance([1, 2, 3, 4, 5, NaN].map(box), unbox), 2.5);
  test.equal(d3.variance([10, null, 3, undefined, 5, NaN].map(box), unbox), 13);
});

tape("variance(array, f) can handle large numbers without overflowing", (test) => {
  test.equal(d3.variance([Number.MAX_VALUE, Number.MAX_VALUE].map(box), unbox), 0);
  test.equal(d3.variance([-Number.MAX_VALUE, -Number.MAX_VALUE].map(box), unbox), 0);
});

tape("variance(array, f) returns undefined if the array has fewer than two numbers", (test) => {
  test.equal(d3.variance([1].map(box), unbox), undefined);
  test.equal(d3.variance([].map(box), unbox), undefined);
  test.equal(d3.variance([null].map(box), unbox), undefined);
  test.equal(d3.variance([undefined].map(box), unbox), undefined);
  test.equal(d3.variance([NaN].map(box), unbox), undefined);
  test.equal(d3.variance([NaN, NaN].map(box), unbox), undefined);
});

tape("variance(array, f) passes the accessor d, i, and array", (test) => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.variance(array, (d, i, array) => results.push([d, i, array]));
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

tape("variance(array, f) uses the global context", (test) => {
  const results = [];
  d3.variance([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

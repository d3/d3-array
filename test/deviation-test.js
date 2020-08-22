const tape = require("tape-await");
const d3 = require("../");

tape("deviation(array) returns the standard deviation of the specified numbers", (test) => {
  test.equal(d3.deviation([5, 1, 2, 3, 4]), Math.sqrt(2.5));
  test.equal(d3.deviation([20, 3]), Math.sqrt(144.5));
  test.equal(d3.deviation([3, 20]), Math.sqrt(144.5));
});

tape("deviation(array) ignores null, undefined and NaN", (test) => {
  test.equal(d3.deviation([NaN, 1, 2, 3, 4, 5]), Math.sqrt(2.5));
  test.equal(d3.deviation([1, 2, 3, 4, 5, NaN]), Math.sqrt(2.5));
  test.equal(d3.deviation([10, null, 3, undefined, 5, NaN]), Math.sqrt(13));
});

tape("deviation(array) can handle large numbers without overflowing", (test) => {
  test.equal(d3.deviation([Number.MAX_VALUE, Number.MAX_VALUE]), 0);
  test.equal(d3.deviation([-Number.MAX_VALUE, -Number.MAX_VALUE]), 0);
});

tape("deviation(array) returns undefined if the array has fewer than two numbers", (test) => {
  test.equal(d3.deviation([1]), undefined);
  test.equal(d3.deviation([]), undefined);
  test.equal(d3.deviation([null]), undefined);
  test.equal(d3.deviation([undefined]), undefined);
  test.equal(d3.deviation([NaN]), undefined);
  test.equal(d3.deviation([NaN, NaN]), undefined);
});

tape("deviation(array, f) returns the deviation of the specified numbers", (test) => {
  test.equal(d3.deviation([5, 1, 2, 3, 4].map(box), unbox), Math.sqrt(2.5));
  test.equal(d3.deviation([20, 3].map(box), unbox), Math.sqrt(144.5));
  test.equal(d3.deviation([3, 20].map(box), unbox), Math.sqrt(144.5));
});

tape("deviation(array, f) ignores null, undefined and NaN", (test) => {
  test.equal(d3.deviation([NaN, 1, 2, 3, 4, 5].map(box), unbox), Math.sqrt(2.5));
  test.equal(d3.deviation([1, 2, 3, 4, 5, NaN].map(box), unbox), Math.sqrt(2.5));
  test.equal(d3.deviation([10, null, 3, undefined, 5, NaN].map(box), unbox), Math.sqrt(13));
});

tape("deviation(array, f) can handle large numbers without overflowing", (test) => {
  test.equal(d3.deviation([Number.MAX_VALUE, Number.MAX_VALUE].map(box), unbox), 0);
  test.equal(d3.deviation([-Number.MAX_VALUE, -Number.MAX_VALUE].map(box), unbox), 0);
});

tape("deviation(array, f) returns undefined if the array has fewer than two numbers", (test) => {
  test.equal(d3.deviation([1].map(box), unbox), undefined);
  test.equal(d3.deviation([].map(box), unbox), undefined);
  test.equal(d3.deviation([null].map(box), unbox), undefined);
  test.equal(d3.deviation([undefined].map(box), unbox), undefined);
  test.equal(d3.deviation([NaN].map(box), unbox), undefined);
  test.equal(d3.deviation([NaN, NaN].map(box), unbox), undefined);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

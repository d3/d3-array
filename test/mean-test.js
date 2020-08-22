const tape = require("tape-await");
const d3 = require("../");
const OneTimeNumber = require("./OneTimeNumber");

tape("mean(array) returns the mean value for numbers", (test) => {
  test.equal(d3.mean([1]), 1);
  test.equal(d3.mean([5, 1, 2, 3, 4]), 3);
  test.equal(d3.mean([20, 3]), 11.5);
  test.equal(d3.mean([3, 20]), 11.5);
});

tape("mean(array) ignores null, undefined and NaN", (test) => {
  test.equal(d3.mean([NaN, 1, 2, 3, 4, 5]), 3);
  test.equal(d3.mean([1, 2, 3, 4, 5, NaN]), 3);
  test.equal(d3.mean([10, null, 3, undefined, 5, NaN]), 6);
});

tape("mean(array) returns undefined if the array contains no observed values", (test) => {
  test.equal(d3.mean([]), undefined);
  test.equal(d3.mean([null]), undefined);
  test.equal(d3.mean([undefined]), undefined);
  test.equal(d3.mean([NaN]), undefined);
  test.equal(d3.mean([NaN, NaN]), undefined);
});

tape("mean(array) coerces values to numbers", (test) => {
  test.equal(d3.mean(["1"]), 1);
  test.equal(d3.mean(["5", "1", "2", "3", "4"]), 3);
  test.equal(d3.mean(["20", "3"]), 11.5);
  test.equal(d3.mean(["3", "20"]), 11.5);
});

tape("mean(array) coerces values exactly once", (test) => {
  const numbers = [1, new OneTimeNumber(3)];
  test.equal(d3.mean(numbers), 2);
  test.equal(d3.mean(numbers), 1);
});

tape("mean(array, f) returns the mean value for numbers", (test) => {
  test.equal(d3.mean([1].map(box), unbox), 1);
  test.equal(d3.mean([5, 1, 2, 3, 4].map(box), unbox), 3);
  test.equal(d3.mean([20, 3].map(box), unbox), 11.5);
  test.equal(d3.mean([3, 20].map(box), unbox), 11.5);
});

tape("mean(array, f) ignores null, undefined and NaN", (test) => {
  test.equal(d3.mean([NaN, 1, 2, 3, 4, 5].map(box), unbox), 3);
  test.equal(d3.mean([1, 2, 3, 4, 5, NaN].map(box), unbox), 3);
  test.equal(d3.mean([10, null, 3, undefined, 5, NaN].map(box), unbox), 6);
});

tape("mean(array, f) returns undefined if the array contains no observed values", (test) => {
  test.equal(d3.mean([].map(box), unbox), undefined);
  test.equal(d3.mean([null].map(box), unbox), undefined);
  test.equal(d3.mean([undefined].map(box), unbox), undefined);
  test.equal(d3.mean([NaN].map(box), unbox), undefined);
  test.equal(d3.mean([NaN, NaN].map(box), unbox), undefined);
});

tape("mean(array, f) coerces values to numbers", (test) => {
  test.equal(d3.mean(["1"].map(box), unbox), 1);
  test.equal(d3.mean(["5", "1", "2", "3", "4"].map(box), unbox), 3);
  test.equal(d3.mean(["20", "3"].map(box), unbox), 11.5);
  test.equal(d3.mean(["3", "20"].map(box), unbox), 11.5);
});

tape("mean(array, f) coerces values exactly once", (test) => {
  const numbers = [1, new OneTimeNumber(3)].map(box);
  test.equal(d3.mean(numbers, unbox), 2);
  test.equal(d3.mean(numbers, unbox), 1);
});

tape("mean(array, f) passes the accessor d, i, and array", (test) => {
  const results = [];
  const strings = ["a", "b", "c"];
  d3.mean(strings, (d, i, array) => results.push([d, i, array]));
  test.deepEqual(results, [["a", 0, strings], ["b", 1, strings], ["c", 2, strings]]);
});

tape("mean(array, f) uses the global context", (test) => {
  const results = [];
  d3.mean([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

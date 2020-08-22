const tape = require("tape-await");
const d3 = require("../");
const OneTimeNumber = require("./OneTimeNumber");

tape("median(array) returns the median value for numbers", (test) => {
  test.equal(d3.median([1]), 1);
  test.equal(d3.median([5, 1, 2, 3]), 2.5);
  test.equal(d3.median([5, 1, 2, 3, 4]), 3);
  test.equal(d3.median([20, 3]), 11.5);
  test.equal(d3.median([3, 20]), 11.5);
});

tape("median(array) ignores null, undefined and NaN", (test) => {
  test.equal(d3.median([NaN, 1, 2, 3, 4, 5]), 3);
  test.equal(d3.median([1, 2, 3, 4, 5, NaN]), 3);
  test.equal(d3.median([10, null, 3, undefined, 5, NaN]), 5);
});

tape("median(array) can handle large numbers without overflowing", (test) => {
  test.equal(d3.median([Number.MAX_VALUE, Number.MAX_VALUE]), Number.MAX_VALUE);
  test.equal(d3.median([-Number.MAX_VALUE, -Number.MAX_VALUE]), -Number.MAX_VALUE);
});

tape("median(array) returns undefined if the array contains no observed values", (test) => {
  test.equal(d3.median([]), undefined);
  test.equal(d3.median([null]), undefined);
  test.equal(d3.median([undefined]), undefined);
  test.equal(d3.median([NaN]), undefined);
  test.equal(d3.median([NaN, NaN]), undefined);
});

tape("median(array) coerces strings to numbers", (test) => {
  test.equal(d3.median(["1"]), 1);
  test.equal(d3.median(["5", "1", "2", "3", "4"]), 3);
  test.equal(d3.median(["20", "3"]), 11.5);
  test.equal(d3.median(["3", "20"]), 11.5);
  test.equal(d3.median(["2", "3", "20"]), 3);
  test.equal(d3.median(["20", "3", "2"]), 3);
});

tape("median(array) coerces values exactly once", (test) => {
  const array = [1, new OneTimeNumber(3)];
  test.equal(d3.median(array), 2);
  test.equal(d3.median(array), 1);
});

tape("median(array, f) returns the median value for numbers", (test) => {
  test.equal(d3.median([1].map(box), unbox), 1);
  test.equal(d3.median([5, 1, 2, 3, 4].map(box), unbox), 3);
  test.equal(d3.median([20, 3].map(box), unbox), 11.5);
  test.equal(d3.median([3, 20].map(box), unbox), 11.5);
});

tape("median(array, f) ignores null, undefined and NaN", (test) => {
  test.equal(d3.median([NaN, 1, 2, 3, 4, 5].map(box), unbox), 3);
  test.equal(d3.median([1, 2, 3, 4, 5, NaN].map(box), unbox), 3);
  test.equal(d3.median([10, null, 3, undefined, 5, NaN].map(box), unbox), 5);
});

tape("median(array, f) can handle large numbers without overflowing", (test) => {
  test.equal(d3.median([Number.MAX_VALUE, Number.MAX_VALUE].map(box), unbox), Number.MAX_VALUE);
  test.equal(d3.median([-Number.MAX_VALUE, -Number.MAX_VALUE].map(box), unbox), -Number.MAX_VALUE);
});

tape("median(array, f) returns undefined if the array contains no observed values", (test) => {
  test.equal(d3.median([].map(box), unbox), undefined);
  test.equal(d3.median([null].map(box), unbox), undefined);
  test.equal(d3.median([undefined].map(box), unbox), undefined);
  test.equal(d3.median([NaN].map(box), unbox), undefined);
  test.equal(d3.median([NaN, NaN].map(box), unbox), undefined);
});

tape("median(array, f) coerces strings to numbers", (test) => {
  test.equal(d3.median(["1"].map(box), unbox), 1);
  test.equal(d3.median(["5", "1", "2", "3", "4"].map(box), unbox), 3);
  test.equal(d3.median(["20", "3"].map(box), unbox), 11.5);
  test.equal(d3.median(["3", "20"].map(box), unbox), 11.5);
  test.equal(d3.median(["2", "3", "20"].map(box), unbox), 3);
  test.equal(d3.median(["20", "3", "2"].map(box), unbox), 3);
});

tape("median(array, f) coerces values exactly once", (test) => {
  const array = [1, new OneTimeNumber(3)].map(box);
  test.equal(d3.median(array, unbox), 2);
  test.equal(d3.median(array, unbox), 1);
});

tape("median(array, f) passes the accessor d, i, and array", (test) => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.median(array, (d, i, array) => results.push([d, i, array]));
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

tape("median(array, f) uses the global context", (test) => {
  const results = [];
  d3.median([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

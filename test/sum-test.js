const tape = require("tape-await");
const d3 = require("../");

tape("sum(array) returns the sum of the specified numbers", (test) => {
  test.equal(d3.sum([1]), 1);
  test.equal(d3.sum([5, 1, 2, 3, 4]), 15);
  test.equal(d3.sum([20, 3]), 23);
  test.equal(d3.sum([3, 20]), 23);
});

tape("sum(array) observes values that can be coerced to numbers", (test) => {
  test.equal(d3.sum(["20", "3"]), 23);
  test.equal(d3.sum(["3", "20"]), 23);
  test.equal(d3.sum(["3", 20]), 23);
  test.equal(d3.sum([20, "3"]), 23);
  test.equal(d3.sum([3, "20"]), 23);
  test.equal(d3.sum(["20", 3]), 23);
});

tape("sum(array) ignores non-numeric values", (test) => {
  test.equal(d3.sum(["a", "b", "c"]), 0);
  test.equal(d3.sum(["a", 1, "2"]), 3);
});

tape("sum(array) ignores null, undefined and NaN", (test) => {
  test.equal(d3.sum([NaN, 1, 2, 3, 4, 5]), 15);
  test.equal(d3.sum([1, 2, 3, 4, 5, NaN]), 15);
  test.equal(d3.sum([10, null, 3, undefined, 5, NaN]), 18);
});

tape("sum(array) returns zero if there are no numbers", (test) => {
  test.equal(d3.sum([]), 0);
  test.equal(d3.sum([NaN]), 0);
  test.equal(d3.sum([undefined]), 0);
  test.equal(d3.sum([undefined, NaN]), 0);
  test.equal(d3.sum([undefined, NaN, {}]), 0);
});

tape("sum(array, f) returns the sum of the specified numbers", (test) => {
  test.equal(d3.sum([1].map(box), unbox), 1);
  test.equal(d3.sum([5, 1, 2, 3, 4].map(box), unbox), 15);
  test.equal(d3.sum([20, 3].map(box), unbox), 23);
  test.equal(d3.sum([3, 20].map(box), unbox), 23);
});

tape("sum(array, f) observes values that can be coerced to numbers", (test) => {
  test.equal(d3.sum(["20", "3"].map(box), unbox), 23);
  test.equal(d3.sum(["3", "20"].map(box), unbox), 23);
  test.equal(d3.sum(["3", 20].map(box), unbox), 23);
  test.equal(d3.sum([20, "3"].map(box), unbox), 23);
  test.equal(d3.sum([3, "20"].map(box), unbox), 23);
  test.equal(d3.sum(["20", 3].map(box), unbox), 23);
});

tape("sum(array, f) ignores non-numeric values", (test) => {
  test.equal(d3.sum(["a", "b", "c"].map(box), unbox), 0);
  test.equal(d3.sum(["a", 1, "2"].map(box), unbox), 3);
});

tape("sum(array, f) ignores null, undefined and NaN", (test) => {
  test.equal(d3.sum([NaN, 1, 2, 3, 4, 5].map(box), unbox), 15);
  test.equal(d3.sum([1, 2, 3, 4, 5, NaN].map(box), unbox), 15);
  test.equal(d3.sum([10, null, 3, undefined, 5, NaN].map(box), unbox), 18);
});

tape("sum(array, f) returns zero if there are no numbers", (test) => {
  test.equal(d3.sum([].map(box), unbox), 0);
  test.equal(d3.sum([NaN].map(box), unbox), 0);
  test.equal(d3.sum([undefined].map(box), unbox), 0);
  test.equal(d3.sum([undefined, NaN].map(box), unbox), 0);
  test.equal(d3.sum([undefined, NaN, {}].map(box), unbox), 0);
});

tape("sum(array, f) passes the accessor d, i, and array", (test) => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.sum(array, (d, i, array) => results.push([d, i, array]));
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

tape("sum(array, f) uses the global context", (test) => {
  const results = [];
  d3.sum([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

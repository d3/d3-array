const tape = require("tape-await");
const d3 = require("../");

tape("mode(array) returns the most frequent value for numbers", (test) => {
  test.strictEqual(d3.mode([1]), 1);
  test.strictEqual(d3.mode([5, 1, 1, 3, 4]), 1);
});

tape("mode(array) returns the most frequent value for strings", (test) => {
  test.strictEqual(d3.mode(["1"]), "1");
  test.strictEqual(d3.mode(["5", "1", "1", "3", "4"]), "1");
});

tape("mode(array) returns the most frequent value for heterogenous types", (test) => {
  test.strictEqual(d3.mode(["1"]), "1");
  test.strictEqual(d3.mode(["5", "1", "1", 2, 2, "2", 1, 1, 1, "3", "4"]), 1);
});

tape("mode(array) returns the first of the most frequent values", (test) => {
  test.strictEqual(d3.mode(["5", "1", "1", "2", "2", "3", "4"]), "1");
});

tape("mode(array) ignores null, undefined and NaN", (test) => {
  const o = {valueOf: () => NaN};
  test.strictEqual(d3.mode([NaN, 1, 1, 3, 4, 5]), 1);
  test.strictEqual(d3.mode([o, 1, null, null, 1, null]), 1);
  test.strictEqual(d3.mode([1, NaN, NaN, 1, 5, NaN]), 1);
  test.strictEqual(d3.mode([1, o, o, 1, 5, o]), 1);
  test.strictEqual(d3.mode([1, undefined, undefined, 1, 5, undefined]), 1);
});

tape("mode(array) returns undefined if the array contains no comparable values", (test) => {
  test.strictEqual(d3.mode([]), undefined);
  test.strictEqual(d3.mode([null]), undefined);
  test.strictEqual(d3.mode([undefined]), undefined);
  test.strictEqual(d3.mode([NaN]), undefined);
  test.strictEqual(d3.mode([NaN, NaN]), undefined);
});

tape("mode(array, f) returns the most frequent value for numbers", (test) => {
  test.strictEqual(d3.mode([1].map(box), unbox), 1);
  test.strictEqual(d3.mode([5, 1, 1, 3, 4].map(box), unbox), 1);
});

tape("mode(array, f) returns the most frequent value for strings", (test) => {
  test.strictEqual(d3.mode(["1"].map(box), unbox), "1");
  test.strictEqual(d3.mode(["5", "1", "1", "3", "4"].map(box), unbox), "1");
});

tape("mode(array, f) returns the most frequent value for heterogenous types", (test) => {
  test.strictEqual(d3.mode(["1"].map(box), unbox), "1");
  test.strictEqual(d3.mode(["5", "1", "1", 2, 2, "2", 1, 1, 1, "3", "4"].map(box), unbox), 1);
});

tape("mode(array, f) returns the first of the most frequent values", (test) => {
  test.strictEqual(d3.mode(["5", "1", "1", "2", "2", "3", "4"].map(box), unbox), "1");
});

tape("mode(array, f) ignores null, undefined and NaN", (test) => {
  const o = {valueOf: () => NaN};
  test.strictEqual(d3.mode([NaN, 1, 1, 3, 4, 5].map(box), unbox), 1);
  test.strictEqual(d3.mode([o, 1, null, null, 1, null].map(box), unbox), 1);
  test.strictEqual(d3.mode([1, NaN, NaN, 1, 5, NaN].map(box), unbox), 1);
  test.strictEqual(d3.mode([1, o, o, 1, 5, o].map(box), unbox), 1);
  test.strictEqual(d3.mode([1, undefined, undefined, 1, 5, undefined].map(box), unbox), 1);
});

tape("mode(array, f) returns undefined if the array contains no comparable values", (test) => {
  test.strictEqual(d3.mode([].map(box), unbox), undefined);
  test.strictEqual(d3.mode([null].map(box), unbox), undefined);
  test.strictEqual(d3.mode([undefined].map(box), unbox), undefined);
  test.strictEqual(d3.mode([NaN].map(box), unbox), undefined);
  test.strictEqual(d3.mode([NaN, NaN].map(box), unbox), undefined);
});

tape("mode(array, f) passes the accessor d, i, and array", (test) => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.mode(array, (d, i, array) => results.push([d, i, array]));
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

tape("mode(array, f) uses the global context", (test) => {
  const results = [];
  d3.mode([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

const tape = require("tape-await");
const d3 = require("../");

tape("new Adder() returns an Adder", (test) => {
  test.equal(typeof new d3.Adder().add, "function");
  test.equal(typeof new d3.Adder().valueOf, "function");
});

tape("+adder can be applied several times", (test) => {
  const adder = new d3.Adder();
  for (let i = 0; i < 10; ++i) adder.add(0.1);
  test.equal(+adder, 1);
  test.equal(+adder, 1);
});

tape("fsum(array) is an exact sum", (test) => {
  test.equal(d3.fsum([.1, .1, .1, .1, .1, .1, .1, .1, .1, .1]), 1);
  test.equal(d3.fsum([.3, .3, .3, .3, .3, .3, .3, .3, .3, .3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3]), 0);
  test.equal(d3.fsum(["20", "3"].map(box), unbox), 23);
});

tape("fsum(array) returns the fsum of the specified numbers", (test) => {
  test.equal(d3.fsum([1]), 1);
  test.equal(d3.fsum([5, 1, 2, 3, 4]), 15);
  test.equal(d3.fsum([20, 3]), 23);
  test.equal(d3.fsum([3, 20]), 23);
});

tape("fsum(array) observes values that can be coerced to numbers", (test) => {
  test.equal(d3.fsum(["20", "3"]), 23);
  test.equal(d3.fsum(["3", "20"]), 23);
  test.equal(d3.fsum(["3", 20]), 23);
  test.equal(d3.fsum([20, "3"]), 23);
  test.equal(d3.fsum([3, "20"]), 23);
  test.equal(d3.fsum(["20", 3]), 23);
});

tape("fsum(array) ignores non-numeric values", (test) => {
  test.equal(d3.fsum(["a", "b", "c"]), 0);
  test.equal(d3.fsum(["a", 1, "2"]), 3);
});

tape("fsum(array) ignores null, undefined and NaN", (test) => {
  test.equal(d3.fsum([NaN, 1, 2, 3, 4, 5]), 15);
  test.equal(d3.fsum([1, 2, 3, 4, 5, NaN]), 15);
  test.equal(d3.fsum([10, null, 3, undefined, 5, NaN]), 18);
});

tape("fsum(array) returns zero if there are no numbers", (test) => {
  test.equal(d3.fsum([]), 0);
  test.equal(d3.fsum([NaN]), 0);
  test.equal(d3.fsum([undefined]), 0);
  test.equal(d3.fsum([undefined, NaN]), 0);
  test.equal(d3.fsum([undefined, NaN, {}]), 0);
});

tape("fsum(array, f) returns the fsum of the specified numbers", (test) => {
  test.equal(d3.fsum([1].map(box), unbox), 1);
  test.equal(d3.fsum([5, 1, 2, 3, 4].map(box), unbox), 15);
  test.equal(d3.fsum([20, 3].map(box), unbox), 23);
  test.equal(d3.fsum([3, 20].map(box), unbox), 23);
});

tape("fsum(array, f) observes values that can be coerced to numbers", (test) => {
  test.equal(d3.fsum(["20", "3"].map(box), unbox), 23);
  test.equal(d3.fsum(["3", "20"].map(box), unbox), 23);
  test.equal(d3.fsum(["3", 20].map(box), unbox), 23);
  test.equal(d3.fsum([20, "3"].map(box), unbox), 23);
  test.equal(d3.fsum([3, "20"].map(box), unbox), 23);
  test.equal(d3.fsum(["20", 3].map(box), unbox), 23);
});

tape("fsum(array, f) ignores non-numeric values", (test) => {
  test.equal(d3.fsum(["a", "b", "c"].map(box), unbox), 0);
  test.equal(d3.fsum(["a", 1, "2"].map(box), unbox), 3);
});

tape("fsum(array, f) ignores null, undefined and NaN", (test) => {
  test.equal(d3.fsum([NaN, 1, 2, 3, 4, 5].map(box), unbox), 15);
  test.equal(d3.fsum([1, 2, 3, 4, 5, NaN].map(box), unbox), 15);
  test.equal(d3.fsum([10, null, 3, undefined, 5, NaN].map(box), unbox), 18);
});

tape("fsum(array, f) returns zero if there are no numbers", (test) => {
  test.equal(d3.fsum([].map(box), unbox), 0);
  test.equal(d3.fsum([NaN].map(box), unbox), 0);
  test.equal(d3.fsum([undefined].map(box), unbox), 0);
  test.equal(d3.fsum([undefined, NaN].map(box), unbox), 0);
  test.equal(d3.fsum([undefined, NaN, {}].map(box), unbox), 0);
});

tape("fsum(array, f) passes the accessor d, i, and array", (test) => {
  const results = [];
  const array = ["a", "b", "c"];
  d3.fsum(array, (d, i, array) => results.push([d, i, array]));
  test.deepEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

tape("fsum(array, f) uses the global context", (test) => {
  const results = [];
  d3.fsum([1, 2], function() { results.push(this); });
  test.deepEqual(results, [global, global]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

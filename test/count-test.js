const tape = require("tape-await");
const d3 = require("../");

tape("count() accepts an iterable", (test) => {
  test.deepEqual(d3.count([1, 2]), 2);
  test.deepEqual(d3.count(new Set([1, 2])), 2);
  test.deepEqual(d3.count(generate(1, 2)), 2);
});

tape("count() ignores NaN, null", (test) => {
  test.deepEqual(d3.count([NaN, null, 0, 1]), 2);
});

tape("count() coerces to a number", (test) => {
  test.deepEqual(d3.count(["1", " 2", "Fred"]), 2);
});

tape("count() accepts an accessor", (test) => {
  test.deepEqual(d3.count([{v:NaN}, {}, {v:0}, {v:1}], d => d.v), 2);
  test.deepEqual(d3.count([{n: "Alice", age: NaN}, {n: "Bob", age: 18}, {n: "Other"}], d => d.age), 1);
});

function* generate(...values) {
  yield* values;
}

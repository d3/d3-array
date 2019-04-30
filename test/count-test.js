var tape = require("tape"),
    arrays = require("../");

tape("count() accepts an iterable", function(test) {
  test.deepEqual(arrays.count([1,2]), 2);
  test.deepEqual(arrays.count(new Set([1,2])), 2);
  test.deepEqual(arrays.count(generate(1,2)), 2);
  test.end();
});

tape("count() ignores NaN, null", function(test) {
  test.deepEqual(arrays.count([NaN,null,0,1]), 2);
  test.end();
});

tape("count() accepts an accessor", function(test) {
  test.deepEqual(arrays.count([{v:NaN},{},{v:0},{v:1}], d => d.v), 2);
    test.deepEqual(arrays.count([{n: "Alice", age: NaN}, {n: "Bob", age: 18}, {n: "Other"}], d => d.age), 1);
  test.end();
});

function* generate(...values) {
  yield* values;
}

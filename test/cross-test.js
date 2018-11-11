var tape = require("tape"),
    arrays = require("../");

tape("cross() returns an empty array", function(test) {
  test.deepEqual(arrays.cross(), []);
  test.end();
});

tape("cross([]) returns an empty array", function(test) {
  test.deepEqual(arrays.cross([]), []);
  test.end();
});

tape("cross([1, 2], []) returns an empty array", function(test) {
  test.deepEqual(arrays.cross([1, 2], []), []);
  test.end();
});

tape("cross(a, b) returns Cartesian product a×b", function(test) {
  test.deepEqual(arrays.cross([1, 2], ["x", "y"]), [[1, "x"], [1, "y"], [2, "x"], [2, "y"]]);
  test.end();
});

tape("cross(a, b, c) returns Cartesian product a×b×c", function(test) {
  test.deepEqual(arrays.cross([1, 2], [3, 4], [5, 6, 7]), [
    [1, 3, 5],
    [1, 3, 6],
    [1, 3, 7],
    [1, 4, 5],
    [1, 4, 6],
    [1, 4, 7],
    [2, 3, 5],
    [2, 3, 6],
    [2, 3, 7],
    [2, 4, 5],
    [2, 4, 6],
    [2, 4, 7]
  ]);
  test.end();
});

tape("cross(a, b, f) invokes the specified function for each pair", function(test) {
  test.deepEqual(arrays.cross([1, 2], ["x", "y"], (a, b) => a + b), ["1x", "1y", "2x", "2y"]);
  test.end();
});

tape("cross(a, b, c, f) invokes the specified function for each triple", function(test) {
  test.deepEqual(arrays.cross([1, 2], [3, 4], [5, 6, 7], (a, b, c) => a + b + c), [9, 10, 11, 10, 11, 12, 10, 11, 12, 11, 12, 13]);
  test.end();
});

tape("cross(a, b) returns Cartesian product a×b of generators", function(test) {
  test.deepEqual(arrays.cross(generate(1, 2), generate("x", "y")), [[1, "x"], [1, "y"], [2, "x"], [2, "y"]]);
  test.end();
});

function* generate(...values) {
  yield* values;
}

var tape = require("tape"),
    arrays = require("../");

tape("cross(a, b) returns Cartesian product a×b", function(test) {
  test.deepEqual(arrays.cross([1, 2], ["x", "y"]), [[1, "x"], [1, "y"], [2, "x"], [2, "y"]]);
  test.end();
});

tape("cross(a, b, f) invokes the specified function for each pair", function(test) {
  test.deepEqual(arrays.cross([1, 2], ["x", "y"], (a, b) => a + b), ["1x", "1y", "2x", "2y"]);
  test.end();
});

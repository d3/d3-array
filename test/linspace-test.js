var tape = require("tape"),
    arrays = require("../");

tape("linspace(start, stop)", function(test) {
  test.deepEqual(arrays.linspace(0, 49), [
     0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49
  ]);
  test.end();
});

tape("linspace(start, stop, n)", function(test) {
  test.deepEqual(arrays.linspace(2, 3, 5), [2, 2.25, 2.5, 2.75, 3]);
  test.end();
});

tape("linspace(start, stop, n, false)", function(test) {
  test.deepEqual(arrays.linspace(2, 3, 5, false), [2, 2.2, 2.4, 2.6, 2.8]);
  test.end();
});

tape("linspace(start, stop, n) descending", function(test) {
  test.deepEqual(arrays.linspace(5, 1, 5), [5, 4, 3, 2, 1]);
  test.deepEqual(arrays.linspace(5, 0, 5, false), [5, 4, 3, 2, 1]);
  test.end();
});

const tape = require("tape-await");
const array = require("../");

tape("ticks(start, stop, count) returns the empty array if any argument is NaN", (test) => {
  test.deepEqual(array.ticks(NaN, 1, 1), []);
  test.deepEqual(array.ticks(0, NaN, 1), []);
  test.deepEqual(array.ticks(0, 1, NaN), []);
  test.deepEqual(array.ticks(NaN, NaN, 1), []);
  test.deepEqual(array.ticks(0, NaN, NaN), []);
  test.deepEqual(array.ticks(NaN, 1, NaN), []);
  test.deepEqual(array.ticks(NaN, NaN, NaN), []);
});

tape("ticks(start, stop, count) returns the empty array if start === stop and count is non-positive", (test) => {
  test.deepEqual(array.ticks(1, 1, -1), []);
  test.deepEqual(array.ticks(1, 1, 0), []);
  test.deepEqual(array.ticks(1, 1, NaN), []);
});

tape("ticks(start, stop, count) returns the empty array if start === stop and count is positive", (test) => {
  test.deepEqual(array.ticks(1, 1, 1), [1]);
  test.deepEqual(array.ticks(1, 1, 10), [1]);
});

tape("ticks(start, stop, count) returns the empty array if count is not positive", (test) => {
  test.deepEqual(array.ticks(0, 1, 0), []);
  test.deepEqual(array.ticks(0, 1, -1), []);
  test.deepEqual(array.ticks(0, 1, NaN), []);
});

tape("ticks(start, stop, count) returns the empty array if count is infinity", (test) => {
  test.deepEqual(array.ticks(0, 1, Infinity), []);
});

tape("ticks(start, stop, count) does not include negative zero", (test) => {
  test.equal(1 / array.ticks(-1, 0, 5).pop(), Infinity);
});

tape("ticks(start, stop, count) remains within the domain", (test) => {
  test.deepEqual(array.ticks(0, 2.2, 3), [0, 1, 2]);
});

tape("ticks(start, stop, count) returns approximately count + 1 ticks when start < stop", (test) => {
  test.deepEqual(array.ticks(  0,  1, 10), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  test.deepEqual(array.ticks(  0,  1,  9), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  test.deepEqual(array.ticks(  0,  1,  8), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  test.deepEqual(array.ticks(  0,  1,  7), [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  test.deepEqual(array.ticks(  0,  1,  6), [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  test.deepEqual(array.ticks(  0,  1,  5), [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  test.deepEqual(array.ticks(  0,  1,  4), [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  test.deepEqual(array.ticks(  0,  1,  3), [0.0,                     0.5,                     1.0]);
  test.deepEqual(array.ticks(  0,  1,  2), [0.0,                     0.5,                     1.0]);
  test.deepEqual(array.ticks(  0,  1,  1), [0.0,                                              1.0]);
  test.deepEqual(array.ticks(  0, 10, 10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  test.deepEqual(array.ticks(  0, 10,  9), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  test.deepEqual(array.ticks(  0, 10,  8), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  test.deepEqual(array.ticks(  0, 10,  7), [0,    2,    4,    6,    8,    10]);
  test.deepEqual(array.ticks(  0, 10,  6), [0,    2,    4,    6,    8,    10]);
  test.deepEqual(array.ticks(  0, 10,  5), [0,    2,    4,    6,    8,    10]);
  test.deepEqual(array.ticks(  0, 10,  4), [0,    2,    4,    6,    8,    10]);
  test.deepEqual(array.ticks(  0, 10,  3), [0,             5,             10]);
  test.deepEqual(array.ticks(  0, 10,  2), [0,             5,             10]);
  test.deepEqual(array.ticks(  0, 10,  1), [0,                            10]);
  test.deepEqual(array.ticks(-10, 10, 10), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  test.deepEqual(array.ticks(-10, 10,  9), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  test.deepEqual(array.ticks(-10, 10,  8), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  test.deepEqual(array.ticks(-10, 10,  7), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  test.deepEqual(array.ticks(-10, 10,  6), [-10,       -5,       0,      5,     10]);
  test.deepEqual(array.ticks(-10, 10,  5), [-10,       -5,       0,      5,     10]);
  test.deepEqual(array.ticks(-10, 10,  4), [-10,       -5,       0,      5,     10]);
  test.deepEqual(array.ticks(-10, 10,  3), [-10,       -5,       0,      5,     10]);
  test.deepEqual(array.ticks(-10, 10,  2), [-10,                 0,             10]);
  test.deepEqual(array.ticks(-10, 10,  1), [                     0,               ]);
});

tape("ticks(start, stop, count) returns the reverse of ticks(stop, start, count)", (test) => {
  test.deepEqual(array.ticks( 1,   0, 10), array.ticks(  0,  1, 10).reverse());
  test.deepEqual(array.ticks( 1,   0,  9), array.ticks(  0,  1,  9).reverse());
  test.deepEqual(array.ticks( 1,   0,  8), array.ticks(  0,  1,  8).reverse());
  test.deepEqual(array.ticks( 1,   0,  7), array.ticks(  0,  1,  7).reverse());
  test.deepEqual(array.ticks( 1,   0,  6), array.ticks(  0,  1,  6).reverse());
  test.deepEqual(array.ticks( 1,   0,  5), array.ticks(  0,  1,  5).reverse());
  test.deepEqual(array.ticks( 1,   0,  4), array.ticks(  0,  1,  4).reverse());
  test.deepEqual(array.ticks( 1,   0,  3), array.ticks(  0,  1,  3).reverse());
  test.deepEqual(array.ticks( 1,   0,  2), array.ticks(  0,  1,  2).reverse());
  test.deepEqual(array.ticks( 1,   0,  1), array.ticks(  0,  1,  1).reverse());
  test.deepEqual(array.ticks(10,   0, 10), array.ticks(  0, 10, 10).reverse());
  test.deepEqual(array.ticks(10,   0,  9), array.ticks(  0, 10,  9).reverse());
  test.deepEqual(array.ticks(10,   0,  8), array.ticks(  0, 10,  8).reverse());
  test.deepEqual(array.ticks(10,   0,  7), array.ticks(  0, 10,  7).reverse());
  test.deepEqual(array.ticks(10,   0,  6), array.ticks(  0, 10,  6).reverse());
  test.deepEqual(array.ticks(10,   0,  5), array.ticks(  0, 10,  5).reverse());
  test.deepEqual(array.ticks(10,   0,  4), array.ticks(  0, 10,  4).reverse());
  test.deepEqual(array.ticks(10,   0,  3), array.ticks(  0, 10,  3).reverse());
  test.deepEqual(array.ticks(10,   0,  2), array.ticks(  0, 10,  2).reverse());
  test.deepEqual(array.ticks(10,   0,  1), array.ticks(  0, 10,  1).reverse());
  test.deepEqual(array.ticks(10, -10, 10), array.ticks(-10, 10, 10).reverse());
  test.deepEqual(array.ticks(10, -10,  9), array.ticks(-10, 10,  9).reverse());
  test.deepEqual(array.ticks(10, -10,  8), array.ticks(-10, 10,  8).reverse());
  test.deepEqual(array.ticks(10, -10,  7), array.ticks(-10, 10,  7).reverse());
  test.deepEqual(array.ticks(10, -10,  6), array.ticks(-10, 10,  6).reverse());
  test.deepEqual(array.ticks(10, -10,  5), array.ticks(-10, 10,  5).reverse());
  test.deepEqual(array.ticks(10, -10,  4), array.ticks(-10, 10,  4).reverse());
  test.deepEqual(array.ticks(10, -10,  3), array.ticks(-10, 10,  3).reverse());
  test.deepEqual(array.ticks(10, -10,  2), array.ticks(-10, 10,  2).reverse());
  test.deepEqual(array.ticks(10, -10,  1), array.ticks(-10, 10,  1).reverse());
});

tape("ticks(start, stop, count) handles precision problems", (test) => {
  test.deepEqual(array.ticks(0.98, 1.14, 10), [0.98, 1, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14]);
});

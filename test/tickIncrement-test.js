const tape = require("tape-await");
const array = require("../");

tape("tickIncrement(start, stop, count) returns NaN if any argument is NaN", (test) => {
  test.ok(isNaN(array.tickIncrement(NaN, 1, 1)));
  test.ok(isNaN(array.tickIncrement(0, NaN, 1)));
  test.ok(isNaN(array.tickIncrement(0, 1, NaN)));
  test.ok(isNaN(array.tickIncrement(NaN, NaN, 1)));
  test.ok(isNaN(array.tickIncrement(0, NaN, NaN)));
  test.ok(isNaN(array.tickIncrement(NaN, 1, NaN)));
  test.ok(isNaN(array.tickIncrement(NaN, NaN, NaN)));
});

tape("tickIncrement(start, stop, count) returns NaN or -Infinity if start === stop", (test) => {
  test.ok(isNaN(array.tickIncrement(1, 1, -1)));
  test.ok(isNaN(array.tickIncrement(1, 1, 0)));
  test.ok(isNaN(array.tickIncrement(1, 1, NaN)));
  test.equal(array.tickIncrement(1, 1, 1), -Infinity);
  test.equal(array.tickIncrement(1, 1, 10), -Infinity);
});

tape("tickIncrement(start, stop, count) returns 0 or Infinity if count is not positive", (test) => {
  test.equal(array.tickIncrement(0, 1, -1), Infinity);
  test.equal(array.tickIncrement(0, 1, 0), Infinity);
});

tape("tickIncrement(start, stop, count) returns -Infinity if count is infinity", (test) => {
  test.equal(array.tickIncrement(0, 1, Infinity), -Infinity);
});

tape("tickIncrement(start, stop, count) returns approximately count + 1 tickIncrement when start < stop", (test) => {
  test.equal(array.tickIncrement(  0,  1, 10), -10);
  test.equal(array.tickIncrement(  0,  1,  9), -10);
  test.equal(array.tickIncrement(  0,  1,  8), -10);
  test.equal(array.tickIncrement(  0,  1,  7), -5);
  test.equal(array.tickIncrement(  0,  1,  6), -5);
  test.equal(array.tickIncrement(  0,  1,  5), -5);
  test.equal(array.tickIncrement(  0,  1,  4), -5);
  test.equal(array.tickIncrement(  0,  1,  3), -2);
  test.equal(array.tickIncrement(  0,  1,  2), -2);
  test.equal(array.tickIncrement(  0,  1,  1), 1);
  test.equal(array.tickIncrement(  0, 10, 10), 1);
  test.equal(array.tickIncrement(  0, 10,  9), 1);
  test.equal(array.tickIncrement(  0, 10,  8), 1);
  test.equal(array.tickIncrement(  0, 10,  7), 2);
  test.equal(array.tickIncrement(  0, 10,  6), 2);
  test.equal(array.tickIncrement(  0, 10,  5), 2);
  test.equal(array.tickIncrement(  0, 10,  4), 2);
  test.equal(array.tickIncrement(  0, 10,  3), 5);
  test.equal(array.tickIncrement(  0, 10,  2), 5);
  test.equal(array.tickIncrement(  0, 10,  1), 10);
  test.equal(array.tickIncrement(-10, 10, 10),  2);
  test.equal(array.tickIncrement(-10, 10,  9),  2);
  test.equal(array.tickIncrement(-10, 10,  8),  2);
  test.equal(array.tickIncrement(-10, 10,  7),  2);
  test.equal(array.tickIncrement(-10, 10,  6),  5);
  test.equal(array.tickIncrement(-10, 10,  5),  5);
  test.equal(array.tickIncrement(-10, 10,  4),  5);
  test.equal(array.tickIncrement(-10, 10,  3),  5);
  test.equal(array.tickIncrement(-10, 10,  2), 10);
  test.equal(array.tickIncrement(-10, 10,  1), 20);
});

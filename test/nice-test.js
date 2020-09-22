const tape = require("tape-await");
const array = require("../");

tape("nice(start, stop, count) returns [start, stop] if any argument is NaN", (test) => {
  test.deepEqual(array.nice(NaN, 1, 1), [NaN, 1]);
  test.deepEqual(array.nice(0, NaN, 1), [0, NaN]);
  test.deepEqual(array.nice(0, 1, NaN), [0, 1]);
  test.deepEqual(array.nice(NaN, NaN, 1), [NaN, NaN]);
  test.deepEqual(array.nice(0, NaN, NaN), [0, NaN]);
  test.deepEqual(array.nice(NaN, 1, NaN), [NaN, 1]);
  test.deepEqual(array.nice(NaN, NaN, NaN), [NaN, NaN]);
});

tape("nice(start, stop, count) returns [start, stop] if start === stop", (test) => {
  test.deepEqual(array.nice(1, 1, -1), [1, 1]);
  test.deepEqual(array.nice(1, 1, 0), [1, 1]);
  test.deepEqual(array.nice(1, 1, NaN), [1, 1]);
  test.deepEqual(array.nice(1, 1, 1), [1, 1]);
  test.deepEqual(array.nice(1, 1, 10), [1, 1]);
});

tape("nice(start, stop, count) returns [start, stop] if count is not positive", (test) => {
  test.deepEqual(array.nice(0, 1, -1), [0, 1]);
  test.deepEqual(array.nice(0, 1, 0), [0, 1]);
});

tape("nice(start, stop, count) returns [start, stop] if count is infinity", (test) => {
  test.deepEqual(array.nice(0, 1, Infinity), [0, 1]);
});

tape("nice(start, stop, count) returns the expected values", (test) => {
  test.deepEqual(array.nice(0.132, 0.876, 1000), [0.132, 0.876]);
  test.deepEqual(array.nice(0.132, 0.876, 100), [0.13, 0.88]);
  test.deepEqual(array.nice(0.132, 0.876, 30), [0.12, 0.88]);
  test.deepEqual(array.nice(0.132, 0.876, 10), [0.1, 0.9]);
  test.deepEqual(array.nice(0.132, 0.876, 6), [0.1, 0.9]);
  test.deepEqual(array.nice(0.132, 0.876, 5), [0, 1]);
  test.deepEqual(array.nice(0.132, 0.876, 1), [0, 1]);
  test.deepEqual(array.nice(132, 876, 1000), [132, 876]);
  test.deepEqual(array.nice(132, 876, 100), [130, 880]);
  test.deepEqual(array.nice(132, 876, 30), [120, 880]);
  test.deepEqual(array.nice(132, 876, 10), [100, 900]);
  test.deepEqual(array.nice(132, 876, 6), [100, 900]);
  test.deepEqual(array.nice(132, 876, 5), [0, 1000]);
  test.deepEqual(array.nice(132, 876, 1), [0, 1000]);
});

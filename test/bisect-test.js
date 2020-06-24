const tape = require("tape-await");
const d3 = require("../");

tape("bisect is an alias for bisectRight", (test) => {
  test.equal(d3.bisect, d3.bisectRight);
});

tape("bisectLeft(array, value) returns the index of an exact match", (test) => {
  const numbers = [1, 2, 3];
  test.equal(d3.bisectLeft(numbers, 1), 0);
  test.equal(d3.bisectLeft(numbers, 2), 1);
  test.equal(d3.bisectLeft(numbers, 3), 2);
});

tape("bisectLeft(array, value) returns the index of the first match", (test) => {
  const numbers = [1, 2, 2, 3];
  test.equal(d3.bisectLeft(numbers, 1), 0);
  test.equal(d3.bisectLeft(numbers, 2), 1);
  test.equal(d3.bisectLeft(numbers, 3), 3);
});

tape("bisectLeft(empty, value) returns zero", (test) => {
  test.equal(d3.bisectLeft([], 1), 0);
});

tape("bisectLeft(array, value) returns the insertion point of a non-exact match", (test) => {
  const numbers = [1, 2, 3];
  test.equal(d3.bisectLeft(numbers, 0.5), 0);
  test.equal(d3.bisectLeft(numbers, 1.5), 1);
  test.equal(d3.bisectLeft(numbers, 2.5), 2);
  test.equal(d3.bisectLeft(numbers, 3.5), 3);
});

tape("bisectLeft(array, value) has undefined behavior if the search value is unorderable", (test) => {
  const numbers = [1, 2, 3];
  d3.bisectLeft(numbers, new Date(NaN)); // who knows what this will return!
  d3.bisectLeft(numbers, undefined);
  d3.bisectLeft(numbers, NaN);
});

tape("bisectLeft(array, value, lo) observes the specified lower bound", (test) => {
  const numbers = [1, 2, 3, 4, 5];
  test.equal(d3.bisectLeft(numbers, 0, 2), 2);
  test.equal(d3.bisectLeft(numbers, 1, 2), 2);
  test.equal(d3.bisectLeft(numbers, 2, 2), 2);
  test.equal(d3.bisectLeft(numbers, 3, 2), 2);
  test.equal(d3.bisectLeft(numbers, 4, 2), 3);
  test.equal(d3.bisectLeft(numbers, 5, 2), 4);
  test.equal(d3.bisectLeft(numbers, 6, 2), 5);
});

tape("bisectLeft(array, value, lo, hi) observes the specified bounds", (test) => {
  const numbers = [1, 2, 3, 4, 5];
  test.equal(d3.bisectLeft(numbers, 0, 2, 3), 2);
  test.equal(d3.bisectLeft(numbers, 1, 2, 3), 2);
  test.equal(d3.bisectLeft(numbers, 2, 2, 3), 2);
  test.equal(d3.bisectLeft(numbers, 3, 2, 3), 2);
  test.equal(d3.bisectLeft(numbers, 4, 2, 3), 3);
  test.equal(d3.bisectLeft(numbers, 5, 2, 3), 3);
  test.equal(d3.bisectLeft(numbers, 6, 2, 3), 3);
});

tape("bisectLeft(array, value) handles large sparse d3", (test) => {
  const numbers = [];
  let i = 1 << 30;
  numbers[i++] = 1;
  numbers[i++] = 2;
  numbers[i++] = 3;
  numbers[i++] = 4;
  numbers[i++] = 5;
  test.equal(d3.bisectLeft(numbers, 0, i - 5, i), i - 5);
  test.equal(d3.bisectLeft(numbers, 1, i - 5, i), i - 5);
  test.equal(d3.bisectLeft(numbers, 2, i - 5, i), i - 4);
  test.equal(d3.bisectLeft(numbers, 3, i - 5, i), i - 3);
  test.equal(d3.bisectLeft(numbers, 4, i - 5, i), i - 2);
  test.equal(d3.bisectLeft(numbers, 5, i - 5, i), i - 1);
  test.equal(d3.bisectLeft(numbers, 6, i - 5, i), i - 0);
});

tape("bisectRight(array, value) returns the index after an exact match", (test) => {
  const numbers = [1, 2, 3];
  test.equal(d3.bisectRight(numbers, 1), 1);
  test.equal(d3.bisectRight(numbers, 2), 2);
  test.equal(d3.bisectRight(numbers, 3), 3);
});

tape("bisectRight(array, value) returns the index after the last match", (test) => {
  const numbers = [1, 2, 2, 3];
  test.equal(d3.bisectRight(numbers, 1), 1);
  test.equal(d3.bisectRight(numbers, 2), 3);
  test.equal(d3.bisectRight(numbers, 3), 4);
});

tape("bisectRight(empty, value) returns zero", (test) => {
  test.equal(d3.bisectRight([], 1), 0);
});

tape("bisectRight(array, value) returns the insertion point of a non-exact match", (test) => {
  const numbers = [1, 2, 3];
  test.equal(d3.bisectRight(numbers, 0.5), 0);
  test.equal(d3.bisectRight(numbers, 1.5), 1);
  test.equal(d3.bisectRight(numbers, 2.5), 2);
  test.equal(d3.bisectRight(numbers, 3.5), 3);
});

tape("bisectRight(array, value, lo) observes the specified lower bound", (test) => {
  const numbers = [1, 2, 3, 4, 5];
  test.equal(d3.bisectRight(numbers, 0, 2), 2);
  test.equal(d3.bisectRight(numbers, 1, 2), 2);
  test.equal(d3.bisectRight(numbers, 2, 2), 2);
  test.equal(d3.bisectRight(numbers, 3, 2), 3);
  test.equal(d3.bisectRight(numbers, 4, 2), 4);
  test.equal(d3.bisectRight(numbers, 5, 2), 5);
  test.equal(d3.bisectRight(numbers, 6, 2), 5);
});

tape("bisectRight(array, value, lo, hi) observes the specified bounds", (test) => {
  const numbers = [1, 2, 3, 4, 5];
  test.equal(d3.bisectRight(numbers, 0, 2, 3), 2);
  test.equal(d3.bisectRight(numbers, 1, 2, 3), 2);
  test.equal(d3.bisectRight(numbers, 2, 2, 3), 2);
  test.equal(d3.bisectRight(numbers, 3, 2, 3), 3);
  test.equal(d3.bisectRight(numbers, 4, 2, 3), 3);
  test.equal(d3.bisectRight(numbers, 5, 2, 3), 3);
  test.equal(d3.bisectRight(numbers, 6, 2, 3), 3);
});

tape("bisectRight(array, value) handles large sparse d3", (test) => {
  const numbers = [];
  let i = 1 << 30;
  numbers[i++] = 1;
  numbers[i++] = 2;
  numbers[i++] = 3;
  numbers[i++] = 4;
  numbers[i++] = 5;
  test.equal(d3.bisectRight(numbers, 0, i - 5, i), i - 5);
  test.equal(d3.bisectRight(numbers, 1, i - 5, i), i - 4);
  test.equal(d3.bisectRight(numbers, 2, i - 5, i), i - 3);
  test.equal(d3.bisectRight(numbers, 3, i - 5, i), i - 2);
  test.equal(d3.bisectRight(numbers, 4, i - 5, i), i - 1);
  test.equal(d3.bisectRight(numbers, 5, i - 5, i), i - 0);
  test.equal(d3.bisectRight(numbers, 6, i - 5, i), i - 0);
});

import assert from "assert";
import * as d3 from "../src/index.js";

it("bisect is an alias for bisectRight", () => {
  assert.strictEqual(d3.bisect, d3.bisectRight);
});

it("bisectLeft(array, value) returns the index of an exact match", () => {
  const numbers = [1, 2, 3];
  assert.strictEqual(d3.bisectLeft(numbers, 1), 0);
  assert.strictEqual(d3.bisectLeft(numbers, 2), 1);
  assert.strictEqual(d3.bisectLeft(numbers, 3), 2);
});

it("bisectLeft(array, value) returns the index of the first match", () => {
  const numbers = [1, 2, 2, 3];
  assert.strictEqual(d3.bisectLeft(numbers, 1), 0);
  assert.strictEqual(d3.bisectLeft(numbers, 2), 1);
  assert.strictEqual(d3.bisectLeft(numbers, 3), 3);
});

it("bisectLeft(empty, value) returns zero", () => {
  assert.strictEqual(d3.bisectLeft([], 1), 0);
});

it("bisectLeft(array, value) returns the insertion point of a non-exact match", () => {
  const numbers = [1, 2, 3];
  assert.strictEqual(d3.bisectLeft(numbers, 0.5), 0);
  assert.strictEqual(d3.bisectLeft(numbers, 1.5), 1);
  assert.strictEqual(d3.bisectLeft(numbers, 2.5), 2);
  assert.strictEqual(d3.bisectLeft(numbers, 3.5), 3);
});

it("bisectLeft(array, value) has undefined behavior if the search value is unorderable", () => {
  const numbers = [1, 2, 3];
  d3.bisectLeft(numbers, new Date(NaN)); // who knows what this will return!
  d3.bisectLeft(numbers, undefined);
  d3.bisectLeft(numbers, NaN);
});

it("bisectLeft(array, value, lo) observes the specified lower bound", () => {
  const numbers = [1, 2, 3, 4, 5];
  assert.strictEqual(d3.bisectLeft(numbers, 0, 2), 2);
  assert.strictEqual(d3.bisectLeft(numbers, 1, 2), 2);
  assert.strictEqual(d3.bisectLeft(numbers, 2, 2), 2);
  assert.strictEqual(d3.bisectLeft(numbers, 3, 2), 2);
  assert.strictEqual(d3.bisectLeft(numbers, 4, 2), 3);
  assert.strictEqual(d3.bisectLeft(numbers, 5, 2), 4);
  assert.strictEqual(d3.bisectLeft(numbers, 6, 2), 5);
});

it("bisectLeft(array, value, lo, hi) observes the specified bounds", () => {
  const numbers = [1, 2, 3, 4, 5];
  assert.strictEqual(d3.bisectLeft(numbers, 0, 2, 3), 2);
  assert.strictEqual(d3.bisectLeft(numbers, 1, 2, 3), 2);
  assert.strictEqual(d3.bisectLeft(numbers, 2, 2, 3), 2);
  assert.strictEqual(d3.bisectLeft(numbers, 3, 2, 3), 2);
  assert.strictEqual(d3.bisectLeft(numbers, 4, 2, 3), 3);
  assert.strictEqual(d3.bisectLeft(numbers, 5, 2, 3), 3);
  assert.strictEqual(d3.bisectLeft(numbers, 6, 2, 3), 3);
});

it("bisectLeft(array, value) handles large sparse d3", () => {
  const numbers = [];
  let i = 1 << 30;
  numbers[i++] = 1;
  numbers[i++] = 2;
  numbers[i++] = 3;
  numbers[i++] = 4;
  numbers[i++] = 5;
  assert.strictEqual(d3.bisectLeft(numbers, 0, i - 5, i), i - 5);
  assert.strictEqual(d3.bisectLeft(numbers, 1, i - 5, i), i - 5);
  assert.strictEqual(d3.bisectLeft(numbers, 2, i - 5, i), i - 4);
  assert.strictEqual(d3.bisectLeft(numbers, 3, i - 5, i), i - 3);
  assert.strictEqual(d3.bisectLeft(numbers, 4, i - 5, i), i - 2);
  assert.strictEqual(d3.bisectLeft(numbers, 5, i - 5, i), i - 1);
  assert.strictEqual(d3.bisectLeft(numbers, 6, i - 5, i), i - 0);
});

it("bisectRight(array, value) returns the index after an exact match", () => {
  const numbers = [1, 2, 3];
  assert.strictEqual(d3.bisectRight(numbers, 1), 1);
  assert.strictEqual(d3.bisectRight(numbers, 2), 2);
  assert.strictEqual(d3.bisectRight(numbers, 3), 3);
});

it("bisectRight(array, value) returns the index after the last match", () => {
  const numbers = [1, 2, 2, 3];
  assert.strictEqual(d3.bisectRight(numbers, 1), 1);
  assert.strictEqual(d3.bisectRight(numbers, 2), 3);
  assert.strictEqual(d3.bisectRight(numbers, 3), 4);
});

it("bisectRight(empty, value) returns zero", () => {
  assert.strictEqual(d3.bisectRight([], 1), 0);
});

it("bisectRight(array, value) returns the insertion point of a non-exact match", () => {
  const numbers = [1, 2, 3];
  assert.strictEqual(d3.bisectRight(numbers, 0.5), 0);
  assert.strictEqual(d3.bisectRight(numbers, 1.5), 1);
  assert.strictEqual(d3.bisectRight(numbers, 2.5), 2);
  assert.strictEqual(d3.bisectRight(numbers, 3.5), 3);
});

it("bisectRight(array, value, lo) observes the specified lower bound", () => {
  const numbers = [1, 2, 3, 4, 5];
  assert.strictEqual(d3.bisectRight(numbers, 0, 2), 2);
  assert.strictEqual(d3.bisectRight(numbers, 1, 2), 2);
  assert.strictEqual(d3.bisectRight(numbers, 2, 2), 2);
  assert.strictEqual(d3.bisectRight(numbers, 3, 2), 3);
  assert.strictEqual(d3.bisectRight(numbers, 4, 2), 4);
  assert.strictEqual(d3.bisectRight(numbers, 5, 2), 5);
  assert.strictEqual(d3.bisectRight(numbers, 6, 2), 5);
});

it("bisectRight(array, value, lo, hi) observes the specified bounds", () => {
  const numbers = [1, 2, 3, 4, 5];
  assert.strictEqual(d3.bisectRight(numbers, 0, 2, 3), 2);
  assert.strictEqual(d3.bisectRight(numbers, 1, 2, 3), 2);
  assert.strictEqual(d3.bisectRight(numbers, 2, 2, 3), 2);
  assert.strictEqual(d3.bisectRight(numbers, 3, 2, 3), 3);
  assert.strictEqual(d3.bisectRight(numbers, 4, 2, 3), 3);
  assert.strictEqual(d3.bisectRight(numbers, 5, 2, 3), 3);
  assert.strictEqual(d3.bisectRight(numbers, 6, 2, 3), 3);
});

it("bisectRight(array, value) handles large sparse d3", () => {
  const numbers = [];
  let i = 1 << 30;
  numbers[i++] = 1;
  numbers[i++] = 2;
  numbers[i++] = 3;
  numbers[i++] = 4;
  numbers[i++] = 5;
  assert.strictEqual(d3.bisectRight(numbers, 0, i - 5, i), i - 5);
  assert.strictEqual(d3.bisectRight(numbers, 1, i - 5, i), i - 4);
  assert.strictEqual(d3.bisectRight(numbers, 2, i - 5, i), i - 3);
  assert.strictEqual(d3.bisectRight(numbers, 3, i - 5, i), i - 2);
  assert.strictEqual(d3.bisectRight(numbers, 4, i - 5, i), i - 1);
  assert.strictEqual(d3.bisectRight(numbers, 5, i - 5, i), i - 0);
  assert.strictEqual(d3.bisectRight(numbers, 6, i - 5, i), i - 0);
});

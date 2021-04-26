import assert from "assert";
import * as d3 from "../src/index.js";

it("ticks(start, stop, count) returns the empty array if any argument is NaN", () => {
  assert.deepEqual(d3.ticks(NaN, 1, 1), []);
  assert.deepEqual(d3.ticks(0, NaN, 1), []);
  assert.deepEqual(d3.ticks(0, 1, NaN), []);
  assert.deepEqual(d3.ticks(NaN, NaN, 1), []);
  assert.deepEqual(d3.ticks(0, NaN, NaN), []);
  assert.deepEqual(d3.ticks(NaN, 1, NaN), []);
  assert.deepEqual(d3.ticks(NaN, NaN, NaN), []);
});

it("ticks(start, stop, count) returns the empty array if start === stop and count is non-positive", () => {
  assert.deepEqual(d3.ticks(1, 1, -1), []);
  assert.deepEqual(d3.ticks(1, 1, 0), []);
  assert.deepEqual(d3.ticks(1, 1, NaN), []);
});

it("ticks(start, stop, count) returns the empty array if start === stop and count is positive", () => {
  assert.deepEqual(d3.ticks(1, 1, 1), [1]);
  assert.deepEqual(d3.ticks(1, 1, 10), [1]);
});

it("ticks(start, stop, count) returns the empty array if count is not positive", () => {
  assert.deepEqual(d3.ticks(0, 1, 0), []);
  assert.deepEqual(d3.ticks(0, 1, -1), []);
  assert.deepEqual(d3.ticks(0, 1, NaN), []);
});

it("ticks(start, stop, count) returns the empty array if count is infinity", () => {
  assert.deepEqual(d3.ticks(0, 1, Infinity), []);
});

it("ticks(start, stop, count) does not include negative zero", () => {
  assert.equal(1 / d3.ticks(-1, 0, 5).pop(), Infinity);
});

it("ticks(start, stop, count) remains within the domain", () => {
  assert.deepEqual(d3.ticks(0, 2.2, 3), [0, 1, 2]);
});

it("ticks(start, stop, count) returns approximately count + 1 ticks when start < stop", () => {
  assert.deepEqual(d3.ticks(  0,  1, 10), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  assert.deepEqual(d3.ticks(  0,  1,  9), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  assert.deepEqual(d3.ticks(  0,  1,  8), [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  assert.deepEqual(d3.ticks(  0,  1,  7), [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepEqual(d3.ticks(  0,  1,  6), [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepEqual(d3.ticks(  0,  1,  5), [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepEqual(d3.ticks(  0,  1,  4), [0.0,      0.2,      0.4,      0.6,      0.8,      1.0]);
  assert.deepEqual(d3.ticks(  0,  1,  3), [0.0,                     0.5,                     1.0]);
  assert.deepEqual(d3.ticks(  0,  1,  2), [0.0,                     0.5,                     1.0]);
  assert.deepEqual(d3.ticks(  0,  1,  1), [0.0,                                              1.0]);
  assert.deepEqual(d3.ticks(  0, 10, 10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepEqual(d3.ticks(  0, 10,  9), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepEqual(d3.ticks(  0, 10,  8), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepEqual(d3.ticks(  0, 10,  7), [0,    2,    4,    6,    8,    10]);
  assert.deepEqual(d3.ticks(  0, 10,  6), [0,    2,    4,    6,    8,    10]);
  assert.deepEqual(d3.ticks(  0, 10,  5), [0,    2,    4,    6,    8,    10]);
  assert.deepEqual(d3.ticks(  0, 10,  4), [0,    2,    4,    6,    8,    10]);
  assert.deepEqual(d3.ticks(  0, 10,  3), [0,             5,             10]);
  assert.deepEqual(d3.ticks(  0, 10,  2), [0,             5,             10]);
  assert.deepEqual(d3.ticks(  0, 10,  1), [0,                            10]);
  assert.deepEqual(d3.ticks(-10, 10, 10), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  assert.deepEqual(d3.ticks(-10, 10,  9), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  assert.deepEqual(d3.ticks(-10, 10,  8), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  assert.deepEqual(d3.ticks(-10, 10,  7), [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  assert.deepEqual(d3.ticks(-10, 10,  6), [-10,       -5,       0,      5,     10]);
  assert.deepEqual(d3.ticks(-10, 10,  5), [-10,       -5,       0,      5,     10]);
  assert.deepEqual(d3.ticks(-10, 10,  4), [-10,       -5,       0,      5,     10]);
  assert.deepEqual(d3.ticks(-10, 10,  3), [-10,       -5,       0,      5,     10]);
  assert.deepEqual(d3.ticks(-10, 10,  2), [-10,                 0,             10]);
  assert.deepEqual(d3.ticks(-10, 10,  1), [                     0,               ]);
});

it("ticks(start, stop, count) returns the reverse of ticks(stop, start, count)", () => {
  assert.deepEqual(d3.ticks( 1,   0, 10), d3.ticks(  0,  1, 10).reverse());
  assert.deepEqual(d3.ticks( 1,   0,  9), d3.ticks(  0,  1,  9).reverse());
  assert.deepEqual(d3.ticks( 1,   0,  8), d3.ticks(  0,  1,  8).reverse());
  assert.deepEqual(d3.ticks( 1,   0,  7), d3.ticks(  0,  1,  7).reverse());
  assert.deepEqual(d3.ticks( 1,   0,  6), d3.ticks(  0,  1,  6).reverse());
  assert.deepEqual(d3.ticks( 1,   0,  5), d3.ticks(  0,  1,  5).reverse());
  assert.deepEqual(d3.ticks( 1,   0,  4), d3.ticks(  0,  1,  4).reverse());
  assert.deepEqual(d3.ticks( 1,   0,  3), d3.ticks(  0,  1,  3).reverse());
  assert.deepEqual(d3.ticks( 1,   0,  2), d3.ticks(  0,  1,  2).reverse());
  assert.deepEqual(d3.ticks( 1,   0,  1), d3.ticks(  0,  1,  1).reverse());
  assert.deepEqual(d3.ticks(10,   0, 10), d3.ticks(  0, 10, 10).reverse());
  assert.deepEqual(d3.ticks(10,   0,  9), d3.ticks(  0, 10,  9).reverse());
  assert.deepEqual(d3.ticks(10,   0,  8), d3.ticks(  0, 10,  8).reverse());
  assert.deepEqual(d3.ticks(10,   0,  7), d3.ticks(  0, 10,  7).reverse());
  assert.deepEqual(d3.ticks(10,   0,  6), d3.ticks(  0, 10,  6).reverse());
  assert.deepEqual(d3.ticks(10,   0,  5), d3.ticks(  0, 10,  5).reverse());
  assert.deepEqual(d3.ticks(10,   0,  4), d3.ticks(  0, 10,  4).reverse());
  assert.deepEqual(d3.ticks(10,   0,  3), d3.ticks(  0, 10,  3).reverse());
  assert.deepEqual(d3.ticks(10,   0,  2), d3.ticks(  0, 10,  2).reverse());
  assert.deepEqual(d3.ticks(10,   0,  1), d3.ticks(  0, 10,  1).reverse());
  assert.deepEqual(d3.ticks(10, -10, 10), d3.ticks(-10, 10, 10).reverse());
  assert.deepEqual(d3.ticks(10, -10,  9), d3.ticks(-10, 10,  9).reverse());
  assert.deepEqual(d3.ticks(10, -10,  8), d3.ticks(-10, 10,  8).reverse());
  assert.deepEqual(d3.ticks(10, -10,  7), d3.ticks(-10, 10,  7).reverse());
  assert.deepEqual(d3.ticks(10, -10,  6), d3.ticks(-10, 10,  6).reverse());
  assert.deepEqual(d3.ticks(10, -10,  5), d3.ticks(-10, 10,  5).reverse());
  assert.deepEqual(d3.ticks(10, -10,  4), d3.ticks(-10, 10,  4).reverse());
  assert.deepEqual(d3.ticks(10, -10,  3), d3.ticks(-10, 10,  3).reverse());
  assert.deepEqual(d3.ticks(10, -10,  2), d3.ticks(-10, 10,  2).reverse());
  assert.deepEqual(d3.ticks(10, -10,  1), d3.ticks(-10, 10,  1).reverse());
});

it("ticks(start, stop, count) handles precision problems", () => {
  assert.deepEqual(d3.ticks(0.98, 1.14, 10), [0.98, 1, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.14]);
});

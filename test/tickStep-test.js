import assert from "assert";
import * as d3 from "../src/index.js";

it("tickStep(start, stop, count) returns NaN if any argument is NaN", () => {
  assert(isNaN(d3.tickStep(NaN, 1, 1)));
  assert(isNaN(d3.tickStep(0, NaN, 1)));
  assert(isNaN(d3.tickStep(0, 1, NaN)));
  assert(isNaN(d3.tickStep(NaN, NaN, 1)));
  assert(isNaN(d3.tickStep(0, NaN, NaN)));
  assert(isNaN(d3.tickStep(NaN, 1, NaN)));
  assert(isNaN(d3.tickStep(NaN, NaN, NaN)));
});

it("tickStep(start, stop, count) returns NaN or 0 if start === stop", () => {
  assert(isNaN(d3.tickStep(1, 1, -1)));
  assert(isNaN(d3.tickStep(1, 1, 0)));
  assert(isNaN(d3.tickStep(1, 1, NaN)));
  assert.equal(d3.tickStep(1, 1, 1), 0);
  assert.equal(d3.tickStep(1, 1, 10), 0);
});

it("tickStep(start, stop, count) returns 0 or Infinity if count is not positive", () => {
  assert.equal(d3.tickStep(0, 1, -1), Infinity);
  assert.equal(d3.tickStep(0, 1, 0), Infinity);
});

it("tickStep(start, stop, count) returns 0 if count is infinity", () => {
  assert.equal(d3.tickStep(0, 1, Infinity), 0);
});

it("tickStep(start, stop, count) returns approximately count + 1 tickStep when start < stop", () => {
  assert.equal(d3.tickStep(  0,  1, 10), 0.1);
  assert.equal(d3.tickStep(  0,  1,  9), 0.1);
  assert.equal(d3.tickStep(  0,  1,  8), 0.1);
  assert.equal(d3.tickStep(  0,  1,  7), 0.2);
  assert.equal(d3.tickStep(  0,  1,  6), 0.2);
  assert.equal(d3.tickStep(  0,  1,  5), 0.2);
  assert.equal(d3.tickStep(  0,  1,  4), 0.2);
  assert.equal(d3.tickStep(  0,  1,  3), 0.5);
  assert.equal(d3.tickStep(  0,  1,  2), 0.5);
  assert.equal(d3.tickStep(  0,  1,  1), 1.0);
  assert.equal(d3.tickStep(  0, 10, 10), 1);
  assert.equal(d3.tickStep(  0, 10,  9), 1);
  assert.equal(d3.tickStep(  0, 10,  8), 1);
  assert.equal(d3.tickStep(  0, 10,  7), 2);
  assert.equal(d3.tickStep(  0, 10,  6), 2);
  assert.equal(d3.tickStep(  0, 10,  5), 2);
  assert.equal(d3.tickStep(  0, 10,  4), 2);
  assert.equal(d3.tickStep(  0, 10,  3), 5);
  assert.equal(d3.tickStep(  0, 10,  2), 5);
  assert.equal(d3.tickStep(  0, 10,  1), 10);
  assert.equal(d3.tickStep(-10, 10, 10),  2);
  assert.equal(d3.tickStep(-10, 10,  9),  2);
  assert.equal(d3.tickStep(-10, 10,  8),  2);
  assert.equal(d3.tickStep(-10, 10,  7),  2);
  assert.equal(d3.tickStep(-10, 10,  6),  5);
  assert.equal(d3.tickStep(-10, 10,  5),  5);
  assert.equal(d3.tickStep(-10, 10,  4),  5);
  assert.equal(d3.tickStep(-10, 10,  3),  5);
  assert.equal(d3.tickStep(-10, 10,  2), 10);
  assert.equal(d3.tickStep(-10, 10,  1), 20);
});

it("tickStep(start, stop, count) returns -tickStep(stop, start, count)", () => {
  assert.equal(d3.tickStep(  0,  1, 10), -d3.tickStep( 1,   0, 10));
  assert.equal(d3.tickStep(  0,  1,  9), -d3.tickStep( 1,   0,  9));
  assert.equal(d3.tickStep(  0,  1,  8), -d3.tickStep( 1,   0,  8));
  assert.equal(d3.tickStep(  0,  1,  7), -d3.tickStep( 1,   0,  7));
  assert.equal(d3.tickStep(  0,  1,  6), -d3.tickStep( 1,   0,  6));
  assert.equal(d3.tickStep(  0,  1,  5), -d3.tickStep( 1,   0,  5));
  assert.equal(d3.tickStep(  0,  1,  4), -d3.tickStep( 1,   0,  4));
  assert.equal(d3.tickStep(  0,  1,  3), -d3.tickStep( 1,   0,  3));
  assert.equal(d3.tickStep(  0,  1,  2), -d3.tickStep( 1,   0,  2));
  assert.equal(d3.tickStep(  0,  1,  1), -d3.tickStep( 1,   0,  1));
  assert.equal(d3.tickStep(  0, 10, 10), -d3.tickStep(10,   0, 10));
  assert.equal(d3.tickStep(  0, 10,  9), -d3.tickStep(10,   0,  9));
  assert.equal(d3.tickStep(  0, 10,  8), -d3.tickStep(10,   0,  8));
  assert.equal(d3.tickStep(  0, 10,  7), -d3.tickStep(10,   0,  7));
  assert.equal(d3.tickStep(  0, 10,  6), -d3.tickStep(10,   0,  6));
  assert.equal(d3.tickStep(  0, 10,  5), -d3.tickStep(10,   0,  5));
  assert.equal(d3.tickStep(  0, 10,  4), -d3.tickStep(10,   0,  4));
  assert.equal(d3.tickStep(  0, 10,  3), -d3.tickStep(10,   0,  3));
  assert.equal(d3.tickStep(  0, 10,  2), -d3.tickStep(10,   0,  2));
  assert.equal(d3.tickStep(  0, 10,  1), -d3.tickStep(10,   0,  1));
  assert.equal(d3.tickStep(-10, 10, 10), -d3.tickStep(10, -10, 10));
  assert.equal(d3.tickStep(-10, 10,  9), -d3.tickStep(10, -10,  9));
  assert.equal(d3.tickStep(-10, 10,  8), -d3.tickStep(10, -10,  8));
  assert.equal(d3.tickStep(-10, 10,  7), -d3.tickStep(10, -10,  7));
  assert.equal(d3.tickStep(-10, 10,  6), -d3.tickStep(10, -10,  6));
  assert.equal(d3.tickStep(-10, 10,  5), -d3.tickStep(10, -10,  5));
  assert.equal(d3.tickStep(-10, 10,  4), -d3.tickStep(10, -10,  4));
  assert.equal(d3.tickStep(-10, 10,  3), -d3.tickStep(10, -10,  3));
  assert.equal(d3.tickStep(-10, 10,  2), -d3.tickStep(10, -10,  2));
  assert.equal(d3.tickStep(-10, 10,  1), -d3.tickStep(10, -10,  1));
});

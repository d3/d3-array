import assert from "assert";
import * as d3 from "../src/index.js";

it("nice(start, stop, count) returns [start, stop] if any argument is NaN", () => {
  assert.deepEqual(d3.nice(NaN, 1, 1), [NaN, 1]);
  assert.deepEqual(d3.nice(0, NaN, 1), [0, NaN]);
  assert.deepEqual(d3.nice(0, 1, NaN), [0, 1]);
  assert.deepEqual(d3.nice(NaN, NaN, 1), [NaN, NaN]);
  assert.deepEqual(d3.nice(0, NaN, NaN), [0, NaN]);
  assert.deepEqual(d3.nice(NaN, 1, NaN), [NaN, 1]);
  assert.deepEqual(d3.nice(NaN, NaN, NaN), [NaN, NaN]);
});

it("nice(start, stop, count) returns [start, stop] if start === stop", () => {
  assert.deepEqual(d3.nice(1, 1, -1), [1, 1]);
  assert.deepEqual(d3.nice(1, 1, 0), [1, 1]);
  assert.deepEqual(d3.nice(1, 1, NaN), [1, 1]);
  assert.deepEqual(d3.nice(1, 1, 1), [1, 1]);
  assert.deepEqual(d3.nice(1, 1, 10), [1, 1]);
});

it("nice(start, stop, count) returns [start, stop] if count is not positive", () => {
  assert.deepEqual(d3.nice(0, 1, -1), [0, 1]);
  assert.deepEqual(d3.nice(0, 1, 0), [0, 1]);
});

it("nice(start, stop, count) returns [start, stop] if count is infinity", () => {
  assert.deepEqual(d3.nice(0, 1, Infinity), [0, 1]);
});

it("nice(start, stop, count) returns the expected values", () => {
  assert.deepEqual(d3.nice(0.132, 0.876, 1000), [0.132, 0.876]);
  assert.deepEqual(d3.nice(0.132, 0.876, 100), [0.13, 0.88]);
  assert.deepEqual(d3.nice(0.132, 0.876, 30), [0.12, 0.88]);
  assert.deepEqual(d3.nice(0.132, 0.876, 10), [0.1, 0.9]);
  assert.deepEqual(d3.nice(0.132, 0.876, 6), [0.1, 0.9]);
  assert.deepEqual(d3.nice(0.132, 0.876, 5), [0, 1]);
  assert.deepEqual(d3.nice(0.132, 0.876, 1), [0, 1]);
  assert.deepEqual(d3.nice(132, 876, 1000), [132, 876]);
  assert.deepEqual(d3.nice(132, 876, 100), [130, 880]);
  assert.deepEqual(d3.nice(132, 876, 30), [120, 880]);
  assert.deepEqual(d3.nice(132, 876, 10), [100, 900]);
  assert.deepEqual(d3.nice(132, 876, 6), [100, 900]);
  assert.deepEqual(d3.nice(132, 876, 5), [0, 1000]);
  assert.deepEqual(d3.nice(132, 876, 1), [0, 1000]);
});

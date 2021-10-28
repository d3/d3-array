import assert from "assert";
import {nice} from "../src/index.js";

it("nice(start, stop, count) returns [start, stop] if any argument is NaN", () => {
  assert.deepStrictEqual(nice(NaN, 1, 1), [NaN, 1]);
  assert.deepStrictEqual(nice(0, NaN, 1), [0, NaN]);
  assert.deepStrictEqual(nice(0, 1, NaN), [0, 1]);
  assert.deepStrictEqual(nice(NaN, NaN, 1), [NaN, NaN]);
  assert.deepStrictEqual(nice(0, NaN, NaN), [0, NaN]);
  assert.deepStrictEqual(nice(NaN, 1, NaN), [NaN, 1]);
  assert.deepStrictEqual(nice(NaN, NaN, NaN), [NaN, NaN]);
});

it("nice(start, stop, count) returns [start, stop] if start === stop", () => {
  assert.deepStrictEqual(nice(1, 1, -1), [1, 1]);
  assert.deepStrictEqual(nice(1, 1, 0), [1, 1]);
  assert.deepStrictEqual(nice(1, 1, NaN), [1, 1]);
  assert.deepStrictEqual(nice(1, 1, 1), [1, 1]);
  assert.deepStrictEqual(nice(1, 1, 10), [1, 1]);
});

it("nice(start, stop, count) returns [start, stop] if count is not positive", () => {
  assert.deepStrictEqual(nice(0, 1, -1), [0, 1]);
  assert.deepStrictEqual(nice(0, 1, 0), [0, 1]);
});

it("nice(start, stop, count) returns [start, stop] if count is infinity", () => {
  assert.deepStrictEqual(nice(0, 1, Infinity), [0, 1]);
});

it("nice(start, stop, count) returns the expected values", () => {
  assert.deepStrictEqual(nice(0.132, 0.876, 1000), [0.132, 0.876]);
  assert.deepStrictEqual(nice(0.132, 0.876, 100), [0.13, 0.88]);
  assert.deepStrictEqual(nice(0.132, 0.876, 30), [0.12, 0.88]);
  assert.deepStrictEqual(nice(0.132, 0.876, 10), [0.1, 0.9]);
  assert.deepStrictEqual(nice(0.132, 0.876, 6), [0.1, 0.9]);
  assert.deepStrictEqual(nice(0.132, 0.876, 5), [0, 1]);
  assert.deepStrictEqual(nice(0.132, 0.876, 1), [0, 1]);
  assert.deepStrictEqual(nice(132, 876, 1000), [132, 876]);
  assert.deepStrictEqual(nice(132, 876, 100), [130, 880]);
  assert.deepStrictEqual(nice(132, 876, 30), [120, 880]);
  assert.deepStrictEqual(nice(132, 876, 10), [100, 900]);
  assert.deepStrictEqual(nice(132, 876, 6), [100, 900]);
  assert.deepStrictEqual(nice(132, 876, 5), [0, 1000]);
  assert.deepStrictEqual(nice(132, 876, 1), [0, 1000]);
});

it("nice(start, stop, count, base) returns the expected values with base 2", () => {
  assert.deepStrictEqual(nice(0.126, 0.51, 32, 2), [0.125, 0.515625]);
  assert.deepStrictEqual(nice(0.126, 0.48, 10, 2), [0.125, 0.5]);
  assert.deepStrictEqual(nice(0.126, 0.48, 6, 2), [0.125, 0.5]);
  assert.deepStrictEqual(nice(0.126, 0.48, 5, 2), [0.125, 0.5]);
  assert.deepStrictEqual(nice(0.126, 0.48, 1, 2), [0, 0.5]);
  assert.deepStrictEqual(nice(129, 876, 1000, 2), [129, 876]);
  assert.deepStrictEqual(nice(129, 876, 100, 2), [128, 880]);
  assert.deepStrictEqual(nice(129, 876, 30, 2), [128, 896]);
  assert.deepStrictEqual(nice(129, 876, 10, 2), [128, 896]);
  assert.deepStrictEqual(nice(129, 876, 6, 2), [128, 896]);
  assert.deepStrictEqual(nice(129, 876, 5, 2), [128, 896]);
  assert.deepStrictEqual(nice(129, 876, 1, 2), [0, 1024]);
});

it("nice(start, stop, count, base) returns the expected values with base e", () => {
  assert.deepStrictEqual(nice(Math.E + 0.1, Math.E * 3 + 0.1, 2, Math.E), [0, Math.E * 4]);
  assert.deepStrictEqual(nice(-Math.E - 0.1, Math.E + 0.1, 2, Math.E), [-Math.E * 2, Math.E * 2]);
  assert.deepStrictEqual(nice(-Math.E * 10 - 0.5, Math.E * 20 - 0.5, 30, Math.E), [-Math.E * 11, Math.E * 20]);
});

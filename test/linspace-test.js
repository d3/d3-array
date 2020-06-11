import assert from "assert";
import {linspace} from "../src/index.js";

it("linspace(start, stop)", () => {
  assert.deepEqual(linspace(0, 49), [
     0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49
  ]);
});

it("linspace(start, stop, n)", () => {
  assert.deepEqual(linspace(2, 3, 5), [2, 2.25, 2.5, 2.75, 3]);
});

it("linspace(start, stop, n, false)", () => {
  assert.deepEqual(linspace(2, 3, 5, false), [2, 2.2, 2.4, 2.6, 2.8]);
});

it("linspace(start, stop, n) descending", () => {
  assert.deepEqual(linspace(5, 1, 5), [5, 4, 3, 2, 1]);
  assert.deepEqual(linspace(5, 0, 5, false), [5, 4, 3, 2, 1]);
});

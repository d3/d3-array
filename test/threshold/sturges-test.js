import {test} from "vitest";
import assert from "assert";
import {thresholdSturges} from "../../src/index.js";

test("thresholdSturges(values, min, max) returns the expected result", () => {
  assert.strictEqual(thresholdSturges([4, 3, 2, 1, NaN], 1, 4), 3);
  assert.strictEqual(thresholdSturges([1], 1, 4), 1);
});

test("thresholdSturges(values, min, max) handles empty arrays", () => {
  assert.strictEqual(thresholdSturges([], 1, 4), 1);
});

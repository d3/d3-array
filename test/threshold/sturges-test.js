import assert from "assert";
import {thresholdSturges} from "../../src/index.js";

it("thresholdSturges(values, min, max) returns the expected result", () => {
  assert.strictEqual(thresholdSturges([4, 3, 2, 1, NaN], 1, 4), 3);
});

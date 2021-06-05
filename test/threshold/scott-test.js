import assert from "assert";
import {thresholdScott} from "../../src/index.js";

it("thresholdScott(values, min, max) returns the expected result", () => {
  assert.strictEqual(thresholdScott([4, 3, 2, 1, NaN], 1, 4), 2);
});

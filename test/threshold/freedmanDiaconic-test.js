import assert from "assert";
import {thresholdFreedmanDiaconis} from "../../src/index.js";

it("thresholdFreedmanDiaconis(values, min, max) returns the expected result", () => {
  assert.strictEqual(thresholdFreedmanDiaconis([4, 3, 2, 1, NaN], 1, 4), 2);
});

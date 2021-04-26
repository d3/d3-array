import assert from "assert";
import * as d3 from "../../src/index.js";

it("thresholdSturges(values, min, max) returns the expected result", () => {
  assert.equal(d3.thresholdSturges([4, 3, 2, 1, NaN], 1, 4), 3);
});

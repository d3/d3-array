import assert from "assert";
import * as d3 from "../../src/index.js";

it("thresholdFreedmanDiaconis(values, min, max) returns the expected result", () => {
  assert.equal(d3.thresholdFreedmanDiaconis([4, 3, 2, 1, NaN], 1, 4), 2);
});

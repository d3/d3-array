import assert from "assert";
import * as d3 from "../src/index.js";

it("subset(values, other) returns true if values is a subset of others", () => {
  assert.equal(d3.subset([2], [1, 2]), true);
  assert.equal(d3.subset([3, 4], [2, 3]), false);
  assert.equal(d3.subset([], [1]), true);
});

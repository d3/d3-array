import assert from "assert";
import {subset} from "../src/index.js";

it("subset(values, other) returns true if values is a subset of others", () => {
  assert.strictEqual(subset([2], [1, 2]), true);
  assert.strictEqual(subset([3, 4], [2, 3]), false);
  assert.strictEqual(subset([], [1]), true);
});

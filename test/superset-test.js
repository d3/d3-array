import assert from "assert";
import * as d3 from "../src/index.js";

it("superset(values, other) returns true if values is a superset of others", () => {
  assert.strictEqual(d3.superset([1, 2], [2]), true);
  assert.strictEqual(d3.superset([2, 3], [3, 4]), false);
  assert.strictEqual(d3.superset([1], []), true);
});

it("superset(values, other) allows values to be infinite", () => {
  assert.strictEqual(d3.superset(odds(), [1, 3, 5]), true);
});

it("superset(values, other) allows other to be infinite", () => {
  assert.strictEqual(d3.superset([1, 3, 5], repeat(1, 3, 2)), false);
});

function* odds() {
  for (let i = 1; true; i += 2) {
    yield i;
  }
}

function* repeat(...values) {
  while (true) {
    yield* values;
  }
}

import assert from "assert";
import * as d3 from "../src/index.js";

it("disjoint(values, other) returns true if sets are disjoint", () => {
  assert.strictEqual(d3.disjoint([1], [2]), true);
  assert.strictEqual(d3.disjoint([2, 3], [3, 4]), false);
  assert.strictEqual(d3.disjoint([1], []), true);
});

it("disjoint(values, other) allows values to be infinite", () => {
  assert.strictEqual(d3.disjoint(odds(), [0, 2, 4, 5]), false);
});

it("disjoint(values, other) allows other to be infinite", () => {
  assert.strictEqual(d3.disjoint([2], repeat(1, 3, 2)), false);
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

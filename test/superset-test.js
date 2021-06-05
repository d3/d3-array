import assert from "assert";
import {superset} from "../src/index.js";

it("superset(values, other) returns true if values is a superset of others", () => {
  assert.strictEqual(superset([1, 2], [2]), true);
  assert.strictEqual(superset([2, 3], [3, 4]), false);
  assert.strictEqual(superset([1], []), true);
});

it("superset(values, other) allows values to be infinite", () => {
  assert.strictEqual(superset(odds(), [1, 3, 5]), true);
});

it("superset(values, other) allows other to be infinite", () => {
  assert.strictEqual(superset([1, 3, 5], repeat(1, 3, 2)), false);
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

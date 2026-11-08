import assert from "node:assert";
import {it} from "vitest";
import {subset} from "d3-array";

it("subset(values, other) returns true if values is a subset of others", () => {
  assert.strictEqual(subset([2], [1, 2]), true);
  assert.strictEqual(subset([3, 4], [2, 3]), false);
  assert.strictEqual(subset([], [1]), true);
});

it("subset(values, other) performs interning", () => {
  assert.strictEqual(subset([new Date("2021-01-02")], [new Date("2021-01-01"), new Date("2021-01-02")]), true);
  assert.strictEqual(subset([new Date("2021-01-03"), new Date("2021-01-04")], [new Date("2021-01-02"), new Date("2021-01-03")]), false);
  assert.strictEqual(subset([], [new Date("2021-01-01")]), true);
});

it("subset(values, other) uses set equality for signed zeros and NaN", () => {
  assert.strictEqual(subset([-0], [0]), true);
  assert.strictEqual(subset([0], [-0]), true);
  assert.strictEqual(subset([Object(-0)], [0]), true);
  assert.strictEqual(subset([0], [Object(-0)]), true);
  assert.strictEqual(subset([0, 1], [1, -0]), true);
  assert.strictEqual(subset([NaN], [NaN]), true);
});

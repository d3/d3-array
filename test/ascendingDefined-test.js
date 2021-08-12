import assert from "assert";
import ascendingDefined from "../src/ascendingDefined.js";

it("ascendingDefined(a, b) returns a negative number if a < b", () => {
  assert(ascendingDefined(0, 1) < 0);
  assert(ascendingDefined("a", "b") < 0);
});

it("ascendingDefined(a, b) returns a positive number if a > b", () => {
  assert(ascendingDefined(1, 0) > 0);
  assert(ascendingDefined("b", "a") > 0);
});

it("ascendingDefined(a, b) returns zero if a >= b and a <= b", () => {
  assert.strictEqual(ascendingDefined(0, 0), 0);
  assert.strictEqual(ascendingDefined("a", "a"), 0);
  assert.strictEqual(ascendingDefined("0", 0), 0);
  assert.strictEqual(ascendingDefined(0, "0"), 0);
});

it("ascendingDefined(a, b) returns considers undefined values greater than defined values", () => {
  assert(ascendingDefined(null, 0) > 0);
  assert(ascendingDefined(undefined, 0) > 0);
  assert(ascendingDefined(NaN, 0) > 0);
  assert(ascendingDefined(new Date(NaN), 0) > 0);
  assert.strictEqual(ascendingDefined(null, null), 0);
  assert.strictEqual(ascendingDefined(null, undefined), 0);
  assert.strictEqual(ascendingDefined(null, NaN), 0);
  assert.strictEqual(ascendingDefined(null, new Date(NaN)), 0);
  assert.strictEqual(ascendingDefined(undefined, null), 0);
  assert.strictEqual(ascendingDefined(undefined, undefined), 0);
  assert.strictEqual(ascendingDefined(undefined, NaN), 0);
  assert.strictEqual(ascendingDefined(undefined, new Date(NaN)), 0);
  assert.strictEqual(ascendingDefined(NaN, null), 0);
  assert.strictEqual(ascendingDefined(NaN, undefined), 0);
  assert.strictEqual(ascendingDefined(NaN, NaN), 0);
  assert.strictEqual(ascendingDefined(NaN, new Date(NaN)), 0);
  assert.strictEqual(ascendingDefined(new Date(NaN), null), 0);
  assert.strictEqual(ascendingDefined(new Date(NaN), undefined), 0);
  assert.strictEqual(ascendingDefined(new Date(NaN), NaN), 0);
  assert.strictEqual(ascendingDefined(new Date(NaN), new Date(NaN)), 0);
});

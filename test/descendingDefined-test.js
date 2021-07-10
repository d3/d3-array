import assert from "assert";
import {descendingDefined} from "../src/index.js";

it("descendingDefined(a, b) returns a positive number if a < b", () => {
  assert(descendingDefined(0, 1) > 0);
  assert(descendingDefined("a", "b") > 0);
});

it("descendingDefined(a, b) returns a negative number if a > b", () => {
  assert(descendingDefined(1, 0) < 0);
  assert(descendingDefined("b", "a") < 0);
});

it("descendingDefined(a, b) returns zero if a >= b and a <= b", () => {
  assert.strictEqual(descendingDefined(0, 0), 0);
  assert.strictEqual(descendingDefined("a", "a"), 0);
  assert.strictEqual(descendingDefined("0", 0), 0);
  assert.strictEqual(descendingDefined(0, "0"), 0);
});

it("descendingDefined(a, b) returns considers undefined values greater than defined values", () => {
  assert(descendingDefined(null, 0) > 0);
  assert(descendingDefined(undefined, 0) > 0);
  assert(descendingDefined(NaN, 0) > 0);
  assert(descendingDefined(new Date(NaN), 0) > 0);
  assert.strictEqual(descendingDefined(null, null), 0);
  assert.strictEqual(descendingDefined(null, undefined), 0);
  assert.strictEqual(descendingDefined(null, NaN), 0);
  assert.strictEqual(descendingDefined(null, new Date(NaN)), 0);
  assert.strictEqual(descendingDefined(undefined, null), 0);
  assert.strictEqual(descendingDefined(undefined, undefined), 0);
  assert.strictEqual(descendingDefined(undefined, NaN), 0);
  assert.strictEqual(descendingDefined(undefined, new Date(NaN)), 0);
  assert.strictEqual(descendingDefined(NaN, null), 0);
  assert.strictEqual(descendingDefined(NaN, undefined), 0);
  assert.strictEqual(descendingDefined(NaN, NaN), 0);
  assert.strictEqual(descendingDefined(NaN, new Date(NaN)), 0);
  assert.strictEqual(descendingDefined(new Date(NaN), null), 0);
  assert.strictEqual(descendingDefined(new Date(NaN), undefined), 0);
  assert.strictEqual(descendingDefined(new Date(NaN), NaN), 0);
  assert.strictEqual(descendingDefined(new Date(NaN), new Date(NaN)), 0);
});

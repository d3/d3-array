import assert from "node:assert";
import {it} from "vitest";
import {disjoint} from "d3-array";

it("disjoint(values, other) returns true if sets are disjoint", () => {
  assert.strictEqual(disjoint([1], [2]), true);
  assert.strictEqual(disjoint([2, 3], [3, 4]), false);
  assert.strictEqual(disjoint([1], []), true);
});

it("disjoint(values, other) allows values to be infinite", () => {
  assert.strictEqual(disjoint(odds(), [0, 2, 4, 5]), false);
});

it("disjoint(values, other) allows other to be infinite", () => {
  assert.strictEqual(disjoint([2], repeat(1, 3, 2)), false);
});

it("disjoint(values, other) performs interning", () => {
  assert.strictEqual(disjoint([new Date("2021-01-01")], [new Date("2021-01-02")]), true);
  assert.strictEqual(disjoint([new Date("2021-01-02"), new Date("2021-01-03")], [new Date("2021-01-03"), new Date("2021-01-04")]), false);
  assert.strictEqual(disjoint([new Date("2021-01-01")], []), true);
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

it("disjoint(values, other) interns values encountered while advancing the iterator", () => {
  assert.strictEqual(disjoint([new Date(0)], [new Date(0)]), false);
  for (const values of [[new Date(0)], [Object(1)], [Object("a")]]) {
    const other = values.map(value => Object(value.valueOf()));
    assert.strictEqual(disjoint(values, other), false);
    assert.strictEqual(disjoint(values, [null, ...other]), false);
    assert.strictEqual(disjoint(other, values), false);
  }
});

it("disjoint(values, other) uses set equality for signed zeros and NaN", () => {
  assert.strictEqual(disjoint([-0], [0]), false);
  assert.strictEqual(disjoint([0], [-0]), false);
  assert.strictEqual(disjoint([NaN], [NaN]), false);
});

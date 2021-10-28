import assert from "assert";
import {tickIncrement} from "../src/index.js";

it("tickIncrement(start, stop, count) returns NaN if any argument is NaN", () => {
  assert(isNaN(tickIncrement(NaN, 1, 1)));
  assert(isNaN(tickIncrement(0, NaN, 1)));
  assert(isNaN(tickIncrement(0, 1, NaN)));
  assert(isNaN(tickIncrement(NaN, NaN, 1)));
  assert(isNaN(tickIncrement(0, NaN, NaN)));
  assert(isNaN(tickIncrement(NaN, 1, NaN)));
  assert(isNaN(tickIncrement(NaN, NaN, NaN)));
});

it("tickIncrement(start, stop, count) returns NaN or -Infinity if start === stop", () => {
  assert(isNaN(tickIncrement(1, 1, -1)));
  assert(isNaN(tickIncrement(1, 1, 0)));
  assert(isNaN(tickIncrement(1, 1, NaN)));
  assert.strictEqual(tickIncrement(1, 1, 1), -Infinity);
  assert.strictEqual(tickIncrement(1, 1, 10), -Infinity);
});

it("tickIncrement(start, stop, count) returns 0 or Infinity if count is not positive", () => {
  assert.strictEqual(tickIncrement(0, 1, -1), Infinity);
  assert.strictEqual(tickIncrement(0, 1, 0), Infinity);
});

it("tickIncrement(start, stop, count) returns -Infinity if count is infinity", () => {
  assert.strictEqual(tickIncrement(0, 1, Infinity), -Infinity);
});

it("tickIncrement(start, stop, count) returns approximately count + 1 tickIncrement when start < stop", () => {
  assert.strictEqual(tickIncrement(  0,  1, 10), -10);
  assert.strictEqual(tickIncrement(  0,  1,  9), -10);
  assert.strictEqual(tickIncrement(  0,  1,  8), -10);
  assert.strictEqual(tickIncrement(  0,  1,  7), -5);
  assert.strictEqual(tickIncrement(  0,  1,  6), -5);
  assert.strictEqual(tickIncrement(  0,  1,  5), -5);
  assert.strictEqual(tickIncrement(  0,  1,  4), -5);
  assert.strictEqual(tickIncrement(  0,  1,  3), -2);
  assert.strictEqual(tickIncrement(  0,  1,  2), -2);
  assert.strictEqual(tickIncrement(  0,  1,  1), 1);
  assert.strictEqual(tickIncrement(  0, 10, 10), 1);
  assert.strictEqual(tickIncrement(  0, 10,  9), 1);
  assert.strictEqual(tickIncrement(  0, 10,  8), 1);
  assert.strictEqual(tickIncrement(  0, 10,  7), 2);
  assert.strictEqual(tickIncrement(  0, 10,  6), 2);
  assert.strictEqual(tickIncrement(  0, 10,  5), 2);
  assert.strictEqual(tickIncrement(  0, 10,  4), 2);
  assert.strictEqual(tickIncrement(  0, 10,  3), 5);
  assert.strictEqual(tickIncrement(  0, 10,  2), 5);
  assert.strictEqual(tickIncrement(  0, 10,  1), 10);
  assert.strictEqual(tickIncrement(-10, 10, 10),  2);
  assert.strictEqual(tickIncrement(-10, 10,  9),  2);
  assert.strictEqual(tickIncrement(-10, 10,  8),  2);
  assert.strictEqual(tickIncrement(-10, 10,  7),  2);
  assert.strictEqual(tickIncrement(-10, 10,  6),  5);
  assert.strictEqual(tickIncrement(-10, 10,  5),  5);
  assert.strictEqual(tickIncrement(-10, 10,  4),  5);
  assert.strictEqual(tickIncrement(-10, 10,  3),  5);
  assert.strictEqual(tickIncrement(-10, 10,  2), 10);
  assert.strictEqual(tickIncrement(-10, 10,  1), 20);
});


describe("tickIncrement(start, stop, count, base) returns approximately count + 1 tickIncrement when start < stop", () => {
  it("base 2", () => {
    assert.strictEqual(tickIncrement(  0,  1, 10, 2), -8);
    assert.strictEqual(tickIncrement(  0,  1,  9, 2), -8);
    assert.strictEqual(tickIncrement(  0,  1,  8, 2), -8);
    assert.strictEqual(tickIncrement(  0,  1,  7, 2), -8);
    assert.strictEqual(tickIncrement(  0,  1,  6, 2), -8);
    assert.strictEqual(tickIncrement(  0,  1,  5, 2), -4);
    assert.strictEqual(tickIncrement(  0,  1,  4, 2), -4);
    assert.strictEqual(tickIncrement(  0,  1,  3, 2), -4);
    assert.strictEqual(tickIncrement(  0,  1,  2, 2), -2);
    assert.strictEqual(tickIncrement(  0,  1,  1, 2), 1);
    assert.strictEqual(tickIncrement(  0, 10, 10, 2), 1);
    assert.strictEqual(tickIncrement(  0, 10,  9, 2), 1);
    assert.strictEqual(tickIncrement(  0, 10,  8, 2), 1);
    assert.strictEqual(tickIncrement(  0, 10,  7, 2), 2);
    assert.strictEqual(tickIncrement(  0, 10,  6, 2), 2);
    assert.strictEqual(tickIncrement(  0, 10,  5, 2), 2);
    assert.strictEqual(tickIncrement(  0, 10,  4, 2), 2);
    assert.strictEqual(tickIncrement(  0, 10,  3, 2), 4);
    assert.strictEqual(tickIncrement(  0, 10,  2, 2), 4);
    assert.strictEqual(tickIncrement(  0, 10,  1, 2), 8);
    assert.strictEqual(tickIncrement(-10, 10, 10, 2),  2);
    assert.strictEqual(tickIncrement(-10, 10,  9, 2),  2);
    assert.strictEqual(tickIncrement(-10, 10,  8, 2),  2);
    assert.strictEqual(tickIncrement(-10, 10,  7, 2),  4);
    assert.strictEqual(tickIncrement(-10, 10,  6, 2),  4);
    assert.strictEqual(tickIncrement(-10, 10,  5, 2),  4);
    assert.strictEqual(tickIncrement(-10, 10,  4, 2),  4);
    assert.strictEqual(tickIncrement(-10, 10,  3, 2),  8);
    assert.strictEqual(tickIncrement(-10, 10,  2, 2), 8);
    assert.strictEqual(tickIncrement(-10, 10,  1, 2), 16);
  });

  it("base 5", () => {
    assert.strictEqual(tickIncrement(  0,  1, 10, 5), -12.5);
    assert.strictEqual(tickIncrement(  0,  1,  9, 5), -12.5);
    assert.strictEqual(tickIncrement(  0,  1,  8, 5), -12.5);
    assert.strictEqual(tickIncrement(  0,  1,  7, 5), -5);
    assert.strictEqual(tickIncrement(  0,  1,  6, 5), -5);
    assert.strictEqual(tickIncrement(  0,  1,  5, 5), -5);
    assert.strictEqual(tickIncrement(  0,  1,  4, 5), -5);
    assert.strictEqual(tickIncrement(  0,  1,  3, 5), -2.5);
    assert.strictEqual(tickIncrement(  0,  1,  2, 5), -2.5);
    assert.strictEqual(tickIncrement(  0,  1,  1, 5), 1);
    assert.strictEqual(tickIncrement(  0, 10, 10, 5), 1);
    assert.strictEqual(tickIncrement(  0, 10,  9, 5), 1);
    assert.strictEqual(tickIncrement(  0, 10,  8, 5), 1);
    assert.strictEqual(tickIncrement(  0, 10,  7, 5), 2);
    assert.strictEqual(tickIncrement(  0, 10,  6, 5), 2);
    assert.strictEqual(tickIncrement(  0, 10,  5, 5), 2);
    assert.strictEqual(tickIncrement(  0, 10,  4, 5), 2);
    assert.strictEqual(tickIncrement(  0, 10,  3, 5), 5);
    assert.strictEqual(tickIncrement(  0, 10,  2, 5), 5);
    assert.strictEqual(tickIncrement(  0, 10,  1, 5), 10);
    assert.strictEqual(tickIncrement(-10, 10, 10, 5),  2);
    assert.strictEqual(tickIncrement(-10, 10,  9, 5),  2);
    assert.strictEqual(tickIncrement(-10, 10,  8, 5),  2);
    assert.strictEqual(tickIncrement(-10, 10,  7, 5),  2);
    assert.strictEqual(tickIncrement(-10, 10,  6, 5),  5);
    assert.strictEqual(tickIncrement(-10, 10,  5, 5),  5);
    assert.strictEqual(tickIncrement(-10, 10,  4, 5),  5);
    assert.strictEqual(tickIncrement(-10, 10,  3, 5),  5);
    assert.strictEqual(tickIncrement(-10, 10,  2, 5), 10);
    assert.strictEqual(tickIncrement(-10, 10,  1, 5), 25);
  });

  it("base 10", () => {
    assert.strictEqual(tickIncrement(  0,  1, 10, 10), -10);
    assert.strictEqual(tickIncrement(  0,  1,  9, 10), -10);
    assert.strictEqual(tickIncrement(  0,  1,  8, 10), -10);
    assert.strictEqual(tickIncrement(  0,  1,  7, 10), -5);
    assert.strictEqual(tickIncrement(  0,  1,  6, 10), -5);
    assert.strictEqual(tickIncrement(  0,  1,  5, 10), -5);
    assert.strictEqual(tickIncrement(  0,  1,  4, 10), -5);
    assert.strictEqual(tickIncrement(  0,  1,  3, 10), -2);
    assert.strictEqual(tickIncrement(  0,  1,  2, 10), -2);
    assert.strictEqual(tickIncrement(  0,  1,  1, 10), 1);
    assert.strictEqual(tickIncrement(  0, 10, 10, 10), 1);
    assert.strictEqual(tickIncrement(  0, 10,  9, 10), 1);
    assert.strictEqual(tickIncrement(  0, 10,  8, 10), 1);
    assert.strictEqual(tickIncrement(  0, 10,  7, 10), 2);
    assert.strictEqual(tickIncrement(  0, 10,  6, 10), 2);
    assert.strictEqual(tickIncrement(  0, 10,  5, 10), 2);
    assert.strictEqual(tickIncrement(  0, 10,  4, 10), 2);
    assert.strictEqual(tickIncrement(  0, 10,  3, 10), 5);
    assert.strictEqual(tickIncrement(  0, 10,  2, 10), 5);
    assert.strictEqual(tickIncrement(  0, 10,  1, 10), 10);
    assert.strictEqual(tickIncrement(-10, 10, 10, 10),  2);
    assert.strictEqual(tickIncrement(-10, 10,  9, 10),  2);
    assert.strictEqual(tickIncrement(-10, 10,  8, 10),  2);
    assert.strictEqual(tickIncrement(-10, 10,  7, 10),  2);
    assert.strictEqual(tickIncrement(-10, 10,  6, 10),  5);
    assert.strictEqual(tickIncrement(-10, 10,  5, 10),  5);
    assert.strictEqual(tickIncrement(-10, 10,  4, 10),  5);
    assert.strictEqual(tickIncrement(-10, 10,  3, 10),  5);
    assert.strictEqual(tickIncrement(-10, 10,  2, 10), 10);
    assert.strictEqual(tickIncrement(-10, 10,  1, 10), 20);
  });

  it("base e", () => {
    assert.strictEqual(normalizeLn(tickIncrement(  0,  Math.E / 100, 10, Math.E)), -1);
    assert.strictEqual(normalizeLn(tickIncrement(  0,  Math.E / 10, 10, Math.E)), -0.5);
    assert.strictEqual(normalizeLn(tickIncrement(  0,  Math.E / 10, 1, Math.E)), -0.5);
    assert.strictEqual(normalizeLn(tickIncrement(  0,  Math.E, 3, Math.E)), -0.5);
    assert.strictEqual(normalizeLn(tickIncrement(  -Math.E,  Math.E, 2, Math.E)), 1);
    assert.strictEqual(normalizeLn(tickIncrement(  0,  Math.E * 10, 10, Math.E)), 1);
    assert.strictEqual(normalizeLn(tickIncrement(  1,  Math.E * 10, 10, Math.E)), 2);
    assert.strictEqual(normalizeLn(tickIncrement(  -Math.E * 10,  Math.E * 10, 10, Math.E)), 2);
    assert.strictEqual(normalizeLn(tickIncrement(  Math.E,  Math.E * 100, 10, Math.E)), 1);
    assert.strictEqual(normalizeLn(tickIncrement(  -Math.E * 100,  Math.E * 100, 10, Math.E)), 2);
    assert.strictEqual(normalizeLn(tickIncrement(  0,  Math.E * 100, 10, Math.E)), 1);
    assert.strictEqual(tickIncrement(  0,  10, 10, Math.E), 1);
    assert.strictEqual(tickIncrement(  -10,  10, 10, Math.E), 2);
  });
})

export function normalizeLn(value) {
  let tries = 0, normValue = value;
  while (tries++ < 10 && normValue % 0.5 !== 0) normValue *= Math.E;
  if (tries > 10) {
    tries = 0, normValue = value
    while (tries++ < 10 && normValue % 0.5 !== 0) normValue /= Math.E;
  }
  return tries > 10 ? NaN : normValue;
}

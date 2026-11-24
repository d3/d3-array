import assert from "node:assert";
import {it} from "vitest";
import {randomLcg} from "d3-random";
import {pairs, shuffler} from "d3-array";

it("shuffle(array) shuffles the array in-place", () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffle = shuffler(randomLcg(0.9051667019185816));
  assert.strictEqual(shuffle(numbers), numbers);
  assert(pairs(numbers).some(([a, b]) => a > b)); // shuffled
});

it("shuffler(random)(array) shuffles the array in-place", () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffle = shuffler(randomLcg(0.9051667019185816));
  assert.strictEqual(shuffle(numbers), numbers);
  assert.deepStrictEqual(numbers, [7, 4, 5, 3, 9, 0, 6, 1, 2, 8]);
});

it("shuffler(random)(array, start) shuffles the subset array[start:] in-place", () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffle = shuffler(randomLcg(0.9051667019185816));
  assert.strictEqual(shuffle(numbers, 4), numbers);
  assert.deepStrictEqual(numbers, [0, 1, 2, 3, 8, 7, 6, 4, 5, 9]);
});

it("shuffler(random)(array, start, end) shuffles the subset array[start:end] in-place", () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffle = shuffler(randomLcg(0.9051667019185816));
  assert.strictEqual(shuffle(numbers, 3, 8), numbers);
  assert.deepStrictEqual(numbers, [0, 1, 2, 5, 6, 3, 4, 7, 8, 9]);
});

it("shuffler(random)(array, start, end) returns the array unchanged when start > end", () => {
  const numbers = [0, 1, 2, 3, 4];
  const shuffle = shuffler(randomLcg(0.9051667019185816));
  assert.strictEqual(shuffle(numbers, 2, 0), numbers);
  assert.deepStrictEqual(numbers, [0, 1, 2, 3, 4]);
});

it("shuffler(random)(array, start) returns the array unchanged when start is past the end of the array", () => {
  const numbers = [0, 1];
  const shuffle = shuffler(randomLcg(0.9051667019185816));
  assert.strictEqual(shuffle(numbers, 3), numbers);
  assert.deepStrictEqual(numbers, [0, 1]);
});

it("shuffler(random)(array, start, end) shuffles the floored range when the bounds are non-integer", () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffle = shuffler(randomLcg(0.9051667019185816));
  assert.strictEqual(shuffle(numbers, 0.5, 10), numbers);
  assert.deepStrictEqual(numbers.slice().sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

it("shuffler(random)(array, start, end) clamps the range to the array", () => {
  const numbers = [0, 1, 2, 3, 4];
  const shuffle = shuffler(randomLcg(0.9051667019185816));
  assert.strictEqual(shuffle(numbers, 0, 20), numbers);
  assert.strictEqual(numbers.length, 5);
  assert.deepStrictEqual(numbers.slice().sort((a, b) => a - b), [0, 1, 2, 3, 4]);
});

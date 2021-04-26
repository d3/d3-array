import assert from "assert";
import * as d3 from "../src/index.js";

it("histogram is a deprecated alias for bin", () => {
  assert.strictEqual(d3.histogram, d3.bin);
});

it("bin() returns a default bin generator", () => {
  const h = d3.bin();
  assert.strictEqual(h.value()(42), 42);
  assert.strictEqual(h.domain(), d3.extent);
  assert.deepStrictEqual(h.thresholds(), d3.thresholdSturges);
});

it("bin(data) computes bins of the specified array of data", () => {
  const h = d3.bin();
  assert.deepStrictEqual(h([0, 0, 0, 10, 20, 20]), [
    bin([0, 0, 0], 0, 5),
    bin([], 5, 10),
    bin([10], 10, 15),
    bin([], 15, 20),
    bin([20, 20], 20, 25)
  ]);
});

it("bin(iterable) is equivalent to bin(array)", () => {
  const h = d3.bin();
  assert.deepStrictEqual(h(iterable([0, 0, 0, 10, 20, 20])), [
    bin([0, 0, 0], 0, 5),
    bin([], 5, 10),
    bin([10], 10, 15),
    bin([], 15, 20),
    bin([20, 20], 20, 25)
  ]);
});

it("bin.value(number) sets the constant value", () => {
  const h = d3.bin().value(12); // Pointless, but for consistency.
  assert.deepStrictEqual(h([0, 0, 0, 1, 2, 2]), [
    bin([0, 0, 0, 1, 2, 2], 12, 12),
  ]);
});

it("bin.value(function) sets the value accessor", () => {
  const h = d3.bin().value((d) => d.value);
  const a = {value: 0};
  const b = {value: 10};
  const c = {value: 20};
  assert.deepStrictEqual(h([a, a, a, b, c, c]), [
    bin([a, a, a], 0, 5),
    bin([], 5, 10),
    bin([b], 10, 15),
    bin([], 15, 20),
    bin([c, c], 20, 25)
  ]);
});

it("bin.domain(array) sets the domain", () => {
  const h = d3.bin().domain([0, 20]);
  assert.deepStrictEqual(h.domain()(), [0, 20]);
  assert.deepStrictEqual(h([1, 2, 2, 10, 18, 18]), [
    bin([1, 2, 2], 0, 5),
    bin([], 5, 10),
    bin([10], 10, 15),
    bin([18, 18], 15, 20)
  ]);
});

it("bin.domain(function) sets the domain accessor", () => {
  let actual;
  const values = [1, 2, 2, 10, 18, 18];
  const domain = (values) => { actual = values; return [0, 20]; };
  const h = d3.bin().domain(domain);
  assert.strictEqual(h.domain(), domain);
  assert.deepStrictEqual(h(values), [
    bin([1, 2, 2], 0, 5),
    bin([], 5, 10),
    bin([10], 10, 15),
    bin([18, 18], 15, 20)
  ]);
  assert.deepStrictEqual(actual, values);
});

it("bin.thresholds(number) sets the approximate number of bin thresholds", () => {
  const h = d3.bin().thresholds(3);
  assert.deepStrictEqual(h([0, 0, 0, 10, 30, 30]), [
    bin([0, 0, 0], 0, 10),
    bin([10], 10, 20),
    bin([], 20, 30),
    bin([30, 30], 30, 40)
  ]);
});

it("bin.thresholds(array) sets the bin thresholds", () => {
  const h = d3.bin().thresholds([10, 20]);
  assert.deepStrictEqual(h([0, 0, 0, 10, 30, 30]), [
    bin([0, 0, 0], 0, 10),
    bin([10], 10, 20),
    bin([30, 30], 20, 30)
  ]);
});

it("bin.thresholds(array) ignores thresholds outside the domain", () => {
  const h = d3.bin().thresholds([0, 1, 2, 3, 4]);
  assert.deepStrictEqual(h([0, 1, 2, 3]), [
    bin([0], 0, 1),
    bin([1], 1, 2),
    bin([2], 2, 3),
    bin([3], 3, 3)
  ]);
});

it("bin.thresholds(function) sets the bin thresholds accessor", () => {
  let actual;
  const values = [0, 0, 0, 10, 30, 30];
  const h = d3.bin().thresholds((values, x0, x1) => { actual = [values, x0, x1]; return [10, 20]; });
  assert.deepStrictEqual(h(values), [
    bin([0, 0, 0], 0, 10),
    bin([10], 10, 20),
    bin([30, 30], 20, 30)
  ]);
  assert.deepStrictEqual(actual, [values, 0, 30]);
  assert.deepStrictEqual(h.thresholds(() => 5)(values), [
    bin([0, 0, 0], 0, 5),
    bin([], 5, 10),
    bin([10], 10, 15),
    bin([], 15, 20),
    bin([], 20, 25),
    bin([], 25, 30),
    bin([30, 30], 30, 35)
  ]);
});

it("bin(data) uses nice thresholds", () => {
  const h = d3.bin().domain([0, 1]).thresholds(5);
  assert.deepStrictEqual(h([]).map(b => [b.x0, b.x1]), [
    [0.0, 0.2],
    [0.2, 0.4],
    [0.4, 0.6],
    [0.6, 0.8],
    [0.8, 1.0]
  ]);
});

it("bin()() returns bins whose rightmost bin is not too wide", () => {
  const h = d3.bin();
  assert.deepStrictEqual(h([9.8, 10, 11, 12, 13, 13.2]), [
    bin([9.8], 9, 10),
    bin([10], 10, 11),
    bin([11], 11, 12),
    bin([12], 12, 13),
    bin([13, 13.2], 13, 14)
  ]);
});

it("bin(data) coerces values to numbers as expected", () => {
  const h = d3.bin().thresholds(10);
  assert.deepStrictEqual(h(["1", "2", "3", "4", "5"]), [
    bin(["1"], 1, 1.5),
    bin([], 1.5, 2),
    bin(["2"], 2, 2.5),
    bin([], 2.5, 3),
    bin(["3"], 3, 3.5),
    bin([], 3.5, 4),
    bin(["4"], 4, 4.5),
    bin([], 4.5, 5),
    bin(["5"], 5, 5.5)
  ]);
});

function bin(bin, x0, x1)  {
  bin.x0 = x0;
  bin.x1 = x1;
  return bin;
}

function* iterable(array) {
  yield* array;
}

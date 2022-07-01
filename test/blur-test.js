import assert from "assert";
import {blur1} from "../src/index.js";

it("blur1(values, r) returns values", () => {
  const V = [0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0];
  assert.strictEqual(blur1(V, 1), V);
  assert.deepStrictEqual(V, [0, 0, 0, 1, 3, 6, 7, 6, 3, 1, 0, 0, 0, 0]);
});

it("blur1(values, r) observes the expected integer radius r", () => {
  assert.deepStrictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 0.0).map(x => +x.toFixed(3)), [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 27.00, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000]);
  assert.deepStrictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 1.0).map(x => +x.toFixed(3)), [0.000, 0.000, 0.000, 1.000, 3.000, 6.000, 7.000, 6.000, 3.000, 1.000, 0.000, 0.000, 0.000, 0.000]);
  assert.deepStrictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 2.0).map(x => +x.toFixed(3)), [0.216, 0.648, 1.296, 2.160, 3.240, 3.888, 4.104, 3.888, 3.240, 2.160, 1.296, 0.648, 0.216, 0.000]);
  assert.deepStrictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 3.0).map(x => +x.toFixed(3)), [1.023, 1.338, 1.732, 2.204, 2.598, 2.834, 2.913, 2.834, 2.598, 2.204, 1.653, 1.181, 0.787, 0.472]);
});

it("blur1(values, r) repeats starting values before the window", () => {
  assert.deepStrictEqual(blur1([27, 0, 0, 0, 0, 0, 0, 0], 0.0).map(x => +x.toFixed(3)), [27.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000]);
  assert.deepStrictEqual(blur1([27, 0, 0, 0, 0, 0, 0, 0], 1.0).map(x => +x.toFixed(3)), [13.000, 9.000, 4.000, 1.000, 0.000, 0.000, 0.000, 0.000]);
  assert.deepStrictEqual(blur1([27, 0, 0, 0, 0, 0, 0, 0], 2.0).map(x => +x.toFixed(3)), [11.016, 9.072, 6.696, 4.104, 2.160, 0.864, 0.216, -0.00]);
  assert.deepStrictEqual(blur1([27, 0, 0, 0, 0, 0, 0, 0], 3.0).map(x => +x.toFixed(3)), [10.233, 8.974, 7.478, 5.825, 4.093, 2.676, 1.574, 0.787]);
});

it("blur1(values, r) observes the expected fractional radius r", () => {
  assert.deepStrictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 0.5).map(x => +x.toFixed(3)), [0.000, 0.000, 0.000, 0.422, 2.531, 6.328, 8.438, 6.328, 2.531, 0.422, 0.000, 0.000, 0.000, 0.000]);
  assert.deepStrictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 1.5).map(x => +x.toFixed(3)), [0.053, 0.316, 0.949, 2.004, 3.322, 4.430, 4.852, 4.430, 3.322, 2.004, 0.949, 0.316, 0.053, 0.000]);
  assert.deepStrictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 2.5).map(x => +x.toFixed(3)), [0.672, 1.078, 1.609, 2.234, 2.813, 3.188, 3.313, 3.188, 2.813, 2.234, 1.594, 1.031, 0.594, 0.281]);
  assert.deepStrictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 3.5).map(x => +x.toFixed(3)), [1.266, 1.503, 1.780, 2.057, 2.294, 2.452, 2.505, 2.452, 2.294, 2.030, 1.701, 1.371, 1.081, 0.844]);
});

it("blur1(values, r) approximately preserves total value", () => {
  assert.strictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 0.0).reduce((p, v) => p + v), 27);
  assert.strictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 0.5).reduce((p, v) => p + v), 27);
  assert.strictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 1.0).reduce((p, v) => p + v), 27);
  assert.strictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 1.5).reduce((p, v) => p + v), 27);
  assert.strictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 2.0).reduce((p, v) => p + v), 27.000000000000004);
  assert.strictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 2.5).reduce((p, v) => p + v), 26.640625);
  assert.strictEqual(blur1([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0], 3.0).reduce((p, v) => p + v), 26.370262390670547);
});

// it("blur() blurs in 2D", () => {
//   const h = blur();
//   assert.deepEqual(
//     h.width(4).radiusX(1).radiusY(1)([0, 0, 0, 0, 729, 0, 0, 0, 0, 0, 0, 0]),
//     Object.assign(Float32Array.from([117, 81, 36, 9, 117, 81, 36, 9, 117, 81, 36, 9]), { width: 4, height: 3 })
//   );
// });

// it("blur().radiusY(0) blurs horizontally", () => {
//   const h = blur();
//   assert.deepEqual(
//     h.width(4).radiusX(1).radiusY(0)([27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
//     Object.assign(Float32Array.from([13, 9, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0]), { width: 4, height: 3 })
//   );
// });

// it("blur().radiusX(0) blurs vertically", () => {
//   const h = blur();
//   assert.deepEqual(
//     h.width(4).radiusX(0).radiusY(1)([0, 0, 0, 27, 3, -9, 0, 0, 0, 0, 0, 0]),
//     Object.assign(Float32Array.from([1, -3, 0, 13, 1, -3, 0, 9, 1, -3, 0, 5]), { width: 4, height: 3 })
//   );
// });

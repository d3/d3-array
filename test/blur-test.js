import assert from "assert";
import {blur} from "../src/index.js";

it("blur() returns a default blur generator", () => {
  const h = blur();
  assert.equal(h.radius(), 5);
  assert.equal(h.radiusX(), 5);
  assert.equal(h.radiusY(), 5);
  assert.equal(h.width(), undefined);
  assert.equal(h.value(), undefined);
});

it("blur() blurs in 1D", () => {
  const h = blur();
  assert.deepEqual(
    h.radius(1).width(0)([0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0]),
    Object.assign(Float32Array.from([0, 0, 0, 1, 3, 6, 7, 6, 3, 1, 0, 0, 0, 0]), { width: 14, height: 1 })
  );
});

it("blur() blurs in 2D", () => {
  const h = blur();
  assert.deepEqual(
    h.width(4).radiusX(1).radiusY(1)([0, 0, 0, 0, 729, 0, 0, 0, 0, 0, 0, 0]),
    Object.assign(Float32Array.from([117, 81, 36, 9, 117, 81, 36, 9, 117, 81, 36, 9]), { width: 4, height: 3 })
  );
});

it("blur().radiusY(0) blurs horizontally", () => {
  const h = blur();
  assert.deepEqual(
    h.width(4).radiusX(1).radiusY(0)([27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    Object.assign(Float32Array.from([13, 9, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0]), { width: 4, height: 3 })
  );
});

it("blur().radiusX(0) blurs vertically", () => {
  const h = blur();
  assert.deepEqual(
    h.width(4).radiusX(0).radiusY(1)([0, 0, 0, 27, 3, -9, 0, 0, 0, 0, 0, 0]),
    Object.assign(Float32Array.from([1, -3, 0, 13, 1, -3, 0, 9, 1, -3, 0, 5]), { width: 4, height: 3 })
  );
});

it("blur().radius(0.5) does a fraction of blur", () => {
  const h = blur().width(5), V = [0,0,0,0,0, 0,0,5184,0,0, 0,0,0,0,0];
  assert.deepEqual(
    h.radius(0.5)(V),
    Object.assign(Float32Array.from([64, 96, 544, 96, 64, 256, 384, 2176, 384, 256, 64, 96, 544, 96, 64]), { width: 5,  height: 3 })
  );
});

it("blur().radius(1.2) does a fraction of blur", () => {
  const h = blur(), V = [0,0,0,0,0, 0,0,1,0,0, 0,0,0,0,0];
  const V1 = h.radius(1)(V);
  const V2 = h.radius(2)(V);
  for (let i = 0; i < V1.length; i++) V1[i] = 0.8 * V1[i] + 0.2 * V2[i];
  assert.deepEqual(Array.from(h.radius(1.2)(V)), Array.from(V1));
});

it("blur().radius() returns the (average) radius", () => {
  const h = blur();
  assert.equal(h.width(2).radiusX(1).radiusY(1).radius(), 1);
  assert.equal(h.width(2).radius(2).radius(), 2);
  assert.equal(h.width(2).radiusX(1).radiusY(5).radius(), 3);
});

it("blur() accepts an iterable", () => {
  const h = blur().radius(1);
  assert.deepEqual(h(new Set([27, 0, -27])), Object.assign(Float32Array.from([8, 0, -8]), { width: 3, height: 1 }));
  assert.deepEqual(h.value(d => d.a)(new Set([{a: 27}, {a: 0}, {a: -27}])), Object.assign(Float32Array.from([8, 0, -8]), { width: 3, height: 1 }));
});

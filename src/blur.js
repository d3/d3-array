import {floor, max, min} from "./math.js";

function blurTransfer(V, r, n, vertical) {
  if (!r) return; // radius 0 is a noop

  const iterations = 3, r0 = Math.floor(r);
  // for a non-integer radius, interpolate between floor(r) and ceil(r)
  if (r === r0) {
    for (let i = 0; i < iterations; i++) {
      blurTransferInt(V, r, n, vertical);
    }
  } else {
    const frac = r - r0, frac_1 = 1 - frac;
    const data = V[0].slice();
    for (let i = 0; i < iterations; i++) {
      blurTransferInt(V, r0 + 1, n, vertical);
    }
    const data_ceil = V[0];
    V[0] = data;
    if (r0 > 0) {
      for (let i = 0; i < iterations; i++) {
        blurTransferInt(V, r0, n, vertical);
      }
    }
    for (let i = 0; i < data.length; i++) {
      V[0][i] = V[0][i] * frac_1 + data_ceil[i] * frac;
    }
  }
}

function blurTransferInt(V, r, n, vertical) {
  const [source, target] = V,
    m = floor(source.length / n),
    w = 2 * r + 1,
    w1 = 1 / w,
    ki = vertical ? m : 1,
    kj = vertical ? 1 : n,
    W = w * ki,
    R = r * ki;

  for (let j = 0; j < m; ++j) {
    const k0 = kj * j,
      kn = k0 + ki * (n - 1);
    for (let i = 0, sr = w * source[k0]; i < n + r; ++i) {
      const k = ki * i + kj * j;
      sr += source[min(k, kn)] - source[max(k - W, k0)];
      target[max(k - R, k0)] = sr * w1;
    }
  }
  V.reverse(); // target becomes V[0] and will be used as source in the next iteration
}

export default function blur() {
  let rx = 5,
    ry = rx,
    value,
    width;

  function blur(data) {
    const n = width || data.length,
      m = Math.round(data.length / n),
      V = [
        value ? Float32Array.from(data, value) : Float32Array.from(data),
        new Float32Array(data.length)
      ];

    blurTransfer(V, rx, n, false);
    blurTransfer(V, ry, m, true);

    V[0].width = n;
    V[0].height = m;
    return V[0];
  }

  blur.radius = _ =>  _ === undefined
    ? (rx + ry) / 2
    : (rx = ry = +_, blur);
  blur.radiusX = _ =>  _ === undefined
    ? rx : (rx = +_, blur);
  blur.radiusY = _ =>  _ === undefined
    ? ry : (ry = +_, blur);
  blur.width = _ =>
    _ === undefined ? width : (width = Math.round(+_), blur);
  blur.value = _ =>
    typeof _ === "function" ? (value = _, blur) : value;

  return blur;
}

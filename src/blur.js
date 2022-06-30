export function blur1(values, r) {
  if (!((r = +r) >= 0)) throw new RangeError("invalid r");
  if (r !== 0) bluri(values, r, values.length, 1, blurh);
  return values;
}

export function blur2(values, width, rx, ry = rx) {
  if (!((rx = +rx) >= 0)) throw new RangeError("invalid rx");
  if (!((ry = +ry) >= 0)) throw new RangeError("invalid ry");
  if (!((width = Math.floor(width)) >= 0)) throw new RangeError("invalid width");
  if (width === 0) return values;
  const height = Math.floor(values.length / width);
  if (rx !== 0) bluri(values, rx, width, height, blurh);
  if (ry !== 0) bluri(values, ry, width, height, blurv);
  return values;
}

function bluri(V, r, w, h, blurf) {
  let T = V;
  let S = V.slice();
  const r0 = Math.floor(r);
  if (r === r0) {
    blurf(T, S, r, w, h);
    blurf(S, T, r, w, h);
    blurf(T, S, r, w, h);
  } else {
    const r1 = r0 + 1;
    const t1 = r - r0;
    const t0 = 1 - t1;
    const T0 = T;
    const T1 = T.slice();
    if (r0 > 0) {
      blurf(T0, T1, r0, w, h); // T1 as temporary
      blurf(T1, T0, r0, w, h);
      blurf(T0, T1, r0, w, h);
    }
    blurf(T1, S, r1, w, h);
    blurf(S, T1, r1, w, h);
    blurf(T1, S, r1, w, h);
    for (let i = 0, n = T.length; i < n; ++i) {
      T[i] = T1[i] * t1 + T0[i] * t0;
    }
  }
}

function blurh(T, S, r, w, h) {
  for (let y = 0; y < h; ++y) {
    blurs(T, S, r, y * w, y * w + w, 1);
  }
}

function blurv(T, S, r, w, h) {
  for (let x = 0; x < w; ++x) {
    blurs(T, S, r, x, w * h, w);
  }
}

// Given a target array T and a source array S, sets each value T[i] to the
// average of {S[i - r], …, S[i], …, S[i + r]}, where start <= i < stop, for
// each i, i + step, i + 2 * step, etc., and where S[j] is clamped between
// S[start] (inclusive) and S[stop] (exclusive).
function blurs(T, S, r, start, stop, step) {
  if (!((start = Math.floor(start)) >= 0)) throw new RangeError("invalid start");
  if (!((stop = Math.floor(stop)) >= 0)) throw new RangeError("invalid stop");
  if (!((step = Math.floor(step)) > 0)) throw new RangeError("invalid step");
  if (!((r = Math.floor(r)) >= 0)) throw new RangeError("invalid r");
  stop = start + (Math.floor((stop - start) / step) - 1) * step; // make inclusive
  if (stop < start) return;
  let sum = r * S[start];
  for (let i = start, j = start + step * r; i < j; i += step) {
    sum += S[Math.max(start, Math.min(stop, i))];
  }
  for (let i = start, j = stop, s = step * r, w = 2 * r + 1; i <= j; i += step) {
    sum += S[Math.min(stop, i + s)]; // TODO optimize by moving outside of loop?
    T[i] = sum / w;
    sum -= S[Math.max(start, i - s)]; // TODO optimize by moving outside of loop?
  }
}

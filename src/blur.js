export function blur1(values, r) {
  if (!((r = +r) >= 0)) throw new RangeError("invalid r");
  if (r === 0) return values;
  const T = values;
  const S = values.slice();
  const width = Math.floor(values.length);
  const height = 1;
  blurh(T, S, r, width, height);
  blurh(S, T, r, width, height);
  blurh(T, S, r, width, height);
  return values;
}

export function blur2(values, width, rx, ry = rx) {
  if (!((rx = +rx) >= 0)) throw new RangeError("invalid rx");
  if (!((ry = +ry) >= 0)) throw new RangeError("invalid ry");
  if (!((width = Math.floor(width)) >= 0)) throw new RangeError("invalid width");
  if (width === 0 || (rx === 0 && ry === 0)) return values;
  const T = values;
  const S = values.slice();
  const height = Math.floor(values.length / width);
  if (rx !== 0) {
    blurh(T, S, rx, width, height);
    blurh(S, T, rx, width, height);
    blurh(T, S, rx, width, height);
  }
  if (ry !== 0) {
    blurv(T, S, ry, width, height);
    blurv(S, T, ry, width, height);
    blurv(T, S, ry, width, height);
  }
  return values;
}

function blurh(T, S, r, w, h) {
  for (let y = 0; y < h; ++y) {
    blurf(T, S, r, y * w, y * w + w, 1);
  }
}

function blurv(T, S, r, w, h) {
  for (let x = 0; x < w; ++x) {
    blurf(T, S, r, x, w * h, w);
  }
}

// Given a target array T, a source array S, sets each value T[i] to the average
// of {S[i - r], …, S[i], …, S[i + r]}, where r = ⌊radius⌋, start <= i < stop,
// for each i, i + step, i + 2 * step, etc., and where S[j] is clamped between
// S[start] (inclusive) and S[stop] (exclusive). If the given radius is not an
// integer, S[i - r - 1] and S[i + r + 1] are added to the sum, each weighted
// according to r - ⌊radius⌋.
function blurf(T, S, radius, start, stop, step) {
  if (radius === Math.floor(radius)) return bluri(T, S, radius, start, stop, step);
  stop = start + (Math.floor((stop - start) / step) - 1) * step; // inclusive stop
  if (!(stop >= start)) return;
  const radius0 = Math.floor(radius);
  const t = radius - radius0;
  let sum = radius0 * S[start];
  for (let i = start, j = start + step * radius0; i < j; i += step) {
    sum += S[Math.max(start, Math.min(stop, i))];
  }
  for (let i = start, j = stop, s = step * radius0, w = 2 * radius + 1; i <= j; i += step) {
    sum += S[Math.min(stop, i + s)];
    T[i] = (sum + t * (S[Math.max(start, i - s - step)] + S[Math.min(stop, i + s + step)])) / w;
    sum -= S[Math.max(start, i - s)];
  }
}

// Like blurf, but optimized for integer radius.
function bluri(T, S, radius, start, stop, step) {
  stop = start + (Math.floor((stop - start) / step) - 1) * step; // inclusive stop
  if (!(stop >= start)) return;
  let sum = radius * S[start];
  for (let i = start, j = start + step * radius; i < j; i += step) {
    sum += S[Math.max(start, Math.min(stop, i))];
  }
  for (let i = start, j = stop, s = step * radius, w = 2 * radius + 1; i <= j; i += step) {
    sum += S[Math.min(stop, i + s)];
    T[i] = sum / w;
    sum -= S[Math.max(start, i - s)];
  }
}

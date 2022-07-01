export function blur1(values, r) {
  if (!((r = +r) >= 0)) throw new RangeError("invalid r");
  if (!r) return values;
  const temp = values.slice();
  const width = Math.floor(values.length);
  const height = 1;
  const blur = blurf(r);
  blurh(blur, values, temp, width, height);
  blurh(blur, temp, values, width, height);
  blurh(blur, values, temp, width, height);
  return values;
}

export function blur2(values, width, rx, ry = rx, stride = 1) {
  if (!((rx = +rx) >= 0)) throw new RangeError("invalid rx");
  if (!((ry = +ry) >= 0)) throw new RangeError("invalid ry");
  if (!((width = Math.floor(width)) >= 0)) throw new RangeError("invalid width");
  if (!((stride = Math.floor(stride)) > 0)) throw new RangeError("invalid stride");
  if (!width || (!rx && !ry)) return values;
  const temp = values.slice();
  const height = Math.floor(values.length / width / stride);
  const blurx = blurf(rx);
  const blury = blurf(ry);
  if (rx && ry) {
    blurh(blurx, temp, values, width, height, stride);
    blurh(blurx, values, temp, width, height, stride);
    blurh(blurx, temp, values, width, height, stride);
    blurv(blury, values, temp, width * stride, height);
    blurv(blury, temp, values, width * stride, height);
    blurv(blury, values, temp, width * stride, height);
  } else if (rx) {
    blurh(blurx, values, temp, width, height, stride);
    blurh(blurx, temp, values, width, height, stride);
    blurh(blurx, values, temp, width, height, stride);
  } else if (ry) {
    blurv(blury, values, temp, width * stride, height);
    blurv(blury, temp, values, width * stride, height);
    blurv(blury, values, temp, width * stride, height);
  }
  return values;
}

function blurh(blur, T, S, w, h, stride = 1) {
  for (let a = 0; a < stride; ++a) {
    for (let y = a, n = w * h * stride; y < n;) {
      blur(T, S, y, y += w * stride, stride);
    }
  }
}

function blurv(blur, T, S, w, h) {
  for (let x = 0, n = w * h; x < w; ++x) {
    blur(T, S, x, x + n, w);
  }
}

// Given a target array T, a source array S, sets each value T[i] to the average
// of {S[i - r], …, S[i], …, S[i + r]}, where r = ⌊radius⌋, start <= i < stop,
// for each i, i + step, i + 2 * step, etc., and where S[j] is clamped between
// S[start] (inclusive) and S[stop] (exclusive). If the given radius is not an
// integer, S[i - r - 1] and S[i + r + 1] are added to the sum, each weighted
// according to r - ⌊radius⌋.
function blurf(radius) {
  const radius0 = Math.floor(radius);
  if (radius0 === radius) return bluri(radius);
  const t = radius - radius0;
  const w = 2 * radius + 1;
  return (T, S, start, stop, step) => {
    stop = start + (Math.floor((stop - start) / step) - 1) * step; // inclusive stop
    if (!(stop >= start)) return;
    let sum = radius0 * S[start];
    for (let i = start, j = start + step * radius0; i < j; i += step) {
      sum += S[Math.max(start, Math.min(stop, i))];
    }
    for (let i = start, j = stop, s = step * radius0; i <= j; i += step) {
      sum += S[Math.min(stop, i + s)];
      T[i] = (sum + t * (S[Math.max(start, i - s - step)] + S[Math.min(stop, i + s + step)])) / w;
      sum -= S[Math.max(start, i - s)];
    }
  };
}

// Like blurf, but optimized for integer radius.
function bluri(radius) {
  const w = 2 * radius + 1;
  return (T, S, start, stop, step) => {
    stop = start + (Math.floor((stop - start) / step) - 1) * step; // inclusive stop
    if (!(stop >= start)) return;
    let sum = radius * S[start];
    for (let i = start, j = start + step * radius; i < j; i += step) {
      sum += S[Math.max(start, Math.min(stop, i))];
    }
    for (let i = start, j = stop, s = step * radius; i <= j; i += step) {
      sum += S[Math.min(stop, i + s)];
      T[i] = sum / w;
      sum -= S[Math.max(start, i - s)];
    }
  };
}

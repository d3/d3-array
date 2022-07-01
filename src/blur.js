export function blur1(values, r) {
  if (!((r = +r) >= 0)) throw new RangeError("invalid r");
  const length = Math.floor(values.length);
  if (!(length >= 0)) throw new RangeError("invalid length");
  if (!length || !r) return values;
  const temp = values.slice();
  const blur = blurf(r);
  blurh(blur, values, temp, length, 1);
  blurh(blur, temp, values, length, 1);
  blurh(blur, values, temp, length, 1);
  return values;
}

export function blur2(data, rx, ry = rx) {
  if (!((rx = +rx) >= 0)) throw new RangeError("invalid rx");
  if (!((ry = +ry) >= 0)) throw new RangeError("invalid ry");
  let {data: values, width, height} = data;
  if (!((width = Math.floor(width)) >= 0)) throw new RangeError("invalid width");
  if (!((height = Math.floor(height)) >= 0)) throw new RangeError("invalid height");
  if (!width || !height || (!rx && !ry)) return data;
  const temp = values.slice();
  const blurx = blurf(rx);
  const blury = blurf(ry);
  if (rx && ry) {
    blurh(blurx, temp, values, width, height);
    blurh(blurx, values, temp, width, height);
    blurh(blurx, temp, values, width, height);
    blurv(blury, values, temp, width, height);
    blurv(blury, temp, values, width, height);
    blurv(blury, values, temp, width, height);
  } else if (rx) {
    blurh(blurx, values, temp, width, height);
    blurh(blurx, temp, values, width, height);
    blurh(blurx, values, temp, width, height);
  } else if (ry) {
    blurv(blury, values, temp, width, height);
    blurv(blury, temp, values, width, height);
    blurv(blury, values, temp, width, height);
  }
  return data;
}

function blurh(blur, T, S, w, h) {
  for (let y = 0, n = w * h; y < n;) {
    blur(T, S, y, y += w, 1);
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
    const s0 = step * radius0;
    const s1 = s0 + step;
    for (let i = start, j = start + s0; i < j; i += step) {
      sum += S[Math.max(start, Math.min(stop, i))];
    }
    for (let i = start, j = stop; i <= j; i += step) {
      sum += S[Math.min(stop, i + s0)];
      T[i] = (sum + t * (S[Math.max(start, i - s1)] + S[Math.min(stop, i + s1)])) / w;
      sum -= S[Math.max(start, i - s0)];
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
    const s = step * radius;
    for (let i = start, j = start + s; i < j; i += step) {
      sum += S[Math.max(start, Math.min(stop, i))];
    }
    for (let i = start, j = stop; i <= j; i += step) {
      sum += S[Math.min(stop, i + s)];
      T[i] = sum / w;
      sum -= S[Math.max(start, i - s)];
    }
  };
}

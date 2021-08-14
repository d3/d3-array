import ascending from "./ascending.js";

export default function bisector(f) {
  let delta = f;
  let compare1 = f;
  let compare2 = f;

  if (f.length === 1) {
    delta = (d, x) => f(d) - x;
    compare1 = x => ascending(x, x);
    compare2 = (d, x) => ascending(f(d), x);
  }

  function left(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    if (lo < hi && compare1(x, x) !== 0) return hi;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (compare2(a[mid], x) < 0) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  function right(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    if (lo < hi && compare1(x, x) !== 0) return hi;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (compare2(a[mid], x) <= 0) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  function center(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return {left, center, right};
}

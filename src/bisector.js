import ascending from "./ascending.js";

export default function bisector(f) {
  let delta = f;
  let compare = f;

  // If an accessor is specified, promote it to a comparator.
  if (f.length !== 2) {
    delta = (d, x) => f(d) - x;
    compare = (d, x) => ascending(f(d), x);
  }

  function left(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      let ohi = hi, c;
      do {
        const mid = (lo + hi) >>> 1;
        if ((c = compare(a[mid], x)) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
      if (!(c <= c)) return ohi; // x is not orderable
    }
    return lo;
  }

  function right(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      let ohi = hi, c;
      do {
        const mid = (lo + hi) >>> 1;
        if ((c = compare(a[mid], x)) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
      if (!(c <= c)) return ohi; // x is not orderable
    }
    return lo;
  }

  function center(a, x, lo = 0, hi = a.length) {
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return {left, center, right};
}

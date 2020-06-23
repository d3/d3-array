// adapted from https://github.com/python/cpython/blob/master/Modules/mathmodule.c#L1444
export default function(iterable, valueof) {
  const partials = [];

  const isIterable = object =>
    object != null && typeof object[Symbol.iterator] === 'function';

  const Adder = {
    partials,
    add: function(t, valueof) {
      const p = partials;
      let n = p.length, i, j, tmp, y, hi, lo, index = -1;
      if (valueof && isIterable(t)) for (let x of t) {
        x = +valueof(x, ++index, t);
        if (isNaN(x)) continue;
        for (i = j = 0; j < n && j < 32; j++) {
          if (Math.abs(x) < Math.abs(y = p[j])) tmp = x, x = y, y = tmp;
          hi = x + y;
          lo = y - (hi - x);
          if (lo) p[i++] = lo;
          x = hi;
        }
        n = i;
        p[n++] = x;
      }
      else for (let x of isIterable(t) ? t : [t]) {
        if (isNaN(x = +x)) continue;
        for (i = j = 0; j < n && j < 32; j++) {
          if (Math.abs(x) < Math.abs(y = p[j])) tmp = x, x = y, y = tmp;
          hi = x + y;
          lo = y - (hi - x);
          if (lo) p[i++] = lo;
          x = hi;
        }
        n = i;
        p[n++] = x;
      }
      p.splice(n, 32);
      return Adder;
    },
    valueOf: function() {
      let n = partials.length,
        x,
        y,
        hi = 0,
        lo;
      if (n > 0) {
        hi = partials[--n];
        while (n > 0) {
          x = hi;
          y = partials[--n];
          hi = x + y;
          lo = y - (hi - x);
          if (lo) break;
        }
        if (
          n > 0 &&
          ((lo < 0 && partials[n - 1] < 0) || (lo > 0 && partials[n - 1] > 0))
        ) {
          y = lo * 2.0;
          x = hi + y;
          if (y == x - hi) hi = x;
        }
      }
      return hi;
    },
    reset: function() {
      partials.length = 0;
    }
  };

  if (iterable) Adder.add(iterable, valueof);
  return Adder;
}
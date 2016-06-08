export default function(array, f) {
  var s0 = 0,
      s1,
      e = 0,
      v,
      n = array.length,
      i = -1;

  if (f == null) {
    while (++i < n) if (v = +array[i]) { // Ignore zero, NaN.
      s1 = s0 + (v -= e);
      e = s1 - s0 - v;
      s0 = s1;
    }
  }

  else {
    while (++i < n) if (v = +f(array[i], i, array)) { // Ignore zero, NaN.
      s1 = s0 + (v -= e);
      e = s1 - s0 - v;
      s0 = s1;
    }
  }

  return s0;
}

import number from "./number";
import accessor from './accessor';

export default function(array, f) {
  var n = array.length,
      m = 0,
      a,
      d,
      s = 0,
      i = -1,
      j = 0;

  while (++i < n) {
    if (!isNaN(a = number(accessor(f, i, array)))) {
      d = a - m;
      m += d / ++j;
      s += d * (a - m);
    }
  }

  if (j > 1) return s / (j - 1);
}

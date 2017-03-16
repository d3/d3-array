import accessor from './accessor';
import number from "./number";

export default function(array, f) {
  var s = 0,
      n = array.length,
      a,
      i = -1,
      j = n;

  while (++i < n) if (!isNaN(a = number(accessor(f, i, array)))) s += a; else --j;

  if (j) return s / j;
}

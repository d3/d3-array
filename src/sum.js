import accessor from './accessor';

export default function(array, f) {
  var s = 0,
      n = array.length,
      a,
      i = -1;

  while (++i < n) if (a = +accessor(f, i, array)) s += a; // Note: zero and null are equivalent.

  return s;
}

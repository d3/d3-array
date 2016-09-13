import accessor from './accessor';

export default function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b;

  while (++i < n) if ((b = accessor(f, i, array)) != null && b >= b) { a = b; break; }
  while (++i < n) if ((b = accessor(f, i, array)) != null && b > a) a = b;

  return a;
}

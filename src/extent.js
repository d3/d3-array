import accessor from './accessor';

export default function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b,
      c;

  while (++i < n) if ((b = accessor(f, i, array)) != null && b >= b) { a = c = b; break; }
  while (++i < n) if ((b = accessor(f, i, array)) != null) {
    if (a > b) a = b;
    if (c < b) c = b;
  }

  return [a, c];
}

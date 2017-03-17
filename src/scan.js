import ascending from "./ascending";

export default function(array, compare) {
  var n;
  if (!(n = array.length)) return;
  var i = 0,
      j = 0,
      xi,
      xj = array[j];

  if (!compare) compare = ascending;

  while (++i < n) if (compare(xi = array[i], xj) < 0 || compare(xj, xj) !== 0) xj = xi, j = i;

  if (compare(xj, xj) === 0) return j;
}

import {ascending} from './ascending';

export function scan(values, compare) {
  let n;
  if (!(n = values.length)) return;
  let i = 0,
    j = 0,
    xi,
    xj = values[j];

  if (!compare) compare = ascending;

  while (++i < n) {
    if (compare(xi = values[i], xj) < 0 || compare(xj, xj) !== 0) {
      xj = xi;
      j = i;
    }
  }

  if (compare(xj, xj) === 0) return j;
}

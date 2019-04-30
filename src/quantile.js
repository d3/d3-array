import number from "./number.js";
import identity from "./identity.js";

export default function quantile(values, p, valueof = number) {
  values = Array.from(values)
    .map((d, i) => valueof(d, i, values))
    .filter(v => !isNaN(v))
    .sort((a, b) => a - b);
  var n = values.length;
  if (!n) return;
  if ((p = +p) <= 0 || n < 2) return +values[0];
  if (p >= 1) return +values.pop();
  return quantileSorted(values, p, identity);
}

export function quantileSorted(values, p, valueof = number) {
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}

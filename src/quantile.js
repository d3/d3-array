import max from "./max.js";
import min from "./min.js";
import quickselect from "./quickselect.js";
import number, {numbers} from "./number.js";

export default function quantile(values, p, valueof = number) {
  var v = Float64Array.from(numbers(values, valueof));
  if (!(n = v.length)) return;
  if ((p = +p) <= 0 || n < 2) return min(v);
  if (p >= 1) return max(v);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i);
  quickselect(v, i0);
  var value0 = max(v.subarray(0, i0 + 1)), value1 = min(v.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
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

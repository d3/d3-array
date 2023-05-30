import max from "./max.js";
import maxIndex from "./maxIndex.js";
import min from "./min.js";
import minIndex from "./minIndex.js";
import quickselect from "./quickselect.js";
import number, {numbers} from "./number.js";
import {ascendingDefined} from "./sort.js";
import greatest from "./greatest.js";

export default function quantile(values, p, valueof) {
  values = Float64Array.from(numbers(values, valueof));
  if (!(n = values.length) || isNaN(p = +p)) return;
  if (p <= 0 || n < 2) return min(values);
  if (p >= 1) return max(values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = max(quickselect(values, i0).subarray(0, i0 + 1)),
      value1 = min(values.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
}

export function quantileSorted(values, p, valueof = number) {
  if (!(n = values.length) || isNaN(p = +p)) return;
  if (p <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}

export function quantileIndex(values, p, valueof = number) {
  if (isNaN(p = +p)) return;
  if (p <= 0) return minIndex(values, valueof);
  if (p >= 1) return maxIndex(values, valueof);
  var index = Uint32Array.from(values, (_, i) => i),
      j = index.length - 1,
      i = Math.floor(j * p),
      value = (i) => number(valueof(values[i], i, values)),
      order = (i, j) => ascendingDefined(value(i), value(j));
  quickselect(index, i, 0, j, order);
  i = greatest(index.subarray(0, i + 1), value);
  return i >= 0 ? i : -1;
}

import {numbers} from "./number.js";
import quantile from "./quantile.js";
import quickselect from "./quickselect.js";

export default function(values, valueof) {
  values = Float64Array.from(numbers(values, valueof));
  if (!values.length) return;
  const n = values.length;
  const i = n >> 1;
  quickselect(values, i - 1, 0);
  if ((n & 1) === 0) quickselect(values, i, i);
  return quantile(values, 0.5);
}

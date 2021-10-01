import range from "./range.js";
import sort from "./sort.js";

export default function rank(values, valueof) {
  values = Array.from(values, valueof);
  const n = values.length;
  const r = new Float64Array(n);
  let last, l;
  sort(range(n), (i) => values[i]).forEach((j, i) => {
    const value = values[j];
    if (value == null || !(value <= value)) {
      r[j] = NaN;
      return;
    }
    if (last === undefined || !(value <= last)) {
      last = value;
      l = i;
    }
    r[j] = l;
  });
  return r;
}

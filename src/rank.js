import range from "./range.js";
import sort from "./sort.js";

export default function rank(values, ties = "low", valueof) {
  if (typeof ties === "function") {
    valueof = ties; ties = "low";
  }
  values = Array.from(values, valueof);
  const n = values.length;
  const r = new Float64Array(n);

  let last, l;
  const order = sort(range(n), (i) => values[i]);
  order.forEach((j, i) => {
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

  // backtrack to handle ties: low, mean, round, high, order
  if (ties === "order") {
    order.forEach((i,j) => r[i] = isNaN(r[i]) ? NaN : j);
  } else if (ties !== "low") {
    let find, replace;
    for (let i = n - 1; i >= 0; i--) {
      const j = r[order[i]];
      if (i !== j && find !== j) {
        find = j;
        switch (ties) {
          case "mean": replace = (i + j) / 2; break;
          case "round": replace = (i + j) >> 1; break;
          case "high": replace = i; break;
        }
      }
      if (j === find) r[order[i]] = replace;
    }
  }

  return r;
}

import ascending from "./ascending.js";

export default function leastIndex(values, f = ascending) {
  const valueof = f.length === 1 ? f : undefined,
    compare = f.length === 2 ? f : ascending;
  let min, v;
  let minIndex = -1;
  let index = -1;
  if (valueof === undefined) {
    for (const value of values) {
      ++index;
      if (minIndex < 0
          ? compare(value, value) === 0
          : compare(value, min) < 0) {
        min = value;
        minIndex = index;
      }
    }
  } else {
    for (const value of values) {
      ++index;
      v = valueof(value);
      if (minIndex < 0
          ? compare(v, v) === 0
          : compare(v, min) < 0) {
        min = v;
        minIndex = index;
      }
    }
  }
  return minIndex;
}

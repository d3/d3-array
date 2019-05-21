import ascending from "./ascending.js";

export default function least(values, f = ascending) {
  const valueof = f.length === 1 ? f : undefined,
    compare = f.length === 2 ? f : ascending;
  let min, minv, v, defined = false;
  if (valueof === undefined) {
    for (const value of values) {
      if (defined
          ? compare(value, min) < 0
          : compare(value, value) === 0) {
        min = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      v = valueof(value);
      if (defined
          ? compare(v, minv) < 0
          : compare(v, v) === 0) {
        min = value;
        minv = v;
        defined = true;
      }
    }
  }
  return min;
}

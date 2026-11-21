import primitive from "./primitive.js";

export default function extent(values, valueof) {
  let min;
  let max;
  let lo;
  let hi;
  if (valueof === undefined) {
    for (const value of values) {
      const x = primitive(value);
      if (x != null) {
        if (min === undefined) {
          if (x >= x) min = max = value, lo = hi = x;
        } else {
          if (lo > x) min = value, lo = x;
          if (hi < x) max = value, hi = x;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      const x = primitive(value = valueof(value, ++index, values));
      if (x != null) {
        if (min === undefined) {
          if (x >= x) min = max = value, lo = hi = x;
        } else {
          if (lo > x) min = value, lo = x;
          if (hi < x) max = value, hi = x;
        }
      }
    }
  }
  return [min, max];
}

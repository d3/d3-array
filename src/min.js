import primitive from "./primitive.js";

export default function min(values, valueof) {
  let min;
  let v;
  if (valueof === undefined) {
    for (const value of values) {
      const x = primitive(value);
      if (x != null
          && (v > x || (min === undefined && x >= x))) {
        min = value, v = x;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      const x = primitive(value = valueof(value, ++index, values));
      if (x != null
          && (v > x || (min === undefined && x >= x))) {
        min = value, v = x;
      }
    }
  }
  return min;
}

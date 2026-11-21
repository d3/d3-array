import primitive from "./primitive.js";

export default function max(values, valueof) {
  let max;
  let v;
  if (valueof === undefined) {
    for (const value of values) {
      const x = primitive(value);
      if (x != null
          && (v < x || (max === undefined && x >= x))) {
        max = value, v = x;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      const x = primitive(value = valueof(value, ++index, values));
      if (x != null
          && (v < x || (max === undefined && x >= x))) {
        max = value, v = x;
      }
    }
  }
  return max;
}

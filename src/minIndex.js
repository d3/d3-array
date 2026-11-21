import primitive from "./primitive.js";

export default function minIndex(values, valueof) {
  let min;
  let minIndex = -1;
  let index = -1;
  if (valueof === undefined) {
    for (const value of values) {
      ++index;
      const x = primitive(value);
      if (x != null
          && (min > x || (min === undefined && x >= x))) {
        min = x, minIndex = index;
      }
    }
  } else {
    for (let value of values) {
      const x = primitive(valueof(value, ++index, values));
      if (x != null
          && (min > x || (min === undefined && x >= x))) {
        min = x, minIndex = index;
      }
    }
  }
  return minIndex;
}

import primitive from "./primitive.js";

export default function maxIndex(values, valueof) {
  let max;
  let maxIndex = -1;
  let index = -1;
  if (valueof === undefined) {
    for (const value of values) {
      ++index;
      const x = primitive(value);
      if (x != null
          && (max < x || (max === undefined && x >= x))) {
        max = x, maxIndex = index;
      }
    }
  } else {
    for (let value of values) {
      const x = primitive(valueof(value, ++index, values));
      if (x != null
          && (max < x || (max === undefined && x >= x))) {
        max = x, maxIndex = index;
      }
    }
  }
  return maxIndex;
}

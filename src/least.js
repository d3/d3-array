import ascending from "./ascending.js";

export default function least(values, compare = ascending) {
  let min;
  let defined = false;
  if (compare.length === 1) {
    let minValue;
    for (const element of values) {
      const value = compare(element);
      if (value != null && (defined
          ? ascending(value, minValue) < 0
          : ascending(value, value) === 0
        )) {
        min = element;
        minValue = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      if (value != null && (defined
          ? compare(value, min) < 0
          : compare(value, value) === 0
        )) {
        min = value;
        defined = true;
      }
    }
  }
  return min;
}

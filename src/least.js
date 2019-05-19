import ascending from "./ascending.js";

export default function least(values, compare = ascending) {
  let min;
  let defined = false;
  for (const value of values) {
    if (defined
        ? compare(value, min) < 0
        : compare(value, value) === 0) {
      min = value;
      defined = true;
    }
  }
  return min;
}

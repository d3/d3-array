import number from "./number.js"

export default function count(values, valueof = number) {
  let count = 0, index = -1;
  for (const value of values) {
    if (!isNaN(valueof(value, ++index, values))) ++count;
  }
  return count;
}
export default function maxIndex(values, valueof) {
  let max;
  let maxIndex = -1;
  let index = -1;
  if (valueof === undefined) {
    valueof = (value) => value;
  }
  for (let value of values) {
    if ((value = valueof(value, ++index, values)) != null
      && (max < value || (max === undefined && value >= value))) {
      max = value, maxIndex = index;
    }
  }
  return maxIndex;
}

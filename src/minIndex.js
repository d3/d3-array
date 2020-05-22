export default function minIndex(values, valueof) {
  let min;
  let minIndex = -1;
  let index = -1;
  if (valueof === undefined) {
    valueof = (value) => value;
  }
  for (let value of values) {
    if ((value = valueof(value, ++index, values)) != null
      && (min > value || (min === undefined && value >= value))) {
      min = value, minIndex = index;
    }
  }
  return minIndex;
}

export default function min(values, valueof) {
  let min;
  if (valueof === undefined) {
    valueof = (value) => value;
  }
  let index = -1;
  for (let value of values) {
    if ((value = valueof(value, ++index, values)) != null
      && (min > value || (min === undefined && value >= value))) {
      min = value;
    }
  }
  return min;
}

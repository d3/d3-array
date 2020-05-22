export default function max(values, valueof) {
  let max;
  if (valueof === undefined) {
    valueof = (value) => value;
  }
  let index = -1;
  for (let value of values) {
    if ((value = valueof(value, ++index, values)) != null
      && (max < value || (max === undefined && value >= value))) {
      max = value;
    }
  }
  return max;
}

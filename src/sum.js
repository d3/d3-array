export default function sum(values, valueof) {
  let sum0 = 0, sum1, error = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value = +value) {
        sum1 = sum0 + (value -= error);
        error = sum1 - sum0 - value;
        sum0 = sum1;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if (value = +valueof(value, ++index, values)) {
        sum1 = sum0 + (value -= error);
        error = sum1 - sum0 - value;
        sum0 = sum1;
      }
    }
  }
  return sum0;
}

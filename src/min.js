import identity from "./identity";
export default function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      accessorFn = valueof || identity,
      min;

  while (++i < n) { // Find the first comparable value.
    if ((value = accessorFn(values[i], i, values)) != null && value >= value) {
      min = value;
      while (++i < n) { // Compare the remaining values.
        if ((value = accessorFn(values[i], i, values)) != null && min > value) {
          min = value;
        }
      }
    }
  }

  return min;
}

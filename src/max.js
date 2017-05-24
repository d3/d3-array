import returnvalue from "returnvalue";
export default function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      accessorFn = valueof || returnvalue,
      max;

  while (++i < n) { // Find the first comparable value.
    if ((value = accessorFn(values[i], i, values)) != null && value >= value) {
      max = value;
      while (++i < n) { // Compare the remaining values.
        if ((value = accessorFn(values[i], i, values)) != null && value > max) {
          max = value;
        }
      }
    }
  }
  
  return max;
}

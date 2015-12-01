import number from "./number";
import mean from "./mean";

export default function(array, f) {
  var m = mean(array),
      sum3 = 0,
      sum2 = 0,
      v,
      i = -1,
      j = 0,
      n = array.length;

  if (arguments.length === 1) {
    while (++i < n) {
      if (!isNaN(a = number(array[i]))) {
        v = a - m;
        sum2 += v * v;
        sum3 += v * v * v;
      }
    }
  }
  
  else {
    while (++i < n) {
      if (!isNaN(a = number(f(array[i], i, array)))) {
        v = a - m;
        sum2 += v * v;
        sum3 += v * v * v;
      }
    }
  }

  return (n * Math.sqrt(n - 1) / (n - 2)) * (sum3 / Math.pow(sum2, 3 / 2)));
};
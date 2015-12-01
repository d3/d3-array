import number from "./number";
import mean from "./mean";

export default function(array, f) {
  var m,
      farray,
      sum3 = 0,
      sum2 = 0,
      v,
      a,
      i = -1,
      j = 0,
      n = array.length;

  if (arguments.length === 1) {
    farray = array;
  }
  else {
    farray = array.map(f);
  }

  m = mean(farray);
  while (++i < n) {
    if (!isNaN(a = number(farray[i]))) {
      v = a - m;
      sum2 += v * v;
      sum3 += v * v * v;
      j++;
    }
  }

  if (j > 2) return ((j * Math.sqrt(j - 1) / (j - 2)) * (sum3 / Math.pow(sum2, 3 / 2)));
};

import number from "./number";
import mean from "./mean";

export default function(array, f) {
  var m,
      farray,
      sum4 = 0,
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
  console.log("array: " + farray);
  console.log("mean: " + m);
  while (++i < n) {
    if (!isNaN(a = number(farray[i]))) {
      v = a - m;
      sum2 += v * v;
      sum4 += v * v * v * v;
      j++;
    }
  }

  if (j > 3) {
    return (j * (j + 1) * (j - 1) * sum4) / ((j - 2) * (j - 3) * sum2 * sum2) -
           (3 * Math.pow(j - 1, 2) / ((j - 2) * (j - 3)));
  }
};

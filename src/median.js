import ascending from "./ascending";
import number from "./number";
import quantile from "./quantile";

export default function(array, f) {
  var numbers = [],
      n = array.length,
      a,
      i = -1;

  if (arguments.length === 1) {
    while (++i < n) if (!isNaN(a = number(array[i]))) numbers.push(a);
  }

  else {
    while (++i < n) if (!isNaN(a = number(f.call(array, array[i], i)))) numbers.push(a);
  }

  if (numbers.length) return quantile(numbers.sort(ascending), .5);
};

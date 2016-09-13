import ascending from "./ascending";
import number from "./number";
import quantile from "./quantile";
import accessor from './accessor';

export default function(array, f) {
  var numbers = [],
      n = array.length,
      a,
      i = -1;

  while (++i < n) if (!isNaN(a = number(accessor(f, i, array)))) numbers.push(a);

  return quantile(numbers.sort(ascending), 0.5);
}

import number from "./number";

export default function(array, f) {
  var s = 0,
      n = array.length,
      a,
      i = -1,
      j = n;

  if (arguments.length === 1) {
    while (++i < n) if (!isNaN(a = number(array[i]))) s += a; else --j;
  }

  else {
    while (++i < n) if (!isNaN(a = number(f.call(array, array[i], i)))) s += a; else --j;
  }

  if (j) return s / j;
};

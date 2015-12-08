import number from "./number";

export default function(array, p, f) {
  if (arguments.length < 3) f = number;
  if (!(n = array.length)) return undefined;
  if ((p = +p) <= 0 || n < 2) return +f(array[0], 0, array);
  if (p >= 1) return +f(array[n - 1], n - 1, array);
  var n,
      h = (n - 1) * p + 1,
      i = Math.floor(h),
      a = +f(array[i - 1], i - 1, array),
      b = +f(array[i], i, array);
  return a + (b - a) * (h - i);
};

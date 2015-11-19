export default function(array, f) {
  var s = 0,
      n = array.length,
      a,
      i = -1;

  if (arguments.length === 1) {
    while (++i < n) if (!isNaN(a = +array[i])) s += a; // Note: zero and null are equivalent.
  }

  else {
    while (++i < n) if (!isNaN(a = +f(array[i], i, array))) s += a;
  }

  return s;
};

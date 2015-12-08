function linear(a, b, t) {
  return (a = +a) + (b - a) * t;
}

export default function(array, p, f) {
  if (arguments.length < 3) f = linear;
  if ((n = array.length) < 2) return n ? f(array[0], array[0], 0) : undefined;
  var n,
      h = (n - 1) * Math.max(0, p) + 1,
      i = h < n ? Math.floor(h) : (h = n, n - 1);
  return f(array[i - 1], array[i], h - i);
};

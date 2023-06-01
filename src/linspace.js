export default function(start, stop, n = 50, endpoint = true) {
  n = Math.floor(n), start = +start, stop = (stop - start) / (endpoint ? n - 1 : n);

  var i = -1,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * stop;
  }

  return range;
}

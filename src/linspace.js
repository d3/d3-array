export default function(start, stop, n = 50, endpoint = true) {
  n = Math.floor(n);
  start = +start;
  stop = (stop - start) / (endpoint ? n - 1 : n);

  const range = new Array(n);
  for (let i = 0; i < n; ++i) range[i] = start + i * stop;

  return range;
}

export default function(start, stop, step) {
  if ((n = arguments.length) < 3) {
    step = 1;
    if (n < 2) {
      stop = start;
      start = 0;
    }
  }

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      k = scale(Math.abs(step)),
      range = new Array(n);

  start *= k;
  step *= k;
  while (++i < n) {
    range[i] = (start + i * step) / k;
  }

  return range;
};

function scale(x) {
  var k = 1;
  while (x * k % 1) k *= 10;
  return k;
}

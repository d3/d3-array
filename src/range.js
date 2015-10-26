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
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
};

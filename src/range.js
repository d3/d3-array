export default function(start, stop, step) {
  step = step == null ? 1 : +step;
  if (stop == null) stop = +start, start = 0;
  else start = +start, stop = +stop;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
};

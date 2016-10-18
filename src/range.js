export default function(start, stop, step) {
  var n;
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ?
      (stop = start, start = 0, 1) :
      n < 3 ? 1 : +step;

  var i = -1;
  n = Math.max(0, Math.ceil((stop - start) / step)) | 0;
  var range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

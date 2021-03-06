export default function(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = (stop - start) / step,
      floor_n = Math.floor(n);
  
  if(n > 0 && n - floor_n < 1e-10) n = floor_n;//so that d3.range(0, 1, 1/49) returns 49 elements!
  else n = Math.max(0, Math.ceil(n)) | 0;
      
  var range = new Array(n);
  
  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

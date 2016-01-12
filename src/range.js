export default function(start, stop, step) {
  var m = arguments.length,
      start_ = +start,
      stop_ = +stop,
      step_ = m < 2 ? (stop_ = start_, start_ = 0, 1) : m < 3 ? 1 : +step,
      i = -1,
      n = Math.max(0, Math.ceil((stop_ - start_) / step_)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start_ + i * step_;
  }

  return range;
};

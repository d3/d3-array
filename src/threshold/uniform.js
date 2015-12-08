export function uniform(min, max, n) {
  var h = (max - min) / (n + 1),
      thresholds = new Array(n),
      i = -1;
  min += h;
  while (++i < n) thresholds[i] = min + i * h;
  return thresholds;
};

export default function(n) {
  return function(min, max) {
    return uniform(min, max, n);
  };
};

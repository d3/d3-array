const e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

const logParams = {
  binary: [Math.log2, 2],
  natural: [(n) => Math.log1p(n - 1), Math.E],
  common: [Math.log10, 10],
}

function tickSpec(start, stop, count, log = 'common') {
  const [logFn, base] = logParams[log] || logParams.common;
  const step = (stop - start) / Math.max(0, count),
    power = Math.floor(logFn(step)),
    error = step / Math.pow(base, power),
    factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(base, -power) / factor;
    i1 = Math.round(start * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(base, power) * factor;
    i1 = Math.round(start / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2, log);
  return [i1, i2, inc];
}

export default function ticks(start, stop, count, log) {
  stop = +stop, start = +start, count = +count;
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count, log) : tickSpec(start, stop, count, log);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1, ticks = new Array(n);
  if (reverse) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) * inc;
  }
  return ticks;
}

export function tickIncrement(start, stop, count, log) {
  (stop = +stop), (start = +start), (count = +count);
  return tickSpec(start, stop, count, log)[2];
}

export function tickStep(start, stop, count, log) {
  stop = +stop, start = +start, count = +count;
  const reverse = stop < start,
    inc = reverse
      ? tickIncrement(stop, start, count, log)
      : tickIncrement(start, stop, count, log);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

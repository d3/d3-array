const e10 = Math.sqrt(50),
  e5 = Math.sqrt(10),
  e2 = Math.sqrt(2);

function tickSpec(start, stop, count) {
  const step = (stop - start) / Math.max(0, count),
    power = Math.floor(Math.log10(step)),
    error = step / Math.pow(10, power),
    factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  if (power < 0) {
    let step = Math.pow(10, -power) / factor,
      i = Math.round(start * step),
      j = Math.round(stop * step);
    if (i / step < start) ++i;
    if (j / step > stop) --j;
    if (j < i && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
    return [i, j, -step];
  } else {
    let step = Math.pow(10, power) * factor,
      i = Math.round(start / step),
      j = Math.round(stop / step);
    if (i * step < start) ++i;
    if (j * step > stop) --j;
    if (j < i && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
    return [i, j, step];
  }
}

export default function ticks(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse = stop < start, [r0, r1, step] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
  if (!(r1 >= r0)) return [];
  const n = r1 - r0 + 1, ticks = new Array(n);
  if (reverse) {
    if (step < 0) for (let i = 0; i < n; ++i) ticks[i] = (r1 - i) / -step;
    else for (let i = 0; i < n; ++i) ticks[i] = (r1 - i) * step;
  } else {
    if (step < 0) for (let i = 0; i < n; ++i) ticks[i] = (r0 + i) / -step;
    else for (let i = 0; i < n; ++i) ticks[i] = (r0 + i) * step;
  }
  return ticks;
}

export function tickIncrement(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  return tickSpec(start, stop, count)[2];
}

export function tickStep(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  const reverse = stop < start, step = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
  return (reverse ? -1 : 1) * (step < 0 ? 1 / -step : step);
}

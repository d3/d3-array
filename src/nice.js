import {tickIncrement} from "./ticks.js";

export default function nice(start, stop, count) {
  if (count > 0) count = Math.max(count, start < 0 && stop > 0 ? 2 : 1);
  let prestep;
  while (true) {
    const step = tickIncrement(start, stop, count);
    if (step === prestep || step === 0 || !isFinite(step)) {
      return [start, stop];
    } else if (step > 0) {
      const i = Math.ceil(start / step);
      const j = Math.floor(stop / step);
      start = (i - (i * step > start)) * step;
      stop = (j + (j * step < stop)) * step;
    } else if (step < 0) {
      const s = -step;
      const i = Math.ceil(start * s);
      const j = Math.floor(stop * s);
      start = (i - (i / s > start)) / s;
      stop = (j + (j / s < stop)) / s;
    }
    prestep = step;
  }
}

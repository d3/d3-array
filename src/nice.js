import {tickIncrement} from "./ticks.js";

export default function nice(start, stop, count, base) {
  let prestep;
  while (true) {
    const step = tickIncrement(start, stop, count, base);
    if (step === prestep || step === 0 || !isFinite(step)) {
      return [start, stop];
    } else if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
    }
    prestep = step;
  }
}

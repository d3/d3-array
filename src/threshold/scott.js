import count from "../count.js";
import deviation from "../deviation.js";

export default function thresholdScott(values, min, max) {
  return Math.ceil((max - min) / (3.49 * deviation(values) * Math.pow(count(values), -1 / 3)));
}

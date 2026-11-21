import primitive from "./primitive.js";

export default function ascending(a, b) {
  a = primitive(a), b = primitive(b);
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

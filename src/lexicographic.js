import ascending from "./ascending.js";

export default function(a, b) {
  for (let i = 0; i < a.length; i++) {
    const s = ascending(a[i], b[i]);
    if (s || isNaN(s)) return s;
  }
  return 0;
}

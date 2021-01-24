import ascending from "./ascending.js";
import permute from "./permute.js";

export default function sort(values, ...order) {
  if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
  values = Array.from(values);
  const [f = ascending] = order;
  if (f.length === 1 || order.length > 1) {
    order = order.map(f => values.map(f));
    return permute(values, values.map((d, i) => i).sort((i, j) => {
      for (const f of order) {
        const c = ascending(f[i], f[j]);
        if (c) return c;
      }
    }));
  }
  return values.sort(f);
}

import sort from "./sort.js";

export default function rank(values, ...F) {
  if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
  const V = Array.from(values);
  const R = new Float64Array(V.length);
  const [f] = F;
  let order = Uint32Array.from(V, (_, i) => i), leq, comparable;
  if (f == null) {
    order = sort(order, i => V[i]);
    leq = (a, b) => a <= b;
    comparable = a => a <= a;
  } else if (F.length === 1 && f.length === 2) {
    order = sort(order, (i, j) => f(V[i], V[j]));
    leq = (a, b) => f(a, b) <= 0;
    comparable = a => f(a, a) <= 0;
  } else {
    order = sort(order, ...F.map(f => i => f(V[i])));
    leq = (a, b) => F.every(f => f(a) <= f(b));
    comparable = a => F.some(f => f(a) <= f(a));
  }

  let last, l;
  order.forEach((j, i) => {
    const value = V[j];
    if (value == null || !comparable(value)) {
      R[j] = NaN;
      return;
    }
    if (last === undefined || !leq(value, last)) {
      last = value;
      l = i;
    }
    R[j] = l;
  });

  return R;
}

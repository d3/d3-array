import {ascendingDefined, compareDefined} from "./sort.js";

export default function rank(values, valueof) {
  if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
  const V = Array.from(values);
  const R = new Float64Array(V.length);
  const compare = valueof === undefined ? ascendingIndex(V)
      : valueof.length === 1 ? ascendingIndex(V.map(valueof))
      : compareIndex(V, valueof);
  let k, r;
  Uint32Array.from(V, (_, i) => i).sort(compare).forEach((j, i) => {
    if (compare(j, j) !== 0) {
      R[j] = NaN;
      return;
    }
    if (k === undefined || !(compare(j, k) <= 0)) {
      k = j;
      r = i;
    }
    R[j] = r;
  });
  return R;
}

function ascendingIndex(V) {
  return (i, j) => ascendingDefined(V[i], V[j]);
}

function compareIndex(V, compare) {
  return compareDefined((i, j) => compare(V[i], V[j]));
}

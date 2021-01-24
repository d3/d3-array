import ascending from "./ascending.js";
import group, {rollup} from "./group.js";
import max from "./max.js";
import median from "./median.js";
import min from "./min.js";
import sort from "./sort.js";

export default function groupSort(values, reduce, key) {
  return (reduce.length === 1
    ? sort(rollup(values, reduce, key), (([ak, av], [bk, bv]) => ascending(av, bv) || ascending(ak, bk)))
    : sort(group(values, key), (([ak, av], [bk, bv]) => reduce(av, bv) || ascending(ak, bk))))
    .map(([key]) => key);
}

export function maxSort(values, valueof, key) {
  return groupSort(values, group => max(group, valueof), key);
}

export function medianSort(values, valueof, key) {
  return groupSort(values, group => median(group, valueof), key);
}

export function minSort(values, valueof, key) {
  return groupSort(values, group => min(group, valueof), key);
}

import ascending from "./ascending.js";
import group, {flatGroup, flatRollup, rollup} from "./group.js";
import lexicographic from "./lexicographic.js";
import sort from "./sort.js";

export default function groupSort(values, reduce, key) {
  return (reduce.length === 1
    ? sort(rollup(values, reduce, key), (([ak, av], [bk, bv]) => ascending(av, bv) || ascending(ak, bk)))
    : sort(group(values, key), (([ak, av], [bk, bv]) => reduce(av, bv) || ascending(ak, bk))))
    .map(([key]) => key);
}

export function flatGroupSort(values, reduce, ...keys) {
  return (reduce.length === 1
    ? sort(flatRollup(values, reduce, ...keys).map(d => [d.pop(), ...d]), lexicographic)
    : sort(flatGroup(values, ...keys).map(d => [d.pop(), ...d]),
      ([av, ...ak], [bv, ...bk]) => reduce(av, bv) || lexicographic(ak, bk)))
    .map(k => k.slice(1));
}

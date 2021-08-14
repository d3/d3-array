import {ascendingDefined} from "./ascending.js";
import group, {rollup} from "./group.js";
import sort from "./sort.js";

export default function groupSort(values, reduce, key) {
  return (reduce.length === 1
    ? sort(rollup(values, reduce, key), (([ak, av], [bk, bv]) => ascendingDefined(av, bv) || ascendingDefined(ak, bk)))
    : sort(group(values, key), (([ak, av], [bk, bv]) => reduce(av, bv) || ascendingDefined(ak, bk))))
    .map(([key]) => key);
}

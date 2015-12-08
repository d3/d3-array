import {uniform} from "./uniform";
import ascending from "../ascending";
import quantile from "../quantile";

export default function(min, max, values) {
  values.sort(ascending);
  var h = 2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3),
      k = Math.ceil((max - min) / h);
  return uniform(min, max, k - 1);
};

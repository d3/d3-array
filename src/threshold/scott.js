import {uniform} from "./uniform";
import deviation from "../deviation";

export default function(min, max, values) {
  var h = 3.5 * deviation(values) * Math.pow(values.length, -1 / 3),
      k = Math.ceil((max - min) / h);
  return uniform(min, max, k - 1);
};

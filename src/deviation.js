import {variance} from "./variance";

export function deviation(array, f) {
  var v = variance(array, f);
  return v ? Math.sqrt(v) : v;
}

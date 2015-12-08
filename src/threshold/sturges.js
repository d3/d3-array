import {uniform} from "./uniform";

export default function(min, max, values) {
  return uniform(min, max, Math.ceil(Math.log(values.length) / Math.LN2));
};

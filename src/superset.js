import set from "./set.js";

export default function superset(values, other) {
  values = set(values);
  for (const value of other) {
    if (!values.has(value)) {
      return false;
    }
  }
  return true;
}

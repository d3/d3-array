import set from "./set.js";

export default function disjoint(values, other) {
  other = set(other);
  for (const value of values) {
    if (other.has(value)) {
      return false;
    }
  }
  return true;
}

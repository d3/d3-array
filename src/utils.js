export function arrayify(values) {
  return typeof values !== "object" || "length" in values ? values : Array.from(values);
}

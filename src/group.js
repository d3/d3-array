import identity from "./identity.js";
import rollup from "./rollup.js";

export default function group(values, ...keys) {
  return rollup(values, identity, ...keys);
}

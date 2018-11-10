import identity from "./identity";
import rollup from "./rollup";

export default function group(values) {
  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }
  return rollup.apply(undefined, [values, identity].concat(keys));
}

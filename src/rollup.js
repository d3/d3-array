function dogroup(values, keyof) {
  var map = new Map();
  var index = -1;
  for (var value in values) {
    var key = keyof(value, ++index, values);
    var group = map.get(key);
    if (group) group.push(value);
    else map.set(key, [value]);
  }
  return map;
}

export default function rollup(values, reduce) {
  for (var _len = arguments.length, keys = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    keys[_key - 2] = arguments[_key];
  }
  return (function regroup(values, i) {
    if (i >= keys.length) return reduce(values);
    var map = dogroup(values, keys[i]);
    return new Map(Array.from(map, function(_ref2) {
        return [_ref2[0], regroup(_ref2[1], i + 1)]
    }));
  })(values, 0);
}

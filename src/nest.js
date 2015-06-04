export default function() {
  var keys = [],
      sortKeys = [],
      sortValues,
      rollup,
      nest;

  function map(array, depth) {
    if (depth >= keys.length) return rollup
        ? rollup.call(nest, array) : (sortValues
        ? array.sort(sortValues)
        : array);

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        value,
        valuesByKey = new Map,
        values;

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(value = array[i]))) {
        values.push(value);
      } else {
        valuesByKey.set(keyValue, [value]);
      }
    }

    valuesByKey.forEach(function(values, key) {
      valuesByKey.set(key, map(values, depth));
    });

    return valuesByKey;
  }

  function entries(map, depth) {
    if (depth >= keys.length) return map;

    var array = new Array(map.size),
        i = -1,
        sortKey = sortKeys[depth++];

    map.forEach(function(value, key) {
      array[++i] = {key: key, values: entries(value, depth)};
    });

    return sortKey
        ? array.sort(function(a, b) { return sortKey(a.key, b.key); })
        : array;
  }

  return nest = {
    map: function(array) { return map(array, 0); },
    entries: function(array) { return entries(map(array, 0), 0); },
    key: function(d) { keys.push(d); return nest; },
    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
    sortValues: function(order) { sortValues = order; return nest; },
    rollup: function(f) { rollup = f; return nest; }
  };
};

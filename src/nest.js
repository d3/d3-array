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
        keyValues = [],
        object,
        valuesByKey = new Map,
        values;

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
        values.push(object);
      } else {
        keyValues.push(keyValue);
        valuesByKey.set(keyValue, [object]);
      }
    }

    object = new Map;
    keyValues.forEach(function(keyValue) {
      object.set(keyValue, map(valuesByKey.get(keyValue), depth));
    });

    return object;
  }

  function entries(map, depth) {
    if (depth >= keys.length) return map;

    var array = [],
        sortKey = sortKeys[depth++];

    map.forEach(function(key, keyMap) {
      array.push({key: key, values: entries(keyMap, depth)});
    });

    return sortKey
        ? array.sort(function(a, b) { return sortKey(a.key, b.key); })
        : array;
  }

  return nest = {
    map: function(array) {
      return map(array, 0);
    },
    entries: function(array) {
      return entries(map(array, 0), 0);
    },
    key: function(d) {
      keys.push(d);
      return nest;
    },
    sortKeys: function(order) {
      sortKeys[keys.length - 1] = order;
      return nest;
    },
    sortValues: function(order) {
      sortValues = order;
      return nest;
    },
    rollup: function(f) {
      rollup = f;
      return nest;
    }
  };
};

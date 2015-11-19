import {default as map, prefix} from "./map";

function Set() {}

var proto = map.prototype;

Set.prototype = set.prototype = {
  has: proto.has,
  add: function(value) {
    value += "";
    this[prefix + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};

function set(object) {
  var set = new Set;

  // Copy constructor.
  if (object instanceof Set) object.each(function(value) { set.add(value); });

  // Otherwise, assume it’s an array.
  else if (object) for (var i = 0, n = object.length; i < n; ++i) set.add(object[i]);

  return set;
}

export default set;

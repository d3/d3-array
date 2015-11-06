import {default as map, prefix} from "./map";

function Set() {}

var proto = map.prototype;

Set.prototype = set.prototype = {
  has: proto.has,
  add: function(value) {
    value += "";
    this[prefix + value] = true;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: function(f) {
    for (var property in this) if (property[0] === prefix) f.call(this, property.slice(1));
  }
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

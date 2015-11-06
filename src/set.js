import {default as map, prefix} from "./map";

function Set() {}

var proto = map.prototype;

Set.prototype = set.prototype = {
  has: proto.has,
  add: function(value) {
    value += "";
    this[prefix + value] = true;
    return value;
  },
  remove: proto.remove,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  forEach: function(f, context) {
    var value, context = context || this;
    for (var property in this) if (property[0] === prefix) f.call(context, value = property.slice(1), value, this);
  }
};

function set(array) {
  var set = new Set;
  if (array) for (var i = 0, n = array.length; i < n; ++i) set.add(array[i]);
  return set;
}

export default set;

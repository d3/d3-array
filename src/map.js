export var prefix = "$";

function Map() {}

Map.prototype = map.prototype = {
  has: function(key) {
    return (prefix + key) in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    return this[prefix + key] = value;
  },
  remove: function(key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  keys: function() {
    var keys = [];
    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function() {
    var values = [];
    for (var property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function() {
    var entries = [];
    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
    return entries;
  },
  size: function() {
    var size = 0;
    for (var property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function() {
    for (var property in this) if (property[0] === prefix) return false;
    return true;
  },
  forEach: function(f) {
    for (var property in this) if (property[0] === prefix) f.call(this, property.slice(1), this[property]);
  }
};

function map(object, f) {
  var map = new Map;

  // Copy constructor.
  if (object instanceof Map) object.forEach(function(key, value) { map.set(key, value); });

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
        n = object.length,
        o;

    if (arguments.length === 1) while (++i < n) map.set(i, object[i]);
    else while (++i < n) map.set(f.call(object, o = object[i], i), o);
  }

  // Convert object to map.
  else for (var key in object) map.set(key, object[key]);

  return map;
}

export default map;

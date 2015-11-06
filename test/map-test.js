var tape = require("tape"),
    arrays = require("../");

tape("map() returns an empty map", function(test) {
  var m = arrays.map();
  test.equal(m instanceof arrays.map, true);
  test.deepEqual(m.keys(), []);
  test.end();
});

tape("map(null) returns an empty map", function(test) {
  var m = arrays.map(null);
  test.deepEqual(m.keys(), []);
  test.end();
});

tape("map(object) copies enumerable keys", function(test) {
  var m = arrays.map({foo: 42});
  test.equal(m.has("foo"), true);
  test.equal(m.get("foo"), 42);
  var m = arrays.map(Object.create(null, {foo: {value: 42, enumerable: true}}));
  test.equal(m.has("foo"), true);
  test.equal(m.get("foo"), 42);
  test.end();
});

tape("map(object) copies inherited keys", function(test) {
  function Foo() {}
  Foo.prototype.foo = 42;
  var m = arrays.map(Object.create({foo: 42}));
  test.equal(m.has("foo"), true);
  test.equal(m.get("foo"), 42);
  var m = arrays.map(new Foo());
  test.equal(m.has("foo"), true);
  test.equal(m.get("foo"), 42);
  test.end();
});

tape("map(object) does not copy non-enumerable keys", function(test) {
  var m = arrays.map({__proto__: 42}); // because __proto__ isn't enumerable
  test.equal(m.has("__proto__"), false);
  test.equal(m.get("__proto__"), undefined);
  var m = arrays.map(Object.create(null, {foo: {value: 42, enumerable: false}}));
  test.equal(m.has("foo"), false);
  test.equal(m.get("foo"), undefined);
  test.end();
});

tape("map(map) copies the given map", function(test) {
  var a = arrays.map({foo: 42}),
      b = arrays.map(a);
  test.equal(b.has("foo"), true);
  test.equal(b.get("foo"), 42);
  a.set("bar", true);
  test.equal(b.has("bar"), false);
  test.end();
});

tape("map(array) creates a map by index", function(test) {
  test.deepEqual(arrays.map(["foo", "bar"]).entries(), [{key: "0", value: "foo"}, {key: "1", value: "bar"}]);
  test.end();
});

tape("map(array) indexes missing elements in sparse arrays", function(test) {
  test.deepEqual(arrays.map(["foo", , "bar"]).entries(), [{key: "0", value: "foo"}, {key: "1", value: undefined}, {key: "2", value: "bar"}]);
  test.end();
});

tape("map(array, f) creates a map by accessor", function(test) {
  test.deepEqual(arrays.map([{field: "foo"}, {field: "bar"}], function(d) { return d.field; }).entries(), [{key: "foo", value: {field: "foo"}}, {key: "bar", value: {field: "bar"}}]);
  test.deepEqual(arrays.map([{field: "foo"}, {field: "bar"}], function(d, i) { return i; }).entries(), [{key: "0", value: {field: "foo"}}, {key: "1", value: {field: "bar"}}]);
  test.deepEqual(arrays.map([{field: "foo"}, {field: "bar"}], function(d, i) { return this[i].field; }).entries(), [{key: "foo", value: {field: "foo"}}, {key: "bar", value: {field: "bar"}}]);
  test.end();
});

tape("map.size() returns the number of distinct keys", function(test) {
  var m = arrays.map();
  test.equal(m.size(), 0);
  m.set("foo", 1);
  test.equal(m.size(), 1);
  m.set("foo", 2);
  test.equal(m.size(), 1);
  m.set("bar", 2);
  test.equal(m.size(), 2);
  m.remove("foo");
  test.equal(m.size(), 1);
  m.remove("foo");
  test.equal(m.size(), 1);
  m.remove("bar");
  test.equal(m.size(), 0);
  test.end();
});

tape("map.clear() removes all entries", function(test) {
  var m = arrays.map();
  m.set("foo", 1);
  m.set("bar", 2);
  m.set("foo", 3);
  m.clear();
  test.equal(m.size(), 0);
  test.deepEqual(m.entries(), []);
  test.end();
});

tape("map.empty() returns true only if the map is empty", function(test) {
  var m = arrays.map();
  test.equal(m.empty(), true);
  m.set("foo", 1);
  test.equal(m.empty(), false);
  m.set("foo", 2);
  test.equal(m.empty(), false);
  m.set("bar", 2);
  test.equal(m.empty(), false);
  m.remove("foo");
  test.equal(m.empty(), false);
  m.remove("foo");
  test.equal(m.empty(), false);
  m.remove("bar");
  test.equal(m.empty(), true);
  test.end();
});

tape("map.each(callback) passes value and key", function(test) {
  var m = arrays.map({foo: 1, bar: "42"}),
      c = [];
  m.each(function(v, k) { c.push([k, v]); });
  c.sort(function(a, b) { return a[0].localeCompare(b[0]); });
  test.deepEqual(c, [["bar", "42"], ["foo", 1]]);
  test.end();
});

tape("map.each(callback) uses the map as the context", function(test) {
  var m = arrays.map({foo: 1, bar: "42"}),
      c = [];
  m.each(function() { c.push(this); });
  test.strictEqual(c[0], m);
  test.strictEqual(c[1], m);
  test.equal(c.length, 2);
  test.end();
});

tape("map.each(callback) iterates in arbitrary order", function(test) {
  var m1 = arrays.map({foo: 1, bar: "42"}),
      m2 = arrays.map({bar: "42", foo: 1}),
      c1 = [],
      c2 = [];
  m1.each(function(v, k) { c1.push([k, v]); });
  m2.each(function(v, k) { c2.push([k, v]); });
  c1.sort(function(a, b) { return a[0].localeCompare(b[0]); });
  c2.sort(function(a, b) { return a[0].localeCompare(b[0]); });
  test.deepEqual(c1, c2);
  test.end();
});

tape("map.keys() returns an array of string keys", function(test) {
  var m = arrays.map({foo: 1, bar: "42"});
  test.deepEqual(m.keys().sort(), ["bar", "foo"]);
  test.end();
});

tape("map.keys() properly unescapes zero-prefixed keys", function(test) {
  var m = arrays.map();
  m.set("__proto__", 42);
  m.set("$weird", 42);
  test.deepEqual(m.keys().sort(), ["$weird", "__proto__"]);
  test.end();
});

tape("map.values() returns an array of arbitrary values", function(test) {
  var m = arrays.map({foo: 1, bar: "42"});
  test.deepEqual(m.values().sort(), [1, "42"]);
  test.end();
});

tape("map.entries() returns an array of key-value objects", function(test) {
  var m = arrays.map({foo: 1, bar: "42"});
  test.deepEqual(m.entries().sort(ascendingByKey), [{key: "bar", value: "42"}, {key: "foo", value: 1}]);
  test.end();
});

tape("map.entries() empty maps have an empty entries array", function(test) {
  var m = arrays.map();
  test.deepEqual(m.entries(), []);
  m.set("foo", "bar");
  test.deepEqual(m.entries(), [{key: "foo", value: "bar"}]);
  m.remove("foo");
  test.deepEqual(m.entries(), []);
  test.end();
});

tape("map.entries() entries are returned in arbitrary order", function(test) {
  var m = arrays.map({foo: 1, bar: "42"});
  test.deepEqual(m.entries().sort(ascendingByKey), [{key: "bar", value: "42"}, {key: "foo", value: 1}]);
  var m = arrays.map({bar: "42", foo: 1});
  test.deepEqual(m.entries().sort(ascendingByKey), [{key: "bar", value: "42"}, {key: "foo", value: 1}]);
  test.end();
});

tape("map.entries() observes changes via set and remove", function(test) {
  var m = arrays.map({foo: 1, bar: "42"});
  test.deepEqual(m.entries().sort(ascendingByKey), [{key: "bar", value: "42"}, {key: "foo", value: 1}]);
  m.remove("foo");
  test.deepEqual(m.entries(), [{key: "bar", value: "42"}]);
  m.set("bar", "bar");
  test.deepEqual(m.entries(), [{key: "bar", value: "bar"}]);
  m.set("foo", "foo");
  test.deepEqual(m.entries().sort(ascendingByKey), [{key: "bar", value: "bar"}, {key: "foo", value: "foo"}]);
  m.remove("bar");
  test.deepEqual(m.entries(), [{key: "foo", value: "foo"}]);
  m.remove("foo");
  test.deepEqual(m.entries(), []);
  m.remove("foo");
  test.deepEqual(m.entries(), []);
  test.end();
});

tape("map.has(key) empty maps do not have object built-ins", function(test) {
  var m = arrays.map();
  test.equal(m.has("__proto__"), false);
  test.equal(m.has("hasOwnProperty"), false);
  test.end();
});

tape("map.has(key) can has keys using built-in names", function(test) {
  var m = arrays.map();
  m.set("__proto__", 42);
  test.equal(m.has("__proto__"), true);
  test.end();
});

tape("map.has(key) can has keys with null or undefined properties", function(test) {
  var m = arrays.map();
  m.set("", "");
  m.set("null", null);
  m.set("undefined", undefined);
  test.equal(m.has(""), true);
  test.equal(m.has("null"), true);
  test.equal(m.has("undefined"), true);
  test.end();
});

tape("map.has(key) coerces keys to strings", function(test) {
  var m = arrays.map({"42": "foo", "null": 1, "undefined": 2});
  test.equal(m.has(42), true);
  test.equal(m.has(null), true);
  test.equal(m.has(undefined), true);
  test.end();
});

tape("map.has(key) returns the latest value", function(test) {
  var m = arrays.map({foo: 42});
  test.equal(m.has("foo"), true);
  m.set("foo", 43);
  test.equal(m.has("foo"), true);
  m.remove("foo");
  test.equal(m.has("foo"), false);
  m.set("foo", "bar");
  test.equal(m.has("foo"), true);
  test.end();
});

tape("map.has(key) returns undefined for missing keys", function(test) {
  var m = arrays.map({foo: 42});
  test.equal(m.has("bar"), false);
  test.end();
});

tape("map.get(key) empty maps do not have object built-ins", function(test) {
  var m = arrays.map();
  test.equal(m.get("__proto__"), undefined);
  test.equal(m.get("hasOwnProperty"), undefined);
  test.end()
});

tape("map.get(key) can get keys using built-in names", function(test) {
  var m = arrays.map();
  m.set("__proto__", 42);
  test.equal(m.get("__proto__"), 42);
  test.end()
});

tape("map.get(key) coerces keys to strings", function(test) {
  var m = arrays.map({"42": 1, "null": 2, "undefined": 3});
  test.equal(m.get(42), 1);
  test.equal(m.get(null), 2);
  test.equal(m.get(undefined), 3);
  test.end()
});

tape("map.get(key) returns the latest value", function(test) {
  var m = arrays.map({foo: 42});
  test.equal(m.get("foo"), 42);
  m.set("foo", 43);
  test.equal(m.get("foo"), 43);
  m.remove("foo");
  test.equal(m.get("foo"), undefined);
  m.set("foo", "bar");
  test.equal(m.get("foo"), "bar");
  test.end()
});

tape("map.get(key) returns undefined for missing keys", function(test) {
  var m = arrays.map({foo: 42});
  test.equal(m.get("bar"), undefined);
  test.end()
});

tape("map.set(key, value) returns the set value", function(test) {
  var m = arrays.map();
  test.equal(m.set("foo", 42), 42);
  test.end();
});

tape("map.set(key, value) can set keys using built-in names", function(test) {
  var m = arrays.map();
  m.set("__proto__", 42);
  test.equal(m.get("__proto__"), 42);
  test.end();
});

tape("map.set(key, value) can set keys using zero-prefixed names", function(test) {
  var m = arrays.map();
  m.set("$weird", 42);
  test.equal(m.get("$weird"), 42);
  test.end();
});

tape("map.set(key, value) coerces keys to strings", function(test) {
  var m = arrays.map();
  m.set(42, 1);
  test.equal(m.get(42), 1);
  m.set(null, 2);
  test.equal(m.get(null), 2);
  m.set(undefined, 3);
  test.equal(m.get(undefined), 3);
  test.deepEqual(m.keys().sort(), ["42", "null", "undefined"]);
  test.end();
});

tape("map.set(key, value) can replace values", function(test) {
  var m = arrays.map({foo: 42});
  test.equal(m.get("foo"), 42);
  m.set("foo", 43);
  test.equal(m.get("foo"), 43);
  m.set("foo", "bar");
  test.equal(m.get("foo"), "bar");
  test.end();
});

tape("map.set(key, value) can set null, undefined or empty string values", function(test) {
  var m = arrays.map();
  m.set("", "");
  m.set("null", null);
  m.set("undefined", undefined);
  test.equal(m.get(""), "");
  test.equal(m.get("null"), null);
  test.equal(m.get("undefined"), undefined);
  test.end();
});

function ascendingByKey(a, b) {
  return a.key.localeCompare(b.key);
}

var tape = require("tape"),
    arrays = require("../");

tape("nest.entries(array) returns the array of input values, in input order", function(test) {
  var nest = arrays.nest();
  test.deepEqual(nest.entries([1, 2, 3]), count([1, 2, 3], 3));
  test.deepEqual(nest.entries([1, 3, 2]), count([1, 3, 2], 3));
  test.deepEqual(nest.entries([3, 1, 2]), count([3, 1, 2], 3));
  test.end();
});

tape("nest.sortValues(order).entries(array) returns input values in sorted order", function(test) {
  var nestAscending = arrays.nest().sortValues(function(a, b) { return a.foo - b.foo; }),
      nestDescending = arrays.nest().sortValues(function(a, b) { return b.foo - a.foo; }),
      a = {foo: 1},
      b = {foo: 2},
      c = {foo: 3};
  test.deepEqual(nestAscending.entries([a, b, c]), count([a, b, c], 3));
  test.deepEqual(nestAscending.entries([a, c, b]), count([a, b, c], 3));
  test.deepEqual(nestAscending.entries([c, a, b]), count([a, b, c], 3));
  test.deepEqual(nestDescending.entries([a, b, c]), count([c, b, a], 3));
  test.deepEqual(nestDescending.entries([a, c, b]), count([c, b, a], 3));
  test.deepEqual(nestDescending.entries([c, a, b]), count([c, b, a], 3));
  test.end();
});

tape("nest.key(key).entries(array) returns entries for each distinct key, with values in input order", function(test) {
  var nest = arrays.nest().key(function(d) { return d.foo; }).sortKeys(arrays.ascending),
      a = {foo: 1},
      b = {foo: 1},
      c = {foo: 2};
  test.deepEqual(nest.entries([c, a, b, c]), count([{key: "1", values: count([a, b], 2)}, {key: "2", values: count([c, c], 2)}], 4));
  test.deepEqual(nest.entries([c, b, a, c]), count([{key: "1", values: count([b, a], 2)}, {key: "2", values: count([c, c], 2)}], 4));
  test.end();
});

tape("nest.key(key) coerces key values to strings", function(test) {
  var nest = arrays.nest().key(function(d) { return d.number ? 1 : "1"; }).sortKeys(arrays.ascending),
      a = {number: true},
      b = {number: false};
  test.deepEqual(nest.entries([a, b]), count([{key: "1", values: count([a, b], 2)}], 2));
  test.end();
});

tape("nest.key(key1).key(key2).entries(array) returns entries for each distinct key set, with values in input order", function(test) {
  var nest = arrays.nest().key(function(d) { return d.foo; }).sortKeys(arrays.ascending).key(function(d) { return d.bar; }).sortKeys(arrays.ascending),
      a = {foo: 1, bar: "a"},
      b = {foo: 1, bar: "a"},
      c = {foo: 2, bar: "a"},
      d = {foo: 1, bar: "b"},
      e = {foo: 1, bar: "b"},
      f = {foo: 2, bar: "b"};
  test.deepEqual(nest.entries([a, b, c, d, e, f]), count([{key: "1", values: count([{key: "a", values: count([a, b], 2)}, {key: "b", values: count([d, e], 2)}], 4)}, {key: "2", values: count([{key: "a", values: count([c], 1)}, {key: "b", values: count([f], 1)}], 2)}], 6));
  test.deepEqual(nest.entries([f, e, d, c, b, a]), count([{key: "1", values: count([{key: "a", values: count([b, a], 2)}, {key: "b", values: count([e, d], 2)}], 4)}, {key: "2", values: count([{key: "a", values: count([c], 1)}, {key: "b", values: count([f], 1)}], 2)}], 6));
  test.end();
});

tape("nest.key(key).sortKeys(order).entries(array) sorts entries by key using the specified order function", function(test) {
  var nest = arrays.nest().key(function(d) { return d.foo; }).sortKeys(arrays.descending),
      a = {foo: 1},
      b = {foo: 1},
      c = {foo: 2};
  test.deepEqual(nest.entries([c, a, b, c]), count([{key: "2", values: count([c, c], 2)}, {key: "1", values: count([a, b], 2)}], 4));
  test.deepEqual(nest.entries([c, b, a, c]), count([{key: "2", values: count([c, c], 2)}, {key: "1", values: count([b, a], 2)}], 4));
  test.end();
});

tape("nest.key(key1).sortKeys(order1).key(key2).sortKeys(order2).entries(array) sorts entries by key using the specified order functions", function(test) {
  var nest = arrays.nest().key(function(d) { return d.foo; }).sortKeys(arrays.descending).key(function(d) { return d.bar; }).sortKeys(arrays.descending),
      a = {foo: 1, bar: "a"},
      b = {foo: 1, bar: "a"},
      c = {foo: 2, bar: "a"},
      d = {foo: 1, bar: "b"},
      e = {foo: 1, bar: "b"},
      f = {foo: 2, bar: "b"};
  test.deepEqual(nest.entries([a, b, c, d, e, f]), count([{key: "2", values: count([{key: "b", values: count([f], 1)}, {key: "a", values: count([c], 1)}], 2)}, {key: "1", values: count([{key: "b", values: count([d, e], 2)}, {key: "a", values: count([a, b], 2)}], 4)}], 6));
  test.deepEqual(nest.entries([f, e, d, c, b, a]), count([{key: "2", values: count([{key: "b", values: count([f], 1)}, {key: "a", values: count([c], 1)}], 2)}, {key: "1", values: count([{key: "b", values: count([e, d], 2)}, {key: "a", values: count([b, a], 2)}], 4)}], 6));
  test.end();
});

tape("nest.rollup(rollup).entries(array) aggregates values using the specified rollup function", function(test) {
  test.equal(arrays.nest().rollup(function(values) { return values.length; }).entries([1, 2, 3, 4, 5]), 5);
  test.equal(arrays.nest().rollup(arrays.sum).entries([1, 2, 3, 4, 5]), 1 + 2 + 3 + 4 + 5);
  test.equal(arrays.nest().rollup(arrays.max).entries([1, 2, 3, 4, 5]), 5);
  test.deepEqual(arrays.nest().rollup(arrays.extent).entries([1, 2, 3, 4, 5]), [1, 5]);
  test.end();
});

tape("nest.rollup(rollup) uses the global this context", function(test) {
  var that;
  arrays.nest().rollup(function() { that = this; }).entries([1, 2, 3, 4, 5]);
  test.equal(that, global);
  test.end();
});

tape("nest.key(key).rollup(rollup).entries(array) aggregates values per key using the specified rollup function", function(test) {
  var a = {foo: 1},
      b = {foo: 1},
      c = {foo: 2};
  test.deepEqual(arrays.nest().key(function(d) { return d.foo; }).rollup(function(values) { return values.length; }).entries([a, b, c]), [{key: "1", values: 2}, {key: "2", values: 1}]);
  test.end();
});

tape("nest.map(array) returns the array of input values, in input order", function(test) {
  var nest = arrays.nest();
  test.deepEqual(nest.map([1, 2, 3]), [1, 2, 3]);
  test.deepEqual(nest.map([1, 3, 2]), [1, 3, 2]);
  test.deepEqual(nest.map([3, 1, 2]), [3, 1, 2]);
  test.end();
});

tape("nest.sortValues(order).map(array) returns input values in sorted order", function(test) {
  var nestAscending = arrays.nest().sortValues(function(a, b) { return a.foo - b.foo; }),
      nestDescending = arrays.nest().sortValues(function(a, b) { return b.foo - a.foo; }),
      a = {foo: 1},
      b = {foo: 2},
      c = {foo: 3};
  test.deepEqual(nestAscending.map([a, b, c]), [a, b, c]);
  test.deepEqual(nestAscending.map([a, c, b]), [a, b, c]);
  test.deepEqual(nestAscending.map([c, a, b]), [a, b, c]);
  test.deepEqual(nestDescending.map([a, b, c]), [c, b, a]);
  test.deepEqual(nestDescending.map([a, c, b]), [c, b, a]);
  test.deepEqual(nestDescending.map([c, a, b]), [c, b, a]);
  test.end();
});

tape("nest.key(key).map(array) returns entries for each distinct key, with values in input order", function(test) {
  var nest = arrays.nest().key(function(d) { return d.foo; }).sortKeys(arrays.ascending),
      a = {foo: 1},
      b = {foo: 1},
      c = {foo: 2};
  test.deepEqual(nest.map([c, a, b, c]), arrays.map({1: [a, b], 2: [c, c]}));
  test.deepEqual(nest.map([c, b, a, c]), arrays.map({1: [b, a], 2: [c, c]}));
  test.end();
});

tape("nest.key(key1).key(key2).map(array) returns entries for each distinct key set, with values in input order", function(test) {
  var nest = arrays.nest().key(function(d) { return d.foo; }).sortKeys(arrays.ascending).key(function(d) { return d.bar; }).sortKeys(arrays.ascending),
      a = {foo: 1, bar: "a"},
      b = {foo: 1, bar: "a"},
      c = {foo: 2, bar: "a"},
      d = {foo: 1, bar: "b"},
      e = {foo: 1, bar: "b"},
      f = {foo: 2, bar: "b"};
  test.deepEqual(nest.map([a, b, c, d, e, f]), arrays.map({1: arrays.map({a: [a, b], b: [d, e]}), 2: arrays.map({a: [c], b: [f]})}));
  test.deepEqual(nest.map([f, e, d, c, b, a]), arrays.map({1: arrays.map({a: [b, a], b: [e, d]}), 2: arrays.map({a: [c], b: [f]})}));
  test.end();
});

tape("nest.rollup(rollup).map(array) aggregates values using the specified rollup function", function(test) {
  test.equal(arrays.nest().rollup(function(values) { return values.length; }).map([1, 2, 3, 4, 5]), 5);
  test.equal(arrays.nest().rollup(arrays.sum).map([1, 2, 3, 4, 5]), 1 + 2 + 3 + 4 + 5);
  test.equal(arrays.nest().rollup(arrays.max).map([1, 2, 3, 4, 5]), 5);
  test.deepEqual(arrays.nest().rollup(arrays.extent).map([1, 2, 3, 4, 5]), [1, 5]);
  test.end();
});

tape("nest.key(key).rollup(rollup).map(array) aggregates values per key using the specified rollup function", function(test) {
  var a = {foo: 1},
      b = {foo: 1},
      c = {foo: 2};
  test.deepEqual(arrays.nest().key(function(d) { return d.foo; }).rollup(function(values) { return values.length; }).map([a, b, c]), arrays.map({1: 2, 2: 1}));
  test.end();
});

function count(array, count) {
  array.count = count;
  return array;
}

var tape = require("tape"),
    arrays = require("../");

tape("histogram is a deprecated alias for bin", function(test) {
  test.strictEqual(arrays.histogram, arrays.bin);
  test.end();
});

tape("bin() returns a default bin generator", function(test) {
  var h = arrays.bin();
  test.equal(h.value()(42), 42);
  test.equal(h.domain(), arrays.extent);
  test.deepEqual(h.thresholds(), arrays.thresholdSturges);
  test.end();
});

tape("bin(data) computes bins of the specified array of data", function(test) {
  var h = arrays.bin();
  test.deepEqual(h([0, 0, 0, 10, 20, 20]), [
    bin([0, 0, 0], 0, 5),
    bin([], 5, 10),
    bin([10], 10, 15),
    bin([20, 20], 15, 20) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin(iterable) is equivalent to bin(array)", function(test) {
  var h = arrays.bin();
  test.deepEqual(h(iterable([0, 0, 0, 10, 20, 20])), [
    bin([0, 0, 0], 0, 5),
    bin([], 5, 10),
    bin([10], 10, 15),
    bin([20, 20], 15, 20) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin.value(number) sets the constant value", function(test) {
  var h = arrays.bin().value(12); // Pointless, but for consistency.
  test.deepEqual(h([0, 0, 0, 1, 2, 2]), [
    bin([0, 0, 0, 1, 2, 2], 12, 12),
  ]);
  test.end();
});

tape("bin.value(function) sets the value accessor", function(test) {
  var h = arrays.bin().value(function(d) { return d.value; }),
      a = {value: 0},
      b = {value: 10},
      c = {value: 20};
  test.deepEqual(h([a, a, a, b, c, c]), [
    bin([a, a, a], 0, 5),
    bin([], 5, 10),
    bin([b], 10, 15),
    bin([c, c], 15, 20)
  ]);
  test.end();
});

tape("bin.domain(array) sets the domain", function(test) {
  var h = arrays.bin().domain([0, 20]);
  test.deepEqual(h.domain()(), [0, 20]);
  test.deepEqual(h([1, 2, 2, 10, 18, 18]), [
    bin([1, 2, 2], 0, 5),
    bin([], 5, 10),
    bin([10], 10, 15),
    bin([18, 18], 15, 20)
  ]);
  test.end();
});

tape("bin.domain(function) sets the domain accessor", function(test) {
  var values = [1, 2, 2, 10, 18, 18],
      actual,
      domain = function(values) { actual = values; return [0, 20]; },
      h = arrays.bin().domain(domain);
  test.equal(h.domain(), domain);
  test.deepEqual(h(values), [
    bin([1, 2, 2], 0, 5),
    bin([], 5, 10),
    bin([10], 10, 15),
    bin([18, 18], 15, 20)
  ]);
  test.deepEqual(actual, values);
  test.end();
});

tape("bin.thresholds(number) sets the approximate number of bin thresholds", function(test) {
  var h = arrays.bin().thresholds(3);
  test.deepEqual(h([0, 0, 0, 10, 30, 30]), [
    bin([0, 0, 0], 0, 10),
    bin([10], 10, 20),
    bin([30, 30], 20, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin.thresholds(array) sets the bin thresholds", function(test) {
  var h = arrays.bin().thresholds([10, 20]);
  test.deepEqual(h([0, 0, 0, 10, 30, 30]), [
    bin([0, 0, 0], 0, 10),
    bin([10], 10, 20),
    bin([30, 30], 20, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin.thresholds(array) ignores thresholds outside the domain", function(test) {
  var h = arrays.bin().thresholds([0, 1, 2, 3]);
  test.deepEqual(h([0, 1, 2, 3]), [
    bin([0], 0, 1),
    bin([1], 1, 2),
    bin([2], 2, 3),
    bin([3], 3, 3) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin.thresholds(function) sets the bin thresholds accessor", function(test) {
  var actual,
      values = [0, 0, 0, 10, 30, 30],
      h = arrays.bin().thresholds(function(values, x0, x1) { actual = [values, x0, x1]; return [10, 20]; });
  test.deepEqual(h(values), [
    bin([0, 0, 0], 0, 10),
    bin([10], 10, 20),
    bin([30, 30], 20, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.deepEqual(actual, [values, 0, 30]);
  test.deepEqual(h.thresholds(function() { return 5; })(values), [
    bin([0, 0, 0], 0, 5),
    bin([], 5, 10),
    bin([10], 10, 15),
    bin([], 15, 20),
    bin([], 20, 25),
    bin([30, 30], 25, 30) // Note: inclusive upper bound for last bin.
  ]);
  test.end();
});

tape("bin()() returns bins whose rightmost bin is not too wide", function(test) {
  var h = arrays.bin();
  test.deepEqual(h([9.8, 10, 11, 12, 13, 13.2]), [
    bin([9.8], 9.8, 10),
    bin([10], 10, 11),
    bin([11], 11, 12),
    bin([12], 12, 13),
    bin([13, 13.2], 13, 13.2),
  ]);
  test.end();
});

function bin(bin, x0, x1)  {
  bin.x0 = x0;
  bin.x1 = x1;
  return bin;
}

function* iterable(array) {
  yield* array;
}

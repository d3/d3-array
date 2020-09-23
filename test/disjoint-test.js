const tape = require("tape-await");
const d3 = require("../");

tape("disjoint(values, other) returns true if sets are disjoint", (test) => {
  test.equal(d3.disjoint([1], [2]), true);
  test.equal(d3.disjoint([2, 3], [3, 4]), false);
  test.equal(d3.disjoint([1], []), true);
});

tape("disjoint(values, other) allows values to be infinite", (test) => {
  test.equal(d3.disjoint(odds(), [0, 2, 4, 5]), false);
});

tape("disjoint(values, other) allows other to be infinite", (test) => {
  test.equal(d3.disjoint([2], repeat(1, 3, 2)), false);
});

function* odds() {
  for (let i = 1; true; i += 2) {
    yield i;
  }
}

function* repeat(...values) {
  while (true) {
    yield* values;
  }
}

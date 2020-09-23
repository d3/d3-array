const tape = require("tape-await");
const d3 = require("../");

tape("superset(values, other) returns true if values is a superset of others", (test) => {
  test.equal(d3.superset([1, 2], [2]), true);
  test.equal(d3.superset([2, 3], [3, 4]), false);
  test.equal(d3.superset([1], []), true);
});

tape("superset(values, other) allows values to be infinite", (test) => {
  test.equal(d3.superset(odds(), [1, 3, 5]), true);
});

tape("superset(values, other) allows other to be infinite", (test) => {
  test.equal(d3.superset([1, 3, 5], repeat(1, 3, 2)), false);
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

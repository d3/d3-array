const tape = require("tape-await");
const d3 = Object.assign({}, require("../"), require("d3-random"));

tape("shuffle(array) shuffles the array in-place", withRandom((test) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  test.equal(d3.shuffle(numbers), numbers);
  test.deepEqual(numbers, [7, 4, 5, 3, 9, 0, 6, 1, 2, 8]);
}));

tape("shuffle(array, start) shuffles the subset array[start:] in-place", withRandom((test) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  test.equal(d3.shuffle(numbers, 4), numbers);
  test.deepEqual(numbers, [0, 1, 2, 3, 8, 7, 6, 4, 5, 9]);
}));

tape("shuffle(array, start, end) shuffles the subset array[start:end] in-place", withRandom((test) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  test.equal(d3.shuffle(numbers, 3, 8), numbers);
  test.deepEqual(numbers, [0, 1, 2, 5, 6, 3, 4, 7, 8, 9]);
}));

function withRandom(callback) {
  return function() {
    const random = Math.random;
    Math.random = d3.randomLcg(0.9051667019185816);
    try {
      return callback.apply(this, arguments);
    } finally {
      Math.random = random;
    }
  };
}

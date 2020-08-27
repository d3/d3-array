const tape = require("tape-await");
const d3 = Object.assign({}, require("../"), require("d3-random"));

tape("shuffle(array) shuffles the array in-place", (test) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffle = d3.shuffler(d3.randomLcg(0.9051667019185816));
  test.equal(shuffle(numbers), numbers);
  test.true(d3.pairs(numbers).some(([a, b]) => a > b)); // shuffled
});

tape("shuffler(random)(array) shuffles the array in-place", (test) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffle = d3.shuffler(d3.randomLcg(0.9051667019185816));
  test.equal(shuffle(numbers), numbers);
  test.deepEqual(numbers, [7, 4, 5, 3, 9, 0, 6, 1, 2, 8]);
});

tape("shuffler(random)(array, start) shuffles the subset array[start:] in-place", (test) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffle = d3.shuffler(d3.randomLcg(0.9051667019185816));
  test.equal(shuffle(numbers, 4), numbers);
  test.deepEqual(numbers, [0, 1, 2, 3, 8, 7, 6, 4, 5, 9]);
});

tape("shuffler(random)(array, start, end) shuffles the subset array[start:end] in-place", (test) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffle = d3.shuffler(d3.randomLcg(0.9051667019185816));
  test.equal(shuffle(numbers, 3, 8), numbers);
  test.deepEqual(numbers, [0, 1, 2, 5, 6, 3, 4, 7, 8, 9]);
});

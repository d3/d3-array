const tape = require("tape-await");
const d3 = require("../");

tape("bisector(comparator).left(array, value) returns the index of an exact match", (test) => {
  const boxes = [1, 2, 3].map(box);
  const bisectLeft = d3.bisector(ascendingBox).left;
  test.equal(bisectLeft(boxes, box(1)), 0);
  test.equal(bisectLeft(boxes, box(2)), 1);
  test.equal(bisectLeft(boxes, box(3)), 2);
});

tape("bisector(comparator).left(array, value) returns the index of the first match", (test) => {
  const boxes = [1, 2, 2, 3].map(box);
  const bisectLeft = d3.bisector(ascendingBox).left;
  test.equal(bisectLeft(boxes, box(1)), 0);
  test.equal(bisectLeft(boxes, box(2)), 1);
  test.equal(bisectLeft(boxes, box(3)), 3);
});

tape("bisector(comparator).left(empty, value) returns zero", (test) => {
  test.equal(d3.bisector(() => { throw new Error(); }).left([], 1), 0);
});

tape("bisector(comparator).left(array, value) returns the insertion point of a non-exact match", (test) => {
  const boxes = [1, 2, 3].map(box);
  const bisectLeft = d3.bisector(ascendingBox).left;
  test.equal(bisectLeft(boxes, box(0.5)), 0);
  test.equal(bisectLeft(boxes, box(1.5)), 1);
  test.equal(bisectLeft(boxes, box(2.5)), 2);
  test.equal(bisectLeft(boxes, box(3.5)), 3);
});

tape("bisector(comparator).left(array, value) has undefined behavior if the search value is unorderable", (test) => {
  const boxes = [1, 2, 3].map(box);
  const bisectLeft = d3.bisector(ascendingBox).left;
  bisectLeft(boxes, box(new Date(NaN))); // who knows what this will return!
  bisectLeft(boxes, box(undefined));
  bisectLeft(boxes, box(NaN));
});

tape("bisector(comparator).left(array, value, lo) observes the specified lower bound", (test) => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectLeft = d3.bisector(ascendingBox).left;
  test.equal(bisectLeft(boxes, box(0), 2), 2);
  test.equal(bisectLeft(boxes, box(1), 2), 2);
  test.equal(bisectLeft(boxes, box(2), 2), 2);
  test.equal(bisectLeft(boxes, box(3), 2), 2);
  test.equal(bisectLeft(boxes, box(4), 2), 3);
  test.equal(bisectLeft(boxes, box(5), 2), 4);
  test.equal(bisectLeft(boxes, box(6), 2), 5);
});

tape("bisector(comparator).left(array, value, lo, hi) observes the specified bounds", (test) => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectLeft = d3.bisector(ascendingBox).left;
  test.equal(bisectLeft(boxes, box(0), 2, 3), 2);
  test.equal(bisectLeft(boxes, box(1), 2, 3), 2);
  test.equal(bisectLeft(boxes, box(2), 2, 3), 2);
  test.equal(bisectLeft(boxes, box(3), 2, 3), 2);
  test.equal(bisectLeft(boxes, box(4), 2, 3), 3);
  test.equal(bisectLeft(boxes, box(5), 2, 3), 3);
  test.equal(bisectLeft(boxes, box(6), 2, 3), 3);
});

tape("bisector(comparator).left(array, value) handles large sparse d3", (test) => {
  const boxes = [];
  const bisectLeft = d3.bisector(ascendingBox).left;
  let i = 1 << 30;
  boxes[i++] = box(1);
  boxes[i++] = box(2);
  boxes[i++] = box(3);
  boxes[i++] = box(4);
  boxes[i++] = box(5);
  test.equal(bisectLeft(boxes, box(0), i - 5, i), i - 5);
  test.equal(bisectLeft(boxes, box(1), i - 5, i), i - 5);
  test.equal(bisectLeft(boxes, box(2), i - 5, i), i - 4);
  test.equal(bisectLeft(boxes, box(3), i - 5, i), i - 3);
  test.equal(bisectLeft(boxes, box(4), i - 5, i), i - 2);
  test.equal(bisectLeft(boxes, box(5), i - 5, i), i - 1);
  test.equal(bisectLeft(boxes, box(6), i - 5, i), i - 0);
});

tape("bisector(comparator).right(array, value) returns the index after an exact match", (test) => {
  const boxes = [1, 2, 3].map(box);
  const bisectRight = d3.bisector(ascendingBox).right;
  test.equal(bisectRight(boxes, box(1)), 1);
  test.equal(bisectRight(boxes, box(2)), 2);
  test.equal(bisectRight(boxes, box(3)), 3);
});

tape("bisector(comparator).right(array, value) returns the index after the last match", (test) => {
  const boxes = [1, 2, 2, 3].map(box);
  const bisectRight = d3.bisector(ascendingBox).right;
  test.equal(bisectRight(boxes, box(1)), 1);
  test.equal(bisectRight(boxes, box(2)), 3);
  test.equal(bisectRight(boxes, box(3)), 4);
});

tape("bisector(comparator).right(empty, value) returns zero", (test) => {
  test.equal(d3.bisector(() => { throw new Error(); }).right([], 1), 0);
});

tape("bisector(comparator).right(array, value) returns the insertion point of a non-exact match", (test) => {
  const boxes = [1, 2, 3].map(box);
  const bisectRight = d3.bisector(ascendingBox).right;
  test.equal(bisectRight(boxes, box(0.5)), 0);
  test.equal(bisectRight(boxes, box(1.5)), 1);
  test.equal(bisectRight(boxes, box(2.5)), 2);
  test.equal(bisectRight(boxes, box(3.5)), 3);
});

tape("bisector(comparator).right(array, value, lo) observes the specified lower bound", (test) => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectRight = d3.bisector(ascendingBox).right;
  test.equal(bisectRight(boxes, box(0), 2), 2);
  test.equal(bisectRight(boxes, box(1), 2), 2);
  test.equal(bisectRight(boxes, box(2), 2), 2);
  test.equal(bisectRight(boxes, box(3), 2), 3);
  test.equal(bisectRight(boxes, box(4), 2), 4);
  test.equal(bisectRight(boxes, box(5), 2), 5);
  test.equal(bisectRight(boxes, box(6), 2), 5);
});

tape("bisector(comparator).right(array, value, lo, hi) observes the specified bounds", (test) => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectRight = d3.bisector(ascendingBox).right;
  test.equal(bisectRight(boxes, box(0), 2, 3), 2);
  test.equal(bisectRight(boxes, box(1), 2, 3), 2);
  test.equal(bisectRight(boxes, box(2), 2, 3), 2);
  test.equal(bisectRight(boxes, box(3), 2, 3), 3);
  test.equal(bisectRight(boxes, box(4), 2, 3), 3);
  test.equal(bisectRight(boxes, box(5), 2, 3), 3);
  test.equal(bisectRight(boxes, box(6), 2, 3), 3);
});

tape("bisector(comparator).right(array, value) handles large sparse d3", (test) => {
  const boxes = [];
  const bisectRight = d3.bisector(ascendingBox).right;
  let i = 1 << 30;
  boxes[i++] = box(1);
  boxes[i++] = box(2);
  boxes[i++] = box(3);
  boxes[i++] = box(4);
  boxes[i++] = box(5);
  test.equal(bisectRight(boxes, box(0), i - 5, i), i - 5);
  test.equal(bisectRight(boxes, box(1), i - 5, i), i - 4);
  test.equal(bisectRight(boxes, box(2), i - 5, i), i - 3);
  test.equal(bisectRight(boxes, box(3), i - 5, i), i - 2);
  test.equal(bisectRight(boxes, box(4), i - 5, i), i - 1);
  test.equal(bisectRight(boxes, box(5), i - 5, i), i - 0);
  test.equal(bisectRight(boxes, box(6), i - 5, i), i - 0);
});

tape("bisector(accessor).left(array, value) returns the index of an exact match", (test) => {
  const boxes = [1, 2, 3].map(box);
  const bisectLeft = d3.bisector(unbox).left;
  test.equal(bisectLeft(boxes, 1), 0);
  test.equal(bisectLeft(boxes, 2), 1);
  test.equal(bisectLeft(boxes, 3), 2);
});

tape("bisector(accessor).left(array, value) returns the index of the first match", (test) => {
  const boxes = [1, 2, 2, 3].map(box);
  const bisectLeft = d3.bisector(unbox).left;
  test.equal(bisectLeft(boxes, 1), 0);
  test.equal(bisectLeft(boxes, 2), 1);
  test.equal(bisectLeft(boxes, 3), 3);
});

tape("bisector(accessor).left(array, value) returns the insertion point of a non-exact match", (test) => {
  const boxes = [1, 2, 3].map(box);
  const bisectLeft = d3.bisector(unbox).left;
  test.equal(bisectLeft(boxes, 0.5), 0);
  test.equal(bisectLeft(boxes, 1.5), 1);
  test.equal(bisectLeft(boxes, 2.5), 2);
  test.equal(bisectLeft(boxes, 3.5), 3);
});

tape("bisector(accessor).left(array, value) has undefined behavior if the search value is unorderable", (test) => {
  const boxes = [1, 2, 3].map(box);
  const bisectLeft = d3.bisector(unbox).left;
  bisectLeft(boxes, new Date(NaN)); // who knows what this will return!
  bisectLeft(boxes, undefined);
  bisectLeft(boxes, NaN);
});

tape("bisector(accessor).left(array, value, lo) observes the specified lower bound", (test) => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectLeft = d3.bisector(unbox).left;
  test.equal(bisectLeft(boxes, 0, 2), 2);
  test.equal(bisectLeft(boxes, 1, 2), 2);
  test.equal(bisectLeft(boxes, 2, 2), 2);
  test.equal(bisectLeft(boxes, 3, 2), 2);
  test.equal(bisectLeft(boxes, 4, 2), 3);
  test.equal(bisectLeft(boxes, 5, 2), 4);
  test.equal(bisectLeft(boxes, 6, 2), 5);
});

tape("bisector(accessor).left(array, value, lo, hi) observes the specified bounds", (test) => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectLeft = d3.bisector(unbox).left;
  test.equal(bisectLeft(boxes, 0, 2, 3), 2);
  test.equal(bisectLeft(boxes, 1, 2, 3), 2);
  test.equal(bisectLeft(boxes, 2, 2, 3), 2);
  test.equal(bisectLeft(boxes, 3, 2, 3), 2);
  test.equal(bisectLeft(boxes, 4, 2, 3), 3);
  test.equal(bisectLeft(boxes, 5, 2, 3), 3);
  test.equal(bisectLeft(boxes, 6, 2, 3), 3);
});

tape("bisector(accessor).left(array, value) handles large sparse d3", (test) => {
  const boxes = [];
  const bisectLeft = d3.bisector(unbox).left;
  let i = 1 << 30;
  boxes[i++] = box(1);
  boxes[i++] = box(2);
  boxes[i++] = box(3);
  boxes[i++] = box(4);
  boxes[i++] = box(5);
  test.equal(bisectLeft(boxes, 0, i - 5, i), i - 5);
  test.equal(bisectLeft(boxes, 1, i - 5, i), i - 5);
  test.equal(bisectLeft(boxes, 2, i - 5, i), i - 4);
  test.equal(bisectLeft(boxes, 3, i - 5, i), i - 3);
  test.equal(bisectLeft(boxes, 4, i - 5, i), i - 2);
  test.equal(bisectLeft(boxes, 5, i - 5, i), i - 1);
  test.equal(bisectLeft(boxes, 6, i - 5, i), i - 0);
});

tape("bisector(accessor).right(array, value) returns the index after an exact match", (test) => {
  const boxes = [1, 2, 3].map(box);
  const bisectRight = d3.bisector(unbox).right;
  test.equal(bisectRight(boxes, 1), 1);
  test.equal(bisectRight(boxes, 2), 2);
  test.equal(bisectRight(boxes, 3), 3);
});

tape("bisector(accessor).right(array, value) returns the index after the last match", (test) => {
  const boxes = [1, 2, 2, 3].map(box);
  const bisectRight = d3.bisector(unbox).right;
  test.equal(bisectRight(boxes, 1), 1);
  test.equal(bisectRight(boxes, 2), 3);
  test.equal(bisectRight(boxes, 3), 4);
});

tape("bisector(accessor).right(array, value) returns the insertion point of a non-exact match", (test) => {
  const boxes = [1, 2, 3].map(box);
  const bisectRight = d3.bisector(unbox).right;
  test.equal(bisectRight(boxes, 0.5), 0);
  test.equal(bisectRight(boxes, 1.5), 1);
  test.equal(bisectRight(boxes, 2.5), 2);
  test.equal(bisectRight(boxes, 3.5), 3);
});

tape("bisector(accessor).right(array, value, lo) observes the specified lower bound", (test) => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectRight = d3.bisector(unbox).right;
  test.equal(bisectRight(boxes, 0, 2), 2);
  test.equal(bisectRight(boxes, 1, 2), 2);
  test.equal(bisectRight(boxes, 2, 2), 2);
  test.equal(bisectRight(boxes, 3, 2), 3);
  test.equal(bisectRight(boxes, 4, 2), 4);
  test.equal(bisectRight(boxes, 5, 2), 5);
  test.equal(bisectRight(boxes, 6, 2), 5);
});

tape("bisector(accessor).right(array, value, lo, hi) observes the specified bounds", (test) => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectRight = d3.bisector(unbox).right;
  test.equal(bisectRight(boxes, 0, 2, 3), 2);
  test.equal(bisectRight(boxes, 1, 2, 3), 2);
  test.equal(bisectRight(boxes, 2, 2, 3), 2);
  test.equal(bisectRight(boxes, 3, 2, 3), 3);
  test.equal(bisectRight(boxes, 4, 2, 3), 3);
  test.equal(bisectRight(boxes, 5, 2, 3), 3);
  test.equal(bisectRight(boxes, 6, 2, 3), 3);
});

tape("bisector(accessor).right(array, value) handles large sparse d3", (test) => {
  const boxes = [];
  const bisectRight = d3.bisector(unbox).right;
  let i = 1 << 30;
  boxes[i++] = box(1);
  boxes[i++] = box(2);
  boxes[i++] = box(3);
  boxes[i++] = box(4);
  boxes[i++] = box(5);
  test.equal(bisectRight(boxes, 0, i - 5, i), i - 5);
  test.equal(bisectRight(boxes, 1, i - 5, i), i - 4);
  test.equal(bisectRight(boxes, 2, i - 5, i), i - 3);
  test.equal(bisectRight(boxes, 3, i - 5, i), i - 2);
  test.equal(bisectRight(boxes, 4, i - 5, i), i - 1);
  test.equal(bisectRight(boxes, 5, i - 5, i), i - 0);
  test.equal(bisectRight(boxes, 6, i - 5, i), i - 0);
});

tape("bisector(accessor).center(array, value) returns the closest index", (test) => {
  const data = [0, 1, 2, 3, 4];
  const bisectCenter = d3.bisector(d => +d).center;
  test.equal(bisectCenter(data, 2), 2);
  test.equal(bisectCenter(data, 2.2), 2);
  test.equal(bisectCenter(data, 2.6), 3);
  test.equal(bisectCenter(data, 3), 3);
  test.equal(bisectCenter(data, 4), 4);
  test.equal(bisectCenter(data, 4.5), 4);
});

tape("bisector(comparator).center(array, value) returns the closest index", (test) => {
  const data = [0, 1, 2, 3, 4];
  const bisectCenter = d3.bisector((d, x) => +d - x).center;
  test.equal(bisectCenter(data, 2), 2);
  test.equal(bisectCenter(data, 2.2), 2);
  test.equal(bisectCenter(data, 2.6), 3);
  test.equal(bisectCenter(data, 3), 3);
});

tape("bisector(comparator).center(empty, value) returns zero", (test) => {
  test.equal(d3.bisector(() => { throw new Error(); }).center([], 1), 0);
});

tape("bisector(ascending).center(array, value) returns the left value", (test) => {
  const data = [0, 1, 2, 3, 4];
  const bisectCenter = d3.bisector(d3.ascending).center;
  test.equal(bisectCenter(data, 2.0), 2);
  test.equal(bisectCenter(data, 2.2), 3);
  test.equal(bisectCenter(data, 2.6), 3);
  test.equal(bisectCenter(data, 3.0), 3);
});

tape("bisector(ordinalAccessor).center(array, value) returns the left value", (test) => {
  const data = ["aa", "bb", "cc", "dd", "ee"];
  const bisectCenter = d3.bisector(d => d).center;
  test.equal(bisectCenter(data, "cc"), 2);
  test.equal(bisectCenter(data, "ce"), 3);
  test.equal(bisectCenter(data, "cf"), 3);
  test.equal(bisectCenter(data, "dd"), 3);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

function ascendingBox(a, b) {
  return d3.ascending(a.value, b.value);
}

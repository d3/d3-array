import assert from "assert";
import * as d3 from "../src/index.js";

const data = [
  {name: "jim",   amount: 34.0,   date: "11/12/2015"},
  {name: "carl",  amount: 120.11, date: "11/12/2015"},
  {name: "stacy", amount: 12.01,  date: "01/04/2016"},
  {name: "stacy", amount: 34.05,  date: "01/04/2016"}
];

it("indexes(data, ...keys) returns the expected nested arrays", () => {
  assert.deepStrictEqual(
    d3.indexes(data, d => d.amount),
    [
      [34.0, {name: "jim", amount: 34.0, date: "11/12/2015"}],
      [120.11, {name: "carl", amount: 120.11, date: "11/12/2015"}],
      [12.01, {name: "stacy", amount: 12.01, date: "01/04/2016"}],
      [34.05, {name: "stacy", amount: 34.05, date: "01/04/2016"}]
    ]
  );
  assert.deepStrictEqual(
    d3.indexes(data, d => d.name, d => d.amount),
    [
      [
        "jim",
        [
          [34.0, {name: "jim", amount: 34.0, date: "11/12/2015"}]
        ]
      ],
      [
        "carl",
        [
          [120.11, {name: "carl", amount: 120.11, date: "11/12/2015"}]
        ]
      ],
      [
        "stacy",
        [
          [12.01, {name: "stacy", amount: 12.01, date: "01/04/2016"}],
          [34.05, {name: "stacy", amount: 34.05, date: "01/04/2016"}]
        ]
      ]
    ]
  );
});

it("index(data, ...keys) returns the expected map", () => {
  assert.deepStrictEqual(
    entries(d3.index(data, d => d.amount), 1),
    d3.indexes(data, d => d.amount)
  );
  assert.deepStrictEqual(
    entries(d3.index(data, d => d.name, d => d.amount), 2),
    d3.indexes(data, d => d.name, d => d.amount)
  );
});

it("index(data, ...keys) throws on a non-unique key", () => {
  assert.throws(() => d3.index(data, d => d.name));
  assert.throws(() => d3.index(data, d => d.date));
});

function entries(map, depth) {
  return depth > 0
      ? Array.from(map, ([k, v]) => [k, entries(v, depth - 1)])
      : map;
}

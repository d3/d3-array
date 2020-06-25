const tape = require("tape-await");
const d3 = require("../");

const data = [
  {name: "jim",   amount: 34.0,   date: "11/12/2015"},
  {name: "carl",  amount: 120.11, date: "11/12/2015"},
  {name: "stacy", amount: 12.01,  date: "01/04/2016"},
  {name: "stacy", amount: 34.05,  date: "01/04/2016"}
];

tape("indexes(data, ...keys) returns the expected nested arrays", (test) => {
  test.deepEqual(
    d3.indexes(data, d => d.amount),
    [
      [34.0, {name: "jim", amount: 34.0, date: "11/12/2015"}],
      [120.11, {name: "carl", amount: 120.11, date: "11/12/2015"}],
      [12.01, {name: "stacy", amount: 12.01, date: "01/04/2016"}],
      [34.05, {name: "stacy", amount: 34.05, date: "01/04/2016"}]
    ]
  );
  test.deepEqual(
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

tape("index(data, ...keys) returns the expected map", (test) => {
  test.deepEqual(
    entries(d3.index(data, d => d.amount), 1),
    d3.indexes(data, d => d.amount)
  );
  test.deepEqual(
    entries(d3.index(data, d => d.name, d => d.amount), 2),
    d3.indexes(data, d => d.name, d => d.amount)
  );
});

tape("index(data, ...keys) throws on a non-unique key", (test) => {
  test.throws(() => d3.index(data, d => d.name));
  test.throws(() => d3.index(data, d => d.date));
});

function entries(map, depth) {
  return depth > 0
      ? Array.from(map, ([k, v]) => [k, entries(v, depth - 1)])
      : map;
}

import assert from "assert";
import * as d3 from "../src/index.js";

const data = [
  {name: "jim",   amount: "3400",   date: "11/12/2015"},
  {name: "carl",  amount: "12011", date: "11/12/2015"},
  {name: "stacy", amount: "1201",  date: "01/04/2016"},
  {name: "stacy", amount: "3405",  date: "01/04/2016"}
];

it("rollups(data, reduce, accessor) returns the expected array", () => {
  assert.deepEqual(
    d3.rollups(data, v => v.length, d => d.name),
    [
      ["jim", 1],
      ["carl", 1],
      ["stacy", 2]
    ]
  );
  assert.deepEqual(
    d3.rollups(data, v => d3.sum(v, d => d.amount), d => d.name),
    [
      ["jim", 3400],
      ["carl", 12011],
      ["stacy", 4606]
    ]
  );
});

it("rollups(data, reduce, accessor, accessor) returns the expected array", () => {
  assert.deepEqual(
    d3.rollups(data, v => v.length, d => d.name, d => d.amount),
    [
      [
        "jim",
        [
          ["3400", 1]
        ]
      ],
      [
        "carl",
        [
          ["12011", 1]
        ]
      ],
      [
        "stacy",
        [
          ["1201", 1],
          ["3405", 1]
        ]
      ]
    ]
  );
});

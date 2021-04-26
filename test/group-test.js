import assert from "assert";
import * as d3 from "../src/index.js";

const data = [
  {name: "jim",   amount: "34.0",   date: "11/12/2015"},
  {name: "carl",  amount: "120.11", date: "11/12/2015"},
  {name: "stacy", amount: "12.01",  date: "01/04/2016"},
  {name: "stacy", amount: "34.05",  date: "01/04/2016"}
];

it("group(data, accessor) returns the expected map", () => {
  assert.deepEqual(
    entries(d3.group(data, d => d.name), 1),
    [
      [
        "jim",
        [
          {
            "name": "jim",
            "amount": "34.0",
            "date": "11/12/2015"
          }
        ]
      ],
      [
        "carl",
        [
          {
            "name": "carl",
            "amount": "120.11",
            "date": "11/12/2015"
          }
        ]
      ],
      [
        "stacy",
        [
          {
            "name": "stacy",
            "amount": "12.01",
            "date": "01/04/2016"
          },
          {
            "name": "stacy",
            "amount": "34.05",
            "date": "01/04/2016"
          }
        ]
      ]
    ]
  );
});

it("group(data, accessor, accessor) returns the expected map", () => {
  assert.deepEqual(
    entries(d3.group(data, d => d.name, d => d.amount), 2),
    [
      [
        "jim",
        [
          [
            "34.0",
            [
              {
                "name": "jim",
                "amount": "34.0",
                "date": "11/12/2015"
              }
            ]
          ]
        ]
      ],
      [
        "carl",
        [
          [
            "120.11",
            [
              {
                "name": "carl",
                "amount": "120.11",
                "date": "11/12/2015"
              }
            ]
          ]
        ]
      ],
      [
        "stacy",
        [
          [
            "12.01",
            [
              {
                "name": "stacy",
                "amount": "12.01",
                "date": "01/04/2016"
              }
            ]
          ],
          [
            "34.05",
            [
              {
                "name": "stacy",
                "amount": "34.05",
                "date": "01/04/2016"
              }
            ]
          ]
        ]
      ]
    ]
  );
});

it("group(data, accessor) interns keys", () => {
  const a1 = new Date(Date.UTC(2001, 0, 1));
  const a2 = new Date(Date.UTC(2001, 0, 1));
  const b = new Date(Date.UTC(2002, 0, 1));
  const map = d3.group([[a1, 1], [a2, 2], [b, 3]], ([date]) => date);
  assert.deepEqual(map.get(a1), [[a1, 1], [a2, 2]]);
  assert.deepEqual(map.get(a2), [[a1, 1], [a2, 2]]);
  assert.deepEqual(map.get(b), [[b, 3]]);
  assert.deepEqual(map.get(+a1), [[a1, 1], [a2, 2]]);
  assert.deepEqual(map.get(+a2), [[a1, 1], [a2, 2]]);
  assert.deepEqual(map.get(+b), [[b, 3]]);
  assert.strictEqual([...map.keys()][0], a1);
  assert.strictEqual([...map.keys()][1], b);
});

function entries(map, depth) {
  if (depth > 0) {
    return Array.from(map, ([k, v]) => [k, entries(v, depth - 1)]);
  } else {
    return map;
  }
}

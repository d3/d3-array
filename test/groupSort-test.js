import assert from "node:assert";
import {readFileSync} from "node:fs";
import {it} from "vitest";
import {ascending, descending, groupSort, median} from "d3-array";

const barley = JSON.parse(readFileSync("./test/data/barley.json"));

it("groupSort(data, reduce, key) returns sorted keys when reduce is an accessor", () => {
  assert.deepStrictEqual(
    groupSort(barley, g => median(g, d => d.yield), d => d.variety),
    ["Svansota", "No. 462", "Manchuria", "No. 475", "Velvet", "Peatland", "Glabron", "No. 457", "Wisconsin No. 38", "Trebi"]
  );
  assert.deepStrictEqual(
    groupSort(barley, g => -median(g, d => d.yield), d => d.variety),
    ["Trebi", "Wisconsin No. 38", "No. 457", "Glabron", "Peatland", "Velvet", "No. 475", "Manchuria", "No. 462", "Svansota"]
  );
  assert.deepStrictEqual(
    groupSort(barley, g => median(g, d => -d.yield), d => d.variety),
    ["Trebi", "Wisconsin No. 38", "No. 457", "Glabron", "Peatland", "Velvet", "No. 475", "Manchuria", "No. 462", "Svansota"]
  );
  assert.deepStrictEqual(
    groupSort(barley, g => median(g, d => d.yield), d => d.site),
    ["Grand Rapids", "Duluth", "University Farm", "Morris", "Crookston", "Waseca"]
  );
  assert.deepStrictEqual(
    groupSort(barley, g => -median(g, d => d.yield), d => d.site),
    ["Waseca", "Crookston", "Morris", "University Farm", "Duluth", "Grand Rapids"]
  );
  assert.deepStrictEqual(
    groupSort(barley, g => median(g, d => -d.yield), d => d.site),
    ["Waseca", "Crookston", "Morris", "University Farm", "Duluth", "Grand Rapids"]
  );
});

it("groupSort(data, reduce, key) puts non-orderable reduced values last", () => {
  const data = [{key: "z", value: 2}, {key: "a", value: null}, {key: "m", value: 1}];
  assert.deepStrictEqual(groupSort(data, g => g[0].value, d => d.key), ["m", "z", "a"]);
});

it("groupSort(data, reduce, key) returns sorted keys when reduce is a comparator", () => {
  assert.deepStrictEqual(
    groupSort(barley, (a, b) => ascending(median(a, d => d.yield), median(b, d => d.yield)), d => d.variety),
    ["Svansota", "No. 462", "Manchuria", "No. 475", "Velvet", "Peatland", "Glabron", "No. 457", "Wisconsin No. 38", "Trebi"]
  );
  assert.deepStrictEqual(
    groupSort(barley, (a, b) => descending(median(a, d => d.yield), median(b, d => d.yield)), d => d.variety),
    ["Trebi", "Wisconsin No. 38", "No. 457", "Glabron", "Peatland", "Velvet", "No. 475", "Manchuria", "No. 462", "Svansota"]
  );
  assert.deepStrictEqual(
    groupSort(barley, (a, b) => ascending(median(a, d => d.yield), median(b, d => d.yield)), d => d.site),
    ["Grand Rapids", "Duluth", "University Farm", "Morris", "Crookston", "Waseca"]
  );
  assert.deepStrictEqual(
    groupSort(barley, (a, b) => descending(median(a, d => d.yield), median(b, d => d.yield)), d => d.site),
    ["Waseca", "Crookston", "Morris", "University Farm", "Duluth", "Grand Rapids"]
  );
});

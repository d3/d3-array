import assert from "assert";
import * as d3 from "../src/index.js";
import { readFileSync } from "fs";

const barley = JSON.parse(readFileSync("./test/data/barley.json"));

it("groupSort(data, reduce, key) returns sorted keys when reduce is an accessor", () => {
  assert.deepStrictEqual(
    d3.groupSort(barley, g => d3.median(g, d => d.yield), d => d.variety),
    ["Svansota", "No. 462", "Manchuria", "No. 475", "Velvet", "Peatland", "Glabron", "No. 457", "Wisconsin No. 38", "Trebi"]
  );
  assert.deepStrictEqual(
    d3.groupSort(barley, g => -d3.median(g, d => d.yield), d => d.variety),
    ["Trebi", "Wisconsin No. 38", "No. 457", "Glabron", "Peatland", "Velvet", "No. 475", "Manchuria", "No. 462", "Svansota"]
  );
  assert.deepStrictEqual(
    d3.groupSort(barley, g => d3.median(g, d => -d.yield), d => d.variety),
    ["Trebi", "Wisconsin No. 38", "No. 457", "Glabron", "Peatland", "Velvet", "No. 475", "Manchuria", "No. 462", "Svansota"]
  );
  assert.deepStrictEqual(
    d3.groupSort(barley, g => d3.median(g, d => d.yield), d => d.site),
    ["Grand Rapids", "Duluth", "University Farm", "Morris", "Crookston", "Waseca"]
  );
  assert.deepStrictEqual(
    d3.groupSort(barley, g => -d3.median(g, d => d.yield), d => d.site),
    ["Waseca", "Crookston", "Morris", "University Farm", "Duluth", "Grand Rapids"]
  );
  assert.deepStrictEqual(
    d3.groupSort(barley, g => d3.median(g, d => -d.yield), d => d.site),
    ["Waseca", "Crookston", "Morris", "University Farm", "Duluth", "Grand Rapids"]
  );
});

it("groupSort(data, reduce, key) returns sorted keys when reduce is a comparator", () => {
  assert.deepStrictEqual(
    d3.groupSort(barley, (a, b) => d3.ascending(d3.median(a, d => d.yield), d3.median(b, d => d.yield)), d => d.variety),
    ["Svansota", "No. 462", "Manchuria", "No. 475", "Velvet", "Peatland", "Glabron", "No. 457", "Wisconsin No. 38", "Trebi"]
  );
  assert.deepStrictEqual(
    d3.groupSort(barley, (a, b) => d3.descending(d3.median(a, d => d.yield), d3.median(b, d => d.yield)), d => d.variety),
    ["Trebi", "Wisconsin No. 38", "No. 457", "Glabron", "Peatland", "Velvet", "No. 475", "Manchuria", "No. 462", "Svansota"]
  );
  assert.deepStrictEqual(
    d3.groupSort(barley, (a, b) => d3.ascending(d3.median(a, d => d.yield), d3.median(b, d => d.yield)), d => d.site),
    ["Grand Rapids", "Duluth", "University Farm", "Morris", "Crookston", "Waseca"]
  );
  assert.deepStrictEqual(
    d3.groupSort(barley, (a, b) => d3.descending(d3.median(a, d => d.yield), d3.median(b, d => d.yield)), d => d.site),
    ["Waseca", "Crookston", "Morris", "University Farm", "Duluth", "Grand Rapids"]
  );
});

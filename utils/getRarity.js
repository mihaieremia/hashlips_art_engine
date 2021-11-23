const basePath = process.cwd();
const fs = require("fs");
const BigNumber = require('bignumber.js');

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
let editionSize = data.length;


let categoryCount = {};
let traitsCount = {};
let traitsPerCategoryCount = {};

// fill up rarity chart with occurrences from metadata
let checkMax = 9;
let mostRare = {};
data.forEach((element) => {
  let rarity = element.rarity.avgRarity;
  if (rarity < checkMax) {
    mostRare = element;
    checkMax = rarity;
  }
});
console.log(mostRare);

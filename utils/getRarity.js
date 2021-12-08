const basePath = process.cwd();
const fs = require("fs");
const BigNumber = require('bignumber.js');

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

// fill up rarity chart with occurrences from metadata
let checkMax = 0;
let mostRare = {};
data.forEach((element) => {
  let rarity = element.rarity.rarityScore;
  if (rarity > checkMax) {
    mostRare = element;
    checkMax = rarity;
  }
});
console.log(mostRare);

const basePath = process.cwd();
const fs = require("fs");
const BigNumber = require('bignumber.js');

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
let editionSize = data.length;


let categoryCount = {};
let traitsPerCategoryCount = {};

// fill up rarity chart with occurrences from metadata
data.forEach((element) => {
  let attributes = element.attributes;
  attributes.forEach((attribute) => {
    let traitType = attribute.trait_type;
    if (!categoryCount[traitType]) {
      categoryCount[traitType] = 0;
    }
    categoryCount[traitType] += 1;
    let value = attribute.value;
    if (!traitsPerCategoryCount[traitType]) {
      traitsPerCategoryCount[traitType] = { [value]: 1 };
    } else {
      if (!traitsPerCategoryCount[traitType][value]) {
        traitsPerCategoryCount[traitType][value] = 1;
      } else {
        traitsPerCategoryCount[traitType][value] += 1;
      }
    }
  });
});
let sumTraitsPerCat = 0;
Object.keys(traitsPerCategoryCount).forEach((category) => {
  let cLen = Object.keys(traitsPerCategoryCount[category]).length;
  sumTraitsPerCat += cLen;
});
const get_avg_trait_per_cat = sumTraitsPerCat / Object.keys(traitsPerCategoryCount).length;

let traitMap = {};
for (var layer of Object.keys(categoryCount)) {
  let valueMap = {};
  for (var attribute of Object.keys(traitsPerCategoryCount[layer])) {
    let attributeOccurrence = traitsPerCategoryCount[layer][attribute];
    let attributeFrequency = parseFloat((attributeOccurrence / editionSize));
    let attributeRarity = parseFloat(1 / attributeFrequency);
    let traitOccurancePercentage = parseFloat((categoryCount[layer] / editionSize)) * 100;
    let traitFrequency = parseFloat((categoryCount[layer] / editionSize));
    valueMap = {
      ...valueMap, [attribute]: {
        attributeOccurrence,
        attributeFrequency,
        attributeRarity,
        traitOccurance: categoryCount[layer],
        traitFrequency,
        traitOccurancePercentage: parseFloat(traitOccurancePercentage),
      }
    }
  }
  traitMap = { ...traitMap, [layer]: { ...valueMap } }
}

let _data = data;
for (let index = 0; index < _data.length; index++) {
  const el = _data[index];
  let statRarity = BigNumber(1);
  let avgRarity = 0;
  let rarityScore = 0;
  let rarityScoreNormed = 0;
  for (let iA = 0; iA < el['attributes'].length; iA++) {
    const at = el['attributes'][iA];
    // delete _data[index]["attributes"][iA].attributeOccurrence;
    // delete _data[index]["attributes"][iA].attributeFrequency;
    // delete _data[index]["attributes"][iA].attributeRarity;
    // delete _data[index]["attributes"][iA].traitOccurance;
    // delete _data[index]["attributes"][iA].traitFrequency;
    // delete _data[index]["attributes"][iA].traitOccurancePercentage;
    // delete _data[index]["attributes"][iA].attributeRarityNormed;
    traitsPerCategoryCount[at.trait_type][at.value] = {...traitMap[at.trait_type][at.value]}
    const trait_rarity_normed = traitMap[at.trait_type][at.value].attributeRarity * (get_avg_trait_per_cat / el['attributes'].length);
    traitMap[at.trait_type][at.value].attributeRarityNormed = trait_rarity_normed;
    // _data[index].attributes[iA] = { ..._data[index].attributes[iA], ...traitMap[at.trait_type][at.value] };
    avgRarity += traitMap[at.trait_type][at.value].attributeFrequency;
    statRarity = statRarity.multipliedBy(traitMap[at.trait_type][at.value].attributeFrequency);
    rarityScore += traitMap[at.trait_type][at.value].attributeRarity;
    rarityScoreNormed += traitMap[at.trait_type][at.value].attributeRarityNormed;
  }
  _data[index]['rarity'] = {};
  _data[index]['rarity'] = { ..._data[index]['rarity'], avgRarity: parseFloat((avgRarity / el['attributes'].length).toFixed(6)) };
  _data[index]['rarity'] = { ..._data[index]['rarity'], statRarity: BigNumber(statRarity.toPrecision(10)).toNumber() };
  _data[index]['rarity'] = { ..._data[index]['rarity'], rarityScore: parseFloat((rarityScore).toFixed(6)) };
  _data[index]['rarity'] = { ..._data[index]['rarity'], rarityScoreNormed: parseFloat((rarityScoreNormed).toFixed(6)) };
  _data[index]['rarity'] = { ..._data[index]['rarity'], usedTraitsCount: el['attributes'].length };
  // _data[index]['rarity'] = { ..._data[index]['rarity'], collectionSize: editionSize };
  // _data[index]['rarity'] = { ..._data[index]['rarity'], collectionTraitsCount: Object.keys(categoryCount).length };
  _data[index]['createdAt'] = _data[index]['date'];
  delete _data[index]['image'];
  delete _data[index]['date'];
  delete _data[index]['name'];
  delete _data[index]['edition'];
  delete _data[index]['collectionInfo'];
  delete _data[index]['royalty'];
  delete _data[index]['image'];
  delete _data[index]['tags'];
  // console.log(_data[index]['rarity']['rarityScoreNormed'], index + 1)
}
fs.writeFileSync(
  `${basePath}/build/json/collection.json`,
  JSON.stringify(traitsPerCategoryCount, null, 2)
);
fs.writeFileSync(
  `${basePath}/build/json/_metadata.json`,
  JSON.stringify(_data, null, 2)
);

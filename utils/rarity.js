const basePath = process.cwd();
const fs = require("fs");
const layersDir = `${basePath}/layers`;
const BigNumber = require('bignumber.js');
const { layerConfigurations } = require(`${basePath}/src/config.js`);

const { getElements } = require("../src/main.js");

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
let editionSize = data.length;

let rarityData = [];

//Read all traits and values
data.forEach((nft) => {
  
}) 
// intialize layers to chart
layerConfigurations.forEach((config) => {
  let layers = config.layersOrder;

  layers.forEach((layer) => {
  console.log(layer);
    // get elements for each layer
    let elementsForLayer = [];
    let elements = getElements(`${layersDir}/${layer.name}/`);
    elements.forEach((element) => {
      // just get name and weight for each element
      let rarityDataElement = {
        trait: element.name,
        chance: element.weight.toFixed(0),
        occurrence: 0, // initialize at 0
      };
      elementsForLayer.push(rarityDataElement);
    });
    let layerName =
      layer.options?.["displayName"] != undefined
        ? layer.options?.["displayName"]
        : layer.name;
    // don't include duplicate layers
    if (!rarityData.includes(layer.name)) {
      // add elements for each layer to chart
      rarityData[layerName] = elementsForLayer;
    }
  });
});
let categoryCount = {};
let traitsCount = {};

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
    let rarityDataTraits = rarityData[traitType];
    rarityDataTraits.forEach((rarityDataTrait) => {
      if (rarityDataTrait.trait == value) {
        // keep track of occurrences
        rarityDataTrait.occurrence++;
        traitsCount[traitType] = { ...traitsCount[traitType], [value]: rarityDataTrait.occurrence }
      }
    });
  });
});
let sumTraitsPerCat = 0;
Object.keys(traitsCount).forEach((category) => {
  let cLen = Object.keys(traitsCount[category]).length;
  sumTraitsPerCat += cLen;
});
const get_avg_trait_per_cat = sumTraitsPerCat / Object.keys(traitsCount).length;

let traitMap = {};
for (var layer in rarityData) {
  let valueMap = {};
  for (var attribute in rarityData[layer]) {
    let attributeOccurrence = rarityData[layer][attribute].occurrence;
    let attributeFrequency = parseFloat((attributeOccurrence / editionSize));
    let attributeRarity = parseFloat(1 / attributeFrequency);
    let traitOccurancePercentage = parseFloat((categoryCount[layer] / editionSize)) * 100;
    let traitFrequency = parseFloat((categoryCount[layer] / editionSize));
    valueMap = {
      ...valueMap, [rarityData[layer][attribute].trait]: {
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
    const trait_rarity_normed = traitMap[at.trait_type][at.value].attributeRarity * (get_avg_trait_per_cat / el['attributes'].length);
    traitMap[at.trait_type][at.value].attributeRarityNormed = trait_rarity_normed;
    _data[index].attributes[iA] = { ..._data[index].attributes[iA], ...traitMap[at.trait_type][at.value] };
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
  _data[index]['rarity'] = { ..._data[index]['rarity'], usedTraitsCount: el['attributes'].length};
  _data[index]['rarity'] = { ..._data[index]['rarity'], collectionSize: editionSize};
  _data[index]['rarity'] = { ..._data[index]['rarity'], collectionTraitsCount: Object.keys(categoryCount).length};
  _data[index]['collectionInfo'] = traitsCount;
  console.log(_data[index]['rarity']['rarityScoreNormed'], index + 1)
}
fs.writeFileSync(
  `${basePath}/build/json/_metadata.json`,
  JSON.stringify(_data, null, 2)
);

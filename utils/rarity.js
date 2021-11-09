const basePath = process.cwd();
const fs = require("fs");
const layersDir = `${basePath}/layers`;

const { layerConfigurations } = require(`${basePath}/src/config.js`);

const { getElements } = require("../src/main.js");

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
let editionSize = data.length;

let rarityData = [];

// intialize layers to chart
layerConfigurations.forEach((config) => {
  let layers = config.layersOrder;

  layers.forEach((layer) => {
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
      }
    });
  });
});
// convert occurrences to percentages
console.log(categoryCount);
let traitMap = {};
for (var layer in rarityData) {
  let valueMap = {};
  for (var attribute in rarityData[layer]) {
    let counts = rarityData[layer][attribute].occurrence;
    let percentage = parseFloat((rarityData[layer][attribute].occurrence / editionSize)) * 100;
    let attributeFrequency = parseFloat(counts / editionSize);
    let traitOccurancePercentage = parseFloat((categoryCount[layer] / editionSize)) * 100;
    let traitFrequency = parseFloat(categoryCount[layer] / editionSize);
    let traitRarity =parseFloat((1 / traitFrequency).toFixed(4));
    valueMap = {
      ...valueMap, [rarityData[layer][attribute].trait]: {
        attributeOccurrence: counts, 
        attributeOccurrencePercentage: parseFloat(percentage.toFixed(4)),
        attributeRarity: attributeFrequency,
        traitOccurance: categoryCount[layer],
        traitOccurancePercentage: parseFloat(traitOccurancePercentage.toFixed(4)),
        traitRarity: traitFrequency,

      }
    }
    // convert to percentage
    // show two decimal places in percent
  }
  traitMap = { ...traitMap, [layer]: { ...valueMap } }
}

let _data = data;
for (let index = 0; index < _data.length; index++) {
  const el = _data[index];
  let sumRarityPerNFT = 0;
  for (let iA = 0; iA < el['attributes'].length; iA++) {
    const at = el['attributes'][iA];
    _data[index].attributes[iA] = { ..._data[index].attributes[iA], ...traitMap[at.trait_type][at.value] }
    sumRarityPerNFT += parseFloat(traitMap[at.trait_type][at.value].percentage);
    // console.log(sumRarityPerNFT);
  }
  _data[index]['rarityAVG'] = parseFloat((sumRarityPerNFT / el['attributes'].length).toFixed(2))
}
fs.writeFileSync(
  `${basePath}/build/json/_metadata.json`,
  JSON.stringify(_data, null, 2)
);

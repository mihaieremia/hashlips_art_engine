const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs = require("fs");
const sha1 = require(`${basePath}/node_modules/sha1`);
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`);
const buildDir = `${basePath}/build`;
const layersDir = `${basePath}/layers`;
const {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
} = require(`${basePath}/src/config.js`);
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = format.smoothing;
var metadataList = [];
var attributesList = [];
var dnaList = new Set();
const DNA_DELIMITER = "-";
const HashlipsGiffer = require(`${basePath}/modules/HashlipsGiffer.js`);

let hashlipsGiffer = null;

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/json`);
  fs.mkdirSync(`${buildDir}/images`);
  if (gif.export) {
    fs.mkdirSync(`${buildDir}/gifs`);
  }
};

const getRarityWeight = (_str) => {
  let nameWithoutExtension = _str.slice(0, -4);
  var nameWithoutWeight = Number(
    nameWithoutExtension.split(rarityDelimiter).pop()
  );
  if (isNaN(nameWithoutWeight)) {
    nameWithoutWeight = 1;
  }
  return nameWithoutWeight;
};

const cleanDna = (_str) => {
  const withoutOptions = removeQueryStrings(_str);
  var dna = Number(withoutOptions.split(":").shift());
  return dna;
};

const cleanName = (_str) => {
  let nameWithoutExtension = _str.slice(0, -4);
  var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
  return nameWithoutWeight;
};

const getElements = (path) => {
  return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      return {
        id: index,
        name: cleanName(i),
        filename: i,
        path: `${path}${i}`,
        weight: getRarityWeight(i),
      };
    });
};

const layersSetup = (layersOrder) => {
  const layers = layersOrder.map((layerObj, index) => ({
    id: index,
    elements: getElements(`${layersDir}/${layerObj.name}/`),
    name:
      layerObj.options?.["displayName"] != undefined
        ? layerObj.options?.["displayName"]
        : layerObj.name,
    blend:
      layerObj.options?.["blend"] != undefined
        ? layerObj.options?.["blend"]
        : "source-over",
    opacity:
      layerObj.options?.["opacity"] != undefined
        ? layerObj.options?.["opacity"]
        : 1,
    bypassDNA:
      layerObj.options?.["bypassDNA"] !== undefined
        ? layerObj.options?.["bypassDNA"]
        : false,
  }));
  return layers;
};

const saveImage = (_editionCount) => {
  fs.writeFileSync(
    `${buildDir}/images/${_editionCount}.png`,
    canvas.toBuffer("image/png")
  );
};

const genColor = () => {
  let hue = Math.floor(Math.random() * 360);
  let pastel = `hsl(${hue}, 100%, ${background.brightness})`;
  return pastel;
};

const drawBackground = () => {
  ctx.fillStyle = background.static ? background.default : genColor();
  ctx.fillRect(0, 0, format.width, format.height);
};

const addMetadata = (_dna, _edition) => {
  let dateTime = Date.now();
  let tempMetadata = {
    name: `${namePrefix} #${_edition}`,
    description: description,
    image: `${baseUri}/${_edition}.png`,
    dna: sha1(_dna),
    edition: _edition,
    date: dateTime,
    ...extraMetadata,
    attributes: attributesList,
    compiler: "Trust Staking",
  };
  if (network == NETWORK.sol) {
    tempMetadata = {
      //Added metadata for solana
      name: tempMetadata.name,
      symbol: solanaMetadata.symbol,
      description: tempMetadata.description,
      //Added metadata for solana
      seller_fee_basis_points: solanaMetadata.seller_fee_basis_points,
      image: `image.png`,
      //Added metadata for solana
      external_url: solanaMetadata.external_url,
      edition: _edition,
      ...extraMetadata,
      attributes: tempMetadata.attributes,
      properties: {
        files: [
          {
            uri: "image.png",
            type: "image/png",
          },
        ],
        category: "image",
        creators: solanaMetadata.creators,
      },
    };
  }
  metadataList.push(tempMetadata);
  attributesList = [];
};

const addAttributes = (_element) => {
  let selectedElement = _element.layer.selectedElement;
  attributesList.push({
    trait_type: _element.layer.name,
    value: selectedElement.name,
  });
};

const loadLayerImg = async (_layer) => {
  return new Promise(async (resolve) => {
    // console.log(_layer);
    const image = await loadImage(`${_layer.selectedElement.path}`);
    resolve({ layer: _layer, loadedImage: image });
  });
};

const addText = (_sig, x, y, size) => {
  ctx.fillStyle = text.color;
  ctx.font = `${text.weight} ${size}pt ${text.family}`;
  ctx.textBaseline = text.baseline;
  ctx.textAlign = text.align;
  ctx.fillText(_sig, x, y);
};

const drawElement = (_renderObject, _index, _layersLen) => {
  ctx.globalAlpha = _renderObject.layer.opacity;
  ctx.globalCompositeOperation = _renderObject.layer.blend;
  text.only
    ? addText(
      `${_renderObject.layer.name}${text.spacer}${_renderObject.layer.selectedElement.name}`,
      text.xGap,
      text.yGap * (_index + 1),
      text.size
    )
    : ctx.drawImage(
      _renderObject.loadedImage,
      0,
      0,
      format.width,
      format.height
    );

  addAttributes(_renderObject);
};

const constructLayerToDna = (_dna = "", _layers = []) => {
  let mappedDnaToLayers = _layers.map((layer, index) => {
    let selectedElement = layer.elements.find(
      (e) => e.id == cleanDna(_dna.split(DNA_DELIMITER)[index])
    );
    return {
      name: layer.name,
      blend: layer.blend,
      opacity: layer.opacity,
      selectedElement: selectedElement,
    };
  });
  return mappedDnaToLayers;
};

/**
 * In some cases a DNA string may contain optional query parameters for options
 * such as bypassing the DNA isUnique check, this function filters out those
 * items without modifying the stored DNA.
 *
 * @param {String} _dna New DNA string
 * @returns new DNA string with any items that should be filtered, removed.
 */
const filterDNAOptions = (_dna) => {
  const dnaItems = _dna.split(DNA_DELIMITER);
  const filteredDNA = dnaItems.filter((element) => {
    const query = /(\?.*$)/;
    const querystring = query.exec(element);
    if (!querystring) {
      return true;
    }
    const options = querystring[1].split("&").reduce((r, setting) => {
      const keyPairs = setting.split("=");
      return { ...r, [keyPairs[0]]: keyPairs[1] };
    }, []);

    return options.bypassDNA;
  });

  return filteredDNA.join(DNA_DELIMITER);
};

/**
 * Cleaning function for DNA strings. When DNA strings include an option, it
 * is added to the filename with a ?setting=value query string. It needs to be
 * removed to properly access the file name before Drawing.
 *
 * @param {String} _dna The entire newDNA string
 * @returns Cleaned DNA string without querystring parameters.
 */
const removeQueryStrings = (_dna) => {
  const query = /(\?.*$)/;
  return _dna.replace(query, "");
};

const isDnaUnique = (_DnaList = new Set(), _dna = "") => {
  const _filteredDNA = filterDNAOptions(_dna);
  return !_DnaList.has(_filteredDNA);
};

const createDna = (_layers) => {
  let randNum = [];
  _layers.forEach((layer) => {
    var totalWeight = 0;
    layer.elements.forEach((element) => {
      totalWeight += element.weight;
    });
    // number between 0 - totalWeight
    let random = Math.floor(Math.random() * totalWeight);
    for (var i = 0; i < layer.elements.length; i++) {
      // subtract the current weight from the random weight until we reach a sub zero value.
      random -= layer.elements[i].weight;
      if (random < 0) {
        return randNum.push(
          `${layer.elements[i].id}:${layer.elements[i].filename}${layer.bypassDNA ? "?bypassDNA=true" : ""
          }`
        );
      }
    }
  });
  return randNum.join(DNA_DELIMITER);
};

const writeMetaData = (_data) => {
  fs.writeFileSync(`${buildDir}/json/_metadata.json`, _data);
};

const saveMetaDataSingleFile = (_editionCount) => {
  let metadata = metadataList.find((meta) => meta.edition == _editionCount);
  debugLogs
    ? console.log(
      `Writing metadata for ${_editionCount}: ${JSON.stringify(metadata)}`
    )
    : null;
  fs.writeFileSync(
    `${buildDir}/json/${_editionCount}.json`,
    JSON.stringify(metadata, null, 2)
  );
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const startCreating = async () => {
  let layerConfigIndex = 0;
  let editionCount = 1;
  let failedCount = 0;
  let abstractedIndexes = [];
  console.log("Here:", layerConfigurations.length);
  for (
    let i = network == NETWORK.sol ? 0 : 1;
    i <= layerConfigurations[layerConfigurations.length - 1].growEditionSizeTo;
    i++
  ) {
    abstractedIndexes.push(i);
  }
  if (shuffleLayerConfigurations) {
    abstractedIndexes = shuffle(abstractedIndexes);
  }
  debugLogs
    ? console.log("Editions left to create: ", abstractedIndexes)
    : null;
  while (layerConfigIndex < layerConfigurations.length) {
    const layers = layersSetup(
      layerConfigurations[layerConfigIndex].layersOrder
    );
    while (
      editionCount <= layerConfigurations[layerConfigIndex].growEditionSizeTo
    ) {
      let newDna = createDna(layers);
      if (isDnaUnique(dnaList, newDna)) {
        let results = constructLayerToDna(newDna, layers);
        const valid = isMixValid(results);
        if (!valid) {
          failedCount++;
          console.log("Invalid NFT requirements for attributes");
          if (failedCount >= uniqueDnaTorrance) {
            console.log(
              `You need more layers or elements to grow your edition to ${layerConfigurations[layerConfigIndex].growEditionSizeTo} artworks!`
            );
            process.exit();
          }
          continue;
        }
        // console.log(results);
        let loadedElements = [];

        results.forEach((layer) => {
          loadedElements.push(loadLayerImg(layer));
        });

        await Promise.all(loadedElements).then((renderObjectArray) => {
          debugLogs ? console.log("Clearing canvas") : null;
          ctx.clearRect(0, 0, format.width, format.height);
          if (gif.export) {
            hashlipsGiffer = new HashlipsGiffer(
              canvas,
              ctx,
              `${buildDir}/gifs/${abstractedIndexes[0]}.gif`,
              gif.repeat,
              gif.quality,
              gif.delay
            );
            hashlipsGiffer.start();
          }
          if (background.generate) {
            drawBackground();
          }
          renderObjectArray.forEach((renderObject, index) => {
            drawElement(
              renderObject,
              index,
              layerConfigurations[layerConfigIndex].layersOrder.length
            );
            if (gif.export) {
              hashlipsGiffer.add();
            }
          });
          if (gif.export) {
            hashlipsGiffer.stop();
          }
          debugLogs
            ? console.log("Editions left to create: ", abstractedIndexes)
            : null;
          saveImage(abstractedIndexes[0]);
          addMetadata(newDna, abstractedIndexes[0]);
          saveMetaDataSingleFile(abstractedIndexes[0]);
          console.log(
            `Created edition: ${abstractedIndexes[0]}, with DNA: ${sha1(
              newDna
            )}`
          );
        });
        dnaList.add(filterDNAOptions(newDna));
        editionCount++;
        abstractedIndexes.shift();
      } else {
        console.log("DNA exists!");
        failedCount++;
        if (failedCount >= uniqueDnaTorrance) {
          console.log(
            `You need more layers or elements to grow your edition to ${layerConfigurations[layerConfigIndex].growEditionSizeTo} artworks!`
          );
          process.exit();
        }
      }
    }
    layerConfigIndex++;
  }
  writeMetaData(JSON.stringify(metadataList, null, 2));
};
const isMixValid = (layers) => {
  let structJS = {};
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    structJS = { ...structJS, [layer.name]: layer.selectedElement.name }
  }
  let countTrue = 0;
  // Background - Fur
  if (structJS["Fur"] === "fur18" && ["background1", "background6", "background8"].includes(structJS["Background"])) {
    countTrue += 1;
  } else if (structJS["Fur"] === "fur20" && ["background0"].includes(structJS["Background"])) {
    countTrue += 1;
  }
  else if (structJS["Fur"] === "fur6" && ["background8"].includes(structJS["Background"])) {
    countTrue += 0;
  }
  else if (structJS["Fur"] === "fur15" && ["background3", "background5", "background8"].includes(structJS["Background"])) {
    countTrue += 0;
  }
  else if (structJS["Fur"] === "fur19" && ["background8"].includes(structJS["Background"])) {
    countTrue += 0;
  } else {
    countTrue += 1;
  }
  // Background - Outfits
  if (structJS["Background"] === "background8" && ["outfit15", "outfit27", "outfit38", "outfit41"].includes(structJS["Outfits"])) {
    countTrue += 0;
  } else {
    countTrue += 1;
  }
  // Mouth - Background
  if (["mouth13", "mouth14", "mouth15", " mouth16", "mouth17", "mouth18"].includes(structJS["Mouth"]) && ["background5"].includes(structJS["Background"])) {
    countTrue += 1;
  } else {
    countTrue += 1;
  }
  // Outfit - Fur (General)
  if (["outfit1", "outfit2", "outfit3", " outfit7", "outfit9", "outfit10", "outfit11", "outfit12", "outfit13", "outfit14", "outfit16", "outfit18", "outfit19", "outfit20", "outfit26", "outfit28", "outfit30", "outfit40"].includes(structJS["Outfits"]) && ["fur0", "fur1", "fur2", "fur3", "fur4", "fur5", "fur6", "fur7", "fur8", "fur9", "fur10", "fur11"].includes(structJS["Fur"])) {
    countTrue += 1;
  } else if (["outfit1", "outfit2", "outfit3", " outfit7", "outfit9", "outfit10", "outfit11", "outfit12", "outfit13", "outfit14", "outfit16", "outfit18", "outfit19", "outfit20", "outfit26", "outfit28", "outfit30", "outfit40"].includes(structJS["Outfits"])) {
    countTrue += 0;
  } else if (["outfit4", "outfit5", "outfit6", " outfit8", "outfit15", "outfit17", "outfit21", "outfit22", "outfit23", "outfit24", "outfit25", "outfit27", "outfit29", "outfit32", "outfit33", "outfit34", "outfit35", "outfit36", "outfit37", "outfit38", "outfit39", "outfit41"].includes(structJS["Outfits"]) && ["fur0", "fur1", "fur2", "fur3", "fur4", "fur5", "fur6", "fur7"].includes(structJS["Fur"])) {
    countTrue += 1;
  } else if (["outfit4", "outfit5", "outfit6", " outfit8", "outfit15", "outfit17", "outfit21", "outfit22", "outfit23", "outfit24", "outfit25", "outfit27", "outfit29", "outfit32", "outfit33", "outfit34", "outfit35", "outfit36", "outfit37", "outfit38", "outfit39", "outfit41"].includes(structJS["Outfits"])) {
    countTrue += 0;
  } else if (["fur5", "fur7", "fur8"].includes(structJS["Fur"]) && structJS["Outfits"] === "outfit12") {
    countTrue += 0;
  } else if (["fur10"].includes(structJS["Fur"]) && structJS["Outfits"] === "outfit30") {
    countTrue += 0;
  } else if (["fur14"].includes(structJS["Fur"]) && ["outfit3", "outfit5", "outfit10", "outfit11", "outfit14", "outfit16", "outfit18", "outfit20", "outfit26",].includes(structJS["Outfits"])) {
    countTrue += 1;
  } else if (["fur14"].includes(structJS["Fur"])) {
    countTrue += 0;
  } else if (["fur15", "fur16", "fur19", "fur20"].includes(structJS["Fur"]) && ["outfit13", "outfit14", "outfit16", "outfit18", "outfit26"].includes(structJS["Outfits"])) {
    countTrue += 1;
  } else if (["fur15", "fur16", "fur19", "fur20"].includes(structJS["Fur"])) {
    countTrue += 0;
  } else if (["fur17"].includes(structJS["Fur"]) && ["outfit18", "outfit26", "outfit40"].includes(structJS["Outfits"])) {
    countTrue += 0;
  } else if (["fur18"].includes(structJS["Fur"]) && ["outfit2", "outfit6", "outfit10", "outfit13", "outfit17", "outfit30", "outfit37", "outfit40"].includes(structJS["Outfits"])) {
    countTrue += 1;
  } else if (["fur18"].includes(structJS["Fur"])) {
    countTrue += 0;
  }
  else {
    countTrue += 1;
  }
  //Fur - Mouth
  if (["fur17"].includes(structJS["Fur"]) && ["mouth0", "mouth3", "mouth19", "mouth20", "mouth21", "mouth22", "mouth23", "mouth24", "mouth25"].includes(structJS["Mouth"])) {
    countTrue += 1;
  } else if (["fur17"].includes(structJS["Fur"])) {
    countTrue += 0;
  } else {
    countTrue += 1;
  }
  // Fur - Eyes
  if (["fur8", "fur9", "fur10", "fur11"].includes(structJS["Fur"]) && ["eyes3", "eyes8", "eyes20", "eyes21"].includes(structJS["Eyes"])) {
    countTrue += 0;
  } else if (["fur17"].includes(structJS["Fur"]) && ["eyes8", "eyes20", "eyes21"].includes(structJS["Eyes"])) {
    countTrue += 0;
  } else if (["fur18"].includes(structJS["Fur"]) && ["eyes31", "eyes32", "eyes33"].includes(structJS["Eyes"])) {
    countTrue += 0;
  } else {
    countTrue += 1;
  }
  //Fur - Ear and Head Accessories 
  if (["fur14", "fur15", "fur16", "fur19"].includes(structJS["Fur"]) && !structJS["Accessories"].includes("ear")) {
    countTrue += 0;
  } else if (["fur14", "fur15", "fur16", "fur19"].includes(structJS["Fur"]) && structJS["Accessories"].includes("ear")) {
    countTrue += 1;
  } else if (["fur14", "fur15", "fur16", "fur19"].includes(structJS["Fur"])) {
    countTrue += 0;
  } else if (["fur18"].includes(structJS["Fur"]) && structJS["Accessories"].includes("head") && ["head8", "head11"].includes(structJS["Accessories"])) {
    countTrue += 1;
  } else if (["fur18"].includes(structJS["Fur"])) {
    countTrue += 0;
  } else if (["fur17"].includes(structJS["Fur"]) && structJS["Accessories"].includes("head") && ["head3", "head8", "head11"].includes(structJS["Accessories"])) {
    countTrue += 1;
  } else if (["fur17"].includes(structJS["Fur"])) {
    countTrue += 0;
  } else if (["fur8", "fur9", "fur10", "fur11"].includes(structJS["Fur"]) && structJS["Accessories"].includes("head") && ["head1", "head2"].includes(structJS["Accessories"])) {
    countTrue += 0;
  } else if (["fur8", "fur9", "fur10", "fur11"].includes(structJS["Fur"])) {
    countTrue += 1;
  } else if (structJS["Accessories"].includes("hair") && ["hair14", "hair15", "hair16"].includes(structJS["Accessories"]) && ["outfit4", "outfit5", "outfit6", " outfit8", "outfit15", "outfit17", "outfit21", "outfit22", "outfit23", "outfit24", "outfit25", "outfit27", "outfit29", "outfit32", "outfit33", "outfit34", "outfit35", "outfit36", "outfit37", "outfit38", "outfit39", "outfit41"].includes(structJS["Outfits"])) {
    countTrue += 1;
  } else if(["outfit4", "outfit5", "outfit6", " outfit8", "outfit15", "outfit17", "outfit21", "outfit22", "outfit23", "outfit24", "outfit25", "outfit27", "outfit29", "outfit32", "outfit33", "outfit34", "outfit35", "outfit36", "outfit37", "outfit38", "outfit39", "outfit41"].includes(structJS["Outfits"])) {
    countTrue += 0;
  } else {
    countTrue += 1;
  }
  if (countTrue === 7) {
    return true;
  }
  return false;
};
module.exports = { startCreating, buildSetup, getElements };

const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Elrond Girls";
const description = "The Elrond Girls NFT Collection";
const baseUri = "ipfs://NewUriToReplace";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 45,
    layersOrder: [
      { name: "Backgrounds" },
      { name: "Skins" },
      {
        name: "MakeUp",
      },
      {
        name: "Eyes",
      },
      { name: "Lashes" },
      { name: "Hair" },
      {
        name: "Tattoos",
      },
      {
        name: "Sunglasses",
      },
      { name: "Earrings" },
      {
        name: "Neck",
      },
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 88,
    layersOrder: [
      { name: "Backgrounds" },
      { name: "Skins" },
      {
        name: "MakeUp",
      },
      {
        name: "Eyes",
      },
      { name: "Lashes" },
      { name: "Hair" },
      {
        name: "Tattoos",
      },
      {
        name: "Sunglasses",
      },
      { name: "Earrings" },
      {
        name: "Neck",
      },
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 550,
  height: 550,
  width: 512,
  height: 512,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 10 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {
  royalty: 1000,
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 20,
  thumbWidth: 100,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};

const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Elrond Monkeys";
const description =
  "The unique Elrond Monkeys NFT Collection by Trust Staking!";
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
    growEditionSizeTo: 116,
    layersOrder: [
      { name: "Background" },
      { name: "Weapon" }, // Dynamic
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Rings", // Dynamic
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      { name: "Scar" }, // Dynamic
      {
        name: "Accessory", // Dynamic
      },
    ],
  },
  
  {
    growEditionSizeTo: 232,
    layersOrder: [
      { name: "Background" },
      { name: "Weapon" }, // Dynamic
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Rings", // Dynamic
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      { name: "Scar" }, // Dynamic
      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 580,
    layersOrder: [
      { name: "Background" },
      { name: "Weapon" }, // Dynamic
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Rings", // Dynamic
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      { name: "Scar" }, // Dynamic
      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 696,
    layersOrder: [
      { name: "Background" },
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Rings", // Dynamic
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      { name: "Scar" }, // Dynamic
      { name: "Lasers" }, // Dynamic
      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 928,
    layersOrder: [
      { name: "Background" },
      { name: "Weapon" }, // Dynamic
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Rings", // Dynamic
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      { name: "Scar" }, // Dynamic
    ],
  },

  {
    growEditionSizeTo: 1044,
    layersOrder: [
      { name: "Background" },
      { name: "Weapon" }, // Dynamic
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Rings", // Dynamic
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 1160,
    layersOrder: [
      { name: "Background" },
      { name: "Weapon" }, // Dynamic
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      { name: "Scar" }, // Dynamic
      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 1276,
    layersOrder: [
      { name: "Background" },
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Rings", // Dynamic
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      { name: "Scar" }, // Dynamic
      { name: "Lasers" }, // Dynamic
    ],
  },

  {
    growEditionSizeTo: 1392,
    layersOrder: [
      { name: "Background" },
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Rings", // Dynamic
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      { name: "Scar" }, // Dynamic
      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 1508,
    layersOrder: [
      { name: "Background" },
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Rings", // Dynamic
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      { name: "Lasers" }, // Dynamic
      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 1624,
    layersOrder: [
      { name: "Background" },
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      { name: "Scar" }, // Dynamic
      { name: "Lasers" }, // Dynamic
      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 1740,
    layersOrder: [
      { name: "Background" },
      { name: "Weapon" }, // Dynamic
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Rings", // Dynamic
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
    ],
  },

  {
    growEditionSizeTo: 1856,
    layersOrder: [
      { name: "Background" },
      { name: "Weapon" }, // Dynamic
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 1972,
    layersOrder: [
      { name: "Background" },
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Rings", // Dynamic
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      { name: "Scar" }, // Dynamic
    ],
  },

  {
    growEditionSizeTo: 2088,
    layersOrder: [
      { name: "Background" },
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Rings", // Dynamic
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      { name: "Lasers" }, // Dynamic
    ],
  },

  {
    growEditionSizeTo: 2204,
    layersOrder: [
      { name: "Background" },
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Rings", // Dynamic
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 2320,
    layersOrder: [
      { name: "Background" },
      { name: "Body" },
      {
        name: "Ears",
      },
      {
        name: "Eyes",
      },
      {
        name: "Head",
      },
      { name: "Lasers" }, // Dynamic
      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 2436,

    layersOrder: [
      { name: "Background" },

      { name: "Weapon" }, // Dynamic

      { name: "Body" },

      {
        name: "Ears",
      },

      {
        name: "Rings", // Dynamic
      },

      {
        name: "Eyes",
      },

      {
        name: "Head",
      },

      { name: "Scar" }, // Dynamic

      { name: "Flash" }, // Dynamic

      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 2552,

    layersOrder: [
      { name: "Background" },

      { name: "Weapon" }, // Dynamic

      { name: "Body" },

      {
        name: "Ears",
      },

      {
        name: "Rings", // Dynamic
      },

      {
        name: "Eyes",
      },

      {
        name: "Head",
      },

      { name: "Scar" }, // Dynamic

      { name: "Flash" }, // Dynamic
    ],
  },

  {
    growEditionSizeTo: 2668,

    layersOrder: [
      { name: "Background" },

      { name: "Body" },

      {
        name: "Ears",
      },

      {
        name: "Rings", // Dynamic
      },

      {
        name: "Eyes",
      },

      {
        name: "Head",
      },

      { name: "Scar" }, // Dynamic

      { name: "Flash" }, // Dynamic

      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 2784,

    layersOrder: [
      { name: "Background" },

      { name: "Body" },

      {
        name: "Ears",
      },

      {
        name: "Rings", // Dynamic
      },

      {
        name: "Eyes",
      },

      {
        name: "Head",
      },

      { name: "Scar" }, // Dynamic

      { name: "Flash" }, // Dynamic
    ],
  },

  {
    growEditionSizeTo: 2900,

    layersOrder: [
      { name: "Background" },

      { name: "Body" },

      {
        name: "Ears",
      },

      {
        name: "Rings", // Dynamic
      },

      {
        name: "Eyes",
      },

      {
        name: "Head",
      },

      { name: "Flash" }, // Dynamic

      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 3016,

    layersOrder: [
      { name: "Background" },

      { name: "Body" },

      {
        name: "Ears",
      },

      {
        name: "Eyes",
      },

      {
        name: "Head",
      },

      { name: "Scar" }, // Dynamic

      { name: "Flash" }, // Dynamic

      {
        name: "Accessory", // Dynamic
      },
    ],
  },

  {
    growEditionSizeTo: 3132,

    layersOrder: [
      { name: "Background" },

      { name: "Body" },

      {
        name: "Ears",
      },

      {
        name: "Rings", // Dynamic
      },

      {
        name: "Eyes",
      },

      {
        name: "Head",
      },

      { name: "Flash" }, // Dynamic
    ],
  },

  {
    growEditionSizeTo: 3141,

    layersOrder: [
      { name: "Background" },

      { name: "Body" },

      {
        name: "Ears",
      },

      {
        name: "Eyes",
      },

      {
        name: "Head",
      },

      { name: "Flash" }, // Dynamic

      {
        name: "Accessory", // Dynamic
      },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 1000,
  height: 1000,
  smoothing: true,
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
  tags: [
    "eGirl",
    "TrustStaking",
    "Digital",
    "Girls",
    "Premium",
    "Rarity",
    "VIP",
    "Unique",
  ],
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 100,
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

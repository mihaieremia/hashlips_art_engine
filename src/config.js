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
    growEditionSizeTo: 85,
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
    growEditionSizeTo: 170,
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
  {
    growEditionSizeTo: 336,
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
    ],
  },
  {
    growEditionSizeTo: 502,
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
    ],
  },
  {
    growEditionSizeTo: 668,
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
      {
        name: "Neck",
      },
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 834,
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
      {
        name: "Neck",
      },
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 1000,
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
  {
    growEditionSizeTo: 1166,
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
    growEditionSizeTo: 1332,
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
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 1498,
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
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 1664,
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
      { name: "Earrings" },
      {
        name: "Neck",
      },
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 1830,
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
      { name: "Earrings" },
      {
        name: "Neck",
      },
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 1996,
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
      {
        name: "Neck",
      },
      { name: "Lips" },
    ],
  },
  {
    growEditionSizeTo: 2162,
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
      {
        name: "Neck",
      },
      { name: "Masks" },
    ],
  },
  {
    growEditionSizeTo: 2328,
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
        name: "Sunglasses",
      },
      { name: "Earrings" },
      {
        name: "Neck",
      },
      { name: "Lips" },
    ],
  },
  {
    growEditionSizeTo: 2494,
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
        name: "Sunglasses",
      },
      { name: "Earrings" },
      {
        name: "Neck",
      },
      { name: "Masks" },
    ],
  },
  {
    growEditionSizeTo: 2660,
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
        name: "Sunglasses",
      },
      {
        name: "Neck",
      },
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 2826,
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
        name: "Sunglasses",
      },
      {
        name: "Neck",
      },
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 2992,
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
      { name: "Lips" },
    ],
  },
  {
    growEditionSizeTo: 3158,
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
      { name: "Masks" },
    ],
  },
  {
    growEditionSizeTo: 3324,
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
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 3490,
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
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 3656,
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
        name: "Sunglasses",
      },
      { name: "Earrings" },
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 3822,
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
        name: "Sunglasses",
      },
      { name: "Earrings" },
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 3988,
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
        name: "Sunglasses",
      },
      { name: "Earrings" },
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 4154,
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
        name: "Sunglasses",
      },
      { name: "Earrings" },
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 4320,
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
      { name: "Earrings" },
      {
        name: "Neck",
      },
      { name: "Lips" },
    ],
  },
  {
    growEditionSizeTo: 4486,
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
      { name: "Earrings" },
      {
        name: "Neck",
      },
      { name: "Masks" },
    ],
  },
  {
    growEditionSizeTo: 4652,
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
        name: "Neck",
      },
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 4818,
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
        name: "Neck",
      },
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 4984,
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
      { name: "Earrings" },
      {
        name: "Neck",
      },
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 5150,
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
      { name: "Earrings" },
      {
        name: "Neck",
      },
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 5316,
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
      { name: "Earrings" },
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 5482,
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
      { name: "Earrings" },
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 5648,
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
        name: "Sunglasses",
      },
      {
        name: "Neck",
      },
      { name: "Lips" },
    ],
  },
  {
    growEditionSizeTo: 5814,
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
        name: "Sunglasses",
      },
      {
        name: "Neck",
      },
      { name: "Masks" },
    ],
  },
  {
    growEditionSizeTo: 5980,
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
      { name: "Lips" },
    ],
  },
  {
    growEditionSizeTo: 6146,
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
      { name: "Masks" },
    ],
  },
  {
    growEditionSizeTo: 6312,
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
        name: "Sunglasses",
      },
      { name: "Earrings" },
      { name: "Lips" },
    ],
  },
  {
    growEditionSizeTo: 6478,
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
        name: "Sunglasses",
      },
      { name: "Earrings" },
      { name: "Masks" },
    ],
  },
  {
    growEditionSizeTo: 6644,
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
        name: "Sunglasses",
      },
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 6810,
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
        name: "Sunglasses",
      },
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 6976,
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
        name: "Neck",
      },
      { name: "Lips" },
    ],
  },
  {
    growEditionSizeTo: 7142,
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
        name: "Neck",
      },
      { name: "Masks" },
    ],
  },
  {
    growEditionSizeTo: 7308,
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
      { name: "Earrings" },
      {
        name: "Neck",
      },
      { name: "Lips" },
    ],
  },
  {
    growEditionSizeTo: 7474,
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
      { name: "Earrings" },
      {
        name: "Neck",
      },
      { name: "Masks" },
    ],
  },
  {
    growEditionSizeTo: 7640,
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
        name: "Neck",
      },
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 7806,
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
        name: "Neck",
      },
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 7972,
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
      { name: "Earrings" },
      { name: "Lips" },
    ],
  },
  {
    growEditionSizeTo: 8138,
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
      { name: "Earrings" },
      { name: "Masks" },
    ],
  },
  {
    growEditionSizeTo: 8304,
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
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 8470,
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
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 8636,
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
      { name: "Earrings" },
      { name: "Lips" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 8802,
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
      { name: "Earrings" },
      { name: "Masks" },
      { name: "Pets" },
    ],
  },
  {
    growEditionSizeTo: 8968,
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
        name: "Sunglasses",
      },
      { name: "Lips" },
    ],
  },
  {
    growEditionSizeTo: 9134,
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
        name: "Sunglasses",
      },
      { name: "Masks" },
    ],
  },
  {
    growEditionSizeTo: 9300,
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
        name: "Neck",
      },
      { name: "Lips" },
    ],
  },
  {
    growEditionSizeTo: 9466,
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
        name: "Neck",
      },
      { name: "Masks" },
    ],
  },
  {
    growEditionSizeTo: 9632,
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
      { name: "Lips" },
    ],
  },
  {
    growEditionSizeTo: 9798,
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
      { name: "Masks" },
    ],
  },
  {
    growEditionSizeTo: 9964,
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
      { name: "Earrings" },
      { name: "Lips" },
    ],
  },
  {
    growEditionSizeTo: 10000,
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
      { name: "Earrings" },
      { name: "Masks" },
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

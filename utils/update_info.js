const basePath = process.cwd();
const fs = require("fs");

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

data.forEach((item, index) => {
  // delete item.name;
  delete item.image;
  delete item.edition;
  delete item.date;
  delete item.fee_recipient;
  delete item.seller_fee_basis_points;
  delete item.image;
  delete item.tags;
  delete item.royalty;
  delete item.external_url;
  // delete item.description;
  item.compiler = "Trust Staking";
  // item.description = "Unique NFT collection of 10.000 avatars depicting the Dacian Draco that was the standard ensign of troops of the ancient Dacian people."
  fs.writeFileSync(
    `${basePath}/build/json/${index + 1}.json`,
    JSON.stringify(item, null, 2)
  );
});

fs.writeFileSync(
  `${basePath}/build/json/_metadata.json`,
  JSON.stringify(data, null, 2)
);


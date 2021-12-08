const basePath = process.cwd();
const fs = require("fs");

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

data.forEach((item, index) => {
  delete item.name;
  delete item.image;
  delete item.edition;
  delete item.date;
  delete item.fee_recipient;
  delete item.seller_fee_basis_points;
  delete item.image;
  delete item.image;
  delete item.external_url;
  item.compiler = "Trust Staking";
  // item.description = "Being a jaguar is the advantage of joining one of the most private groups on the blockchain!"
  fs.writeFileSync(
    `${basePath}/build/json/${index + 1}.json`,
    JSON.stringify(item, null, 2)
  );
});

fs.writeFileSync(
  `${basePath}/build/json/_metadata.json`,
  JSON.stringify(data, null, 2)
);


// const basePath = process.cwd();
// const fs = require("fs");
const sharp = require("sharp");

// // read json data
// let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
// let data = JSON.parse(rawdata);
// data.forEach((item, index) => {
//   delete item.name;
//   delete item.image;
//   delete item.edition;
//   delete item.date;
//   delete item.fee_recipient;
//   delete item.seller_fee_basis_points;
//   delete item.image;
//   delete item.tags;
//   delete item.royalty;
//   delete item.name;
//   delete item.external_url;
//   // delete item.description;
//   item.compiler = "XOXNO";
//   // item.description = "Unique NFT collection of 10.000 avatars depicting the Dacian Draco that was the standard ensign of troops of the ancient Dacian people."
//   fs.writeFileSync(
//     `/Users/truststaking/MEGAsync Downloads/brawl/metadata/${index + 1}.json`,
//     JSON.stringify(item, null, 2)
//   );
// });
// fs.writeFileSync(
//   `${basePath}/build/json/_metadata.json`,
//   JSON.stringify(data, null, 2)
// );

// const asyncPool = require("tiny-async-pool");
const fn = async (index) => {
  console.log(index);
  try {
    await sharp(
      `/Users/truststaking/MEGAsync Downloads/brawl/7877_brawl/${index}.png`
    )
      .png({
        quality: 60,
        compressionLevel: 9,
        effort: 7,
      })
      .toFile(
        `/Users/truststaking/MEGAsync Downloads/brawl/7887_brawl_small/${index}.png`
      );
  } catch (error) {
    console.log(error);
  }
};
async function resizeImage() {
  const array = [];
  for (let index = 1; index <= 7878; index++) {
    array.push(fn(index));
  }
  await Promise.all(array);
  // console.log(array);
  // await asyncPool(100, array, async (index) => await fn(index));
}

resizeImage();

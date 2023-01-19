const basePath = process.cwd();
const fs = require("fs");

// read json data
let rawdata = fs.readFileSync(`${basePath}/utils/StramosiSnapshot.json`, {
    encoding: "utf-8"
});

// const lines = rawdata.split(/\r?\n/);
const data = JSON.parse(rawdata);
// print all lines
// lines.forEach((line) => {
//     if (line && line.trim().length === 62) {
//         console.log(line.trim());
//         data.push(line.trim());
//     }
// });
const unique = new Set();
data.forEach((item) => {
    unique.add(item.owner);
});
// console.log(unique);
console.log(data.length);
console.log(unique.size);

// console.log(unique.values());

fs.writeFileSync(
  `${basePath}/utils/wl2Final.json`,
  JSON.stringify([...unique], null, 2)
);

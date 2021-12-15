const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require("fs");
const path = require("path");
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
// read contents of the file
const names = fs.readFileSync(`${basePath}/build/names.txt`, 'UTF-8');

// split the contents by new line
const lines = names.split(/\r?\n/);
data.forEach((item, index) => {
    item.name = lines[index];
});

fs.writeFileSync(
    `${basePath}/build/json/_metadata.json`,
    JSON.stringify(data, null, 2)
);

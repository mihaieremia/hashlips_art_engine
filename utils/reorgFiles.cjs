const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require("fs");
const path = require("path");
const writeMetaData = (_data) => {
    fs.writeFileSync(`${basePath}/build/json/_metadata.json`, _data);
};
const reorgFiles = async () => {

    const emptyIDsUnder10k = [];
    const tmpMetadata = [];
    for (i = 1; i < 10001; i++) {
        try {
            await fs.promises.access(`${basePath}/build/json/${i}.json`);
            let OLDJSON = await fs.promises.readFile(`${basePath}/build/json/${i}.json`, "ascii");
            tmpMetadata.push(JSON.parse(OLDJSON));
            // console.log(`File ${i}.json exists`);
        } catch (error) {
            console.log(`File ${i}.json is missing`);
            // emptyIDsUnder10k.push(i);
        }
    }
    if (tmpMetadata.length === 10000) {
        writeMetaData(JSON.stringify(tmpMetadata, null, 2));
    }
    // const filesAbove10000 = [];
    // for (i = 10001; i < 15001; i++) {
    //     try {
    //         await fs.promises.access(`${basePath}/build/stramosi/json/${i}.json`);
    //         filesAbove10000.push(i);
    //         // console.log(`File ${i}.json exists`);
    //     } catch (error) {
    //         // console.log(`File ${i}.json is missing`);
    //     }
    // }
    // for (i = 0; i < emptyIDsUnder10k.length; i++) {
    //     const emptyID = emptyIDsUnder10k[i];
    //     const IDtoChange = filesAbove10000.pop();
    //     console.log(`Replace ${emptyID} with ${IDtoChange}`);
    //     let OLDJSON = fs.readFileSync(`${basePath}/build/stramosi/json/${IDtoChange}.json`, "ascii");
    //     let newJSON = JSON.parse(OLDJSON);
    //     newJSON.name = `Stramosi #${emptyID}`;
    //     newJSON.edition = emptyID;
    //     fs.writeFileSync(
    //         `${basePath}/build/stramosi/json/${IDtoChange}.json`,
    //         JSON.stringify(newJSON, null, 2)
    //     );
    //     fs.renameSync(`${basePath}/build/stramosi/json/${IDtoChange}.json`, `${basePath}/build/stramosi/json/${emptyID}.json`)
    //     fs.renameSync(`${basePath}/build/stramosi/images/${IDtoChange}.png`, `${basePath}/build/stramosi/images/${emptyID}.png`)
    // };
};
reorgFiles();
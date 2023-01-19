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
    for (i = 1; i <= 7878; i++) {
        try {
            await fs.promises.access(`/Users/truststaking/MEGAsync Downloads/brawl/metadata/${i}.json`);
            let OLDJSON = await fs.promises.readFile(`/Users/truststaking/MEGAsync Downloads/brawl/metadata/${i}.json`);
            // console.log(OLDJSON);
            try {
                tmpMetadata.push(JSON.parse(OLDJSON));
            } catch (error) {
                console.log(i);
            }
            // console.log(`File ${i}.json exists`);
        } catch (error) {
            console.log(error);
            // emptyIDsUnder10k.push(i);
        }
    }
    if (tmpMetadata.length === 7878) {
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
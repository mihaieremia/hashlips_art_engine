const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require("fs");
const path = require("path");
const buildDir = `${basePath}/build`;

// read json data
const rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
const metadataList = JSON.parse(rawdata);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkzYzc4NGE3OTlCZTNhZUZCOEFlRDFjZTZmRDY2OUM0MkEzOTBjMjAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNTk4MzUyOTM5MCwibmFtZSI6IlRydXN0In0.MBbl9zDDIgUTxfhQZSdxpPcPGCYncTscNbzMzCuNKNM'
const endpoint = 'https://api.nft.storage';

const uploadNFTs = async (_data) => {

    const nftS = await import('nft.storage');

    const storage = new nftS.NFTStorage({ endpoint, token });
    const directory = [];
    const directoryJSON = [];
    _data.forEach((nft, index) => {
        const nft_id = index + 1;
        directoryJSON.push(new nftS.File([JSON.stringify(nft, null, 2)], `${nft_id}.json`));
        directory.push(new nftS.File(
            [fs.readFileSync(`${buildDir}/images/${nft_id}.png`)],
            `${nft_id}.png`,
            {
                type: 'image/png',
            }));
    });
    console.log(directory[0]);
    console.log(directoryJSON[0]);
    const cid = await storage.storeDirectory(directory);
    const cidJSON = await storage.storeDirectory(directoryJSON);
    console.log(cid);
    console.log(cidJSON);
};
uploadNFTs(metadataList);
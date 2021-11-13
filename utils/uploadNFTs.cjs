const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require("fs");
const path = require("path");
const buildDir = `${basePath}/build`;

// read json data
const rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
const metadataList = JSON.parse(rawdata);
const collectionTicker = Buffer.from("EGIRLS-3efe32").toString('hex');
const collectionFee = "09c4"; //25%
const initialQuantitu = "01" //1

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkzYzc4NGE3OTlCZTNhZUZCOEFlRDFjZTZmRDY2OUM0MkEzOTBjMjAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNTk4MzUyOTM5MCwibmFtZSI6IlRydXN0In0.MBbl9zDDIgUTxfhQZSdxpPcPGCYncTscNbzMzCuNKNM'
const endpoint = 'https://api.nft.storage';

const uploadNFTs = async (_data) => {

    const nftS = await import('nft.storage');

    for (let index = 4; index < 5; index++) {
        const nft = _data[index];
        const storage = new nftS.NFTStorage({ endpoint, token });
        fs.promises.
        const metadata = await storage.store({
            id: nft.edition,
            name: nft.name,
            description: nft.description,
            tags: nft.tags,
            attributes: nft.attributes,
            rarity: nft.rarity,
            collectionInfo: nft.collectionInfo,
            fileHash: nft.dna,
            image: new nftS.File(
                [await fs.promises.readFile(`${buildDir}/images/${nft.edition}.png`)],
                `${nft.edition}.png`,
                {
                    type: 'image/png',
                }
            ),
            fileUri: new nftS.File(
                [await fs.promises.readFile(`${buildDir}/images/${nft.edition}.png`)],
                `${nft.edition}.png`,
                {
                    type: 'image/png',
                }
            ),
            fileName: `${nft.edition}.png`,
            fileType: 'image/png',
            createdAt: nft.date,
        });
        const CIDFile = metadata.data.fileUri.href.replace('ipfs://', '');
        const MetaURL = metadata.url.replace('ipfs://', 'https://ipfs.io/ipfs/');
        _data[index].fileUri = metadata.data.fileUri.href.replace('ipfs://', 'https://ipfs.io/ipfs/');
        _data[index].metadata = metadata.url.replace('ipfs://', '');
        _data[index].hash = _data[index].dna;
        _data[index].mintAttributes = `tags:${nft.tags.join(',')};metadata:${_data[index].metadata}`;
        _data[index].mintAttributesHex = Buffer.from(_data[index].mintAttributes).toString('hex');
        _data[index].mintData = `ESDTNFTCreate@${collectionTicker}@${initialQuantitu}@${Buffer.from(nft.name).toString('hex')}@${collectionFee}@${Buffer.from(CIDFile).toString('hex')}@${_data[index].mintAttributesHex}@${Buffer.from(_data[index].fileUri).toString('hex')}@${Buffer.from(MetaURL).toString('hex')}`;
        delete _data[index].dna;
        fs.writeFileSync(
            `${basePath}/build/json/${nft.edition}.json`,
            JSON.stringify(_data[index], null, 2)
        );
    }
    fs.writeFileSync(
        `${basePath}/build/json/_metadata.json`,
        JSON.stringify(_data, null, 2)
    );
};
uploadNFTs(metadataList);
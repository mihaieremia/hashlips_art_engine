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

    const nftS = await import('nft.storage')

    for (let index = 0; index < _data.length; index++) {
        const nft = _data[index];
        const storage = new nftS.NFTStorage({ endpoint, token })
        const metadata = await storage.store({
            name: nft.name,
            description: nft.description,
            image: new nftS.File(
                [await fs.promises.readFile(`${buildDir}/images/${nft.edition}.png`)],
                `${nft.edition}.png`,
                {
                    type: 'image/png',
                }
            ),
            properties: {
                dna: nft.dna,
                id: nft.edition,
                date: nft.date,
            },
            attributes: nft.attributes,
        });
        _data[index].image = metadata.data.image.href.replace('ipfs://', 'https://ipfs.io/ipfs/');
        _data[index].metadata = metadata.url.replace('ipfs://', 'https://ipfs.io/ipfs/');
        delete _data[index].compiler;
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
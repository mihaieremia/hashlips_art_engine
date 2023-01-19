const {
  Address,
  AddressValue,
  Balance,
  UserSigner,
  BytesValue,
  ContractFunction,
  ProxyProvider,
  Account,
  GasLimit,
  Transaction,
  TransactionPayload,
  Nonce,
} = require("@elrondnetwork/erdjs/out");
const basePath = process.cwd();
const fs = require("fs");
let rawdata = fs.readFileSync(`${basePath}/utils/wl2Final.json`);
let devWallet = fs.readFileSync(`/Users/truststaking/Desktop/PEM/Bananas.pem`, {
  encoding: "utf-8",
});
let walletsArray = JSON.parse(rawdata);
const getChunks = (array, size = 25) => {
  return array.reduce((result, item, current) => {
    const index = Math.floor(current / size);

    if (!result[index]) {
      result[index] = [];
    }

    result[index].push(item);

    return result;
  }, []);
};
const chunks = getChunks(walletsArray, 200);
let signer = UserSigner.fromPem(devWallet, 0);
let provider = new ProxyProvider("https://gateway.elrond.tools", {
  timeout: 100000,
});
let account = new Account(signer.getAddress());
account.sync(provider).then(() => {
  let nonce = account.nonce.valueOf();
  for (let index = 0; index < chunks.length; index++) {
    const wallets = chunks[index];
    const vfWallets = [];
    for (let i = 0; i < wallets.length; i++) {
      const element = wallets[i];
      try {
        const goodWallet = new AddressValue(new Address(element));
        vfWallets.push(goodWallet);
      } catch (error) {
      }
    }
    const func = new ContractFunction("addWhitelists");
    const payload = TransactionPayload.contractCall()
      .setFunction(func)
      .setArgs([BytesValue.fromUTF8("WEB3CREW"), ...vfWallets])
      .build();

    const transaction = new Transaction({
      sender: account.address,
      nonce: new Nonce(nonce),
      receiver: new Address(
        "erd1qqqqqqqqqqqqqpgqysgrm8t59yxtf9jz506z7ylsqj5mwr6pys5sqsr2cr"
      ),
      value: Balance.fromString("0"),
      gasLimit: new GasLimit(600000000),
      data: payload,
      chainID: "1",
    });
    signer.sign(transaction);
    provider.sendTransaction(transaction).then(() => {
      console.log("Index: ", index, " done!");
    });
    nonce += 1;
  }
});

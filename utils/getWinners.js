const basePath = process.cwd();
const fs = require("fs");

// read json data
let rawdata = fs.readFileSync(`${basePath}/build/stramosi.json`);
let data = JSON.parse(rawdata);
const tickets = [];
const usedTickets = new Set();
Object.keys(data).forEach((element) => {
  if (element !== "erd1w9mmxz6533m7cf08gehs8phkun2x4e8689ecfk3makk3dgzsgurszhsxk4") {
    for (let i = 0; i < data[element].length; i++) {
      tickets.push(element);
    }
  }
});
const chooseRandom = (arr, num = 1) => {
  const res = [];
  for (let i = 0; i < num;) {
    const random = Math.floor(Math.random() * arr.length);
    if (usedTickets.has(random)) {
      console.log("Duplicate", arr[random], random);
      continue;
    } else {
      usedTickets.add(random);
      res.push(arr[random]);
      i++;
    }
  };
  return res;
};

const writeWinners = (_data) => {
  fs.writeFileSync(`${basePath}/build/stramosiWinners.json`, _data);
};
const winners = chooseRandom(tickets, 100);
writeWinners(JSON.stringify(winners, null, 2));
console.log(winners);
console.log(winners.length);

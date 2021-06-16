const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
//delete build folder
fs.removeSync(buildPath);

//read the Campaign.sol
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
//console.log(source);
//compile contracts
const output = solc.compile(source, 1).contracts;
console.log(output);
//create buildfolder
fs.ensureDirSync(buildPath);
//write output in build;

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}

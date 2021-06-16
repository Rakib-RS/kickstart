const path = require('path');
const fs = require('fs');
const solc = require('solc');

const campaignPath = path.resolve(__dirname,'contracts','Campaign.sol');
const source = fs.readFileSync(campaignPath,'utf8');

const ouput = solc.compile(source,1).contracts[':Campaign'];

console.log(ouput);

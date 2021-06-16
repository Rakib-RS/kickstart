const Web3 = require('web3');
const {interface,bytecode} = require('./compile');
const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(
    'frozen gallery rookie flock unique video stumble upon bar couple elegant end',
    'https://rinkeby.infura.io/v3/2ddc95df2cf44ca6a74a0217c5b5615c',
    
)

const web3 = new Web3(provider);
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attemting to deploy contracts from :',accounts[0]);
    console.log(accounts);
    const result = await new web3.eth.Contract(JSON.parse(interface))
                        .deploy({data:bytecode,arguments:['Hi there!']})
                        .send({gas:'1000000',from:accounts[0]})
    console.log('Contracts deployed to ',result.options.address);
}
deploy();
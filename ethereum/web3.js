const Web3 = require('web3');

// const web3 = new Web3(window.ethereum)
//             window.ethereum.enable().catch(err => {console.log(err)});

let web3;
if(typeof window !=='undefined' && typeof window.ethereum !== 'undefined'){
    // we are in the browser and metamask in running
    web3 = new Web3(window.ethereum)
        window.ethereum.enable().catch(err =>{
            console.log(err);
        })
}
else{
    const provider = new Web3.providers.HttpProvider(
  "https://rinkeby.infura.io/v3/2ddc95df2cf44ca6a74a0217c5b5615c"

    )
    web3 = new Web3(provider);
}

export default web3;
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle");
 require('@nomiclabs/hardhat-ethers');
 require("@nomiclabs/hardhat-etherscan");
 require("@openzeppelin/hardhat-upgrades");
 require("@openzeppelin/test-helpers");
 require("hardhat-contract-sizer");
 require("solidity-coverage");
 require("hardhat-gas-reporter");
 
 const { PrivateKey, ETHERSCAN_KEY, RINKEBY_KEY, ROPSTEN_KEY, COINMARKETCAP_KEY } = require('./secrets.json');
 
 module.exports = {
   defaultNetwork: "hardhat",
   networks: {
     hardhat: {
       allowUnlimitedContractSize: true,
       gas: 10000000,
       gasPrice: 60000000000
     },
     ropsten: {
       url: `https://ropsten.infura.io/v3/${ROPSTEN_KEY}`,
       chainId: 3,
       accounts: [PrivateKey],
       allowUnlimitedContractSize: true,
     },
     rinkeby: {
       url: `https://rinkeby.infura.io/v3/${RINKEBY_KEY}`,
       chainId: 4,
       accounts: [PrivateKey],
       allowUnlimitedContractSize: true,
       gas: 10000000,
       gasPrice: 60000000000
     }
   },
   solidity: {
     compilers: [
       {
         version: '0.8.0',
         settings: {
           optimizer: {
             enabled: true,
             runs: 200
           },
         },
       },
       {
         version: '0.8.4',
         settings: {
           optimizer: {
             enabled: true,
             runs: 200
           },
         },
       },
       {
         version: '0.7.5',
         settings: {
           optimizer: {
             enabled: true,
             runs: 200
           },
         },
       },
     ],
   },
   etherscan: {
     apiKey: ETHERSCAN_KEY
   },
   mocha: {
     timeout: 200000
   },
   gasReporter: {
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_KEY,
    gasPrice: 21
   }
 };
 
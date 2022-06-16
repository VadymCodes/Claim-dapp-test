[Document for Test Task]

# smart contract

1. Install Dependencies
    - Install Node.js LTS version
    - Install Hardhat using `npm install --save-dev hardhat`
    - Create hardhat empty project `npx hardhat`
2. Test Smart Contract for MockToken and Test 
    `npx hardhat test`
3. Deploy with your whitlists `npx hardhat run scripts/deploy.js --network rinkeby`
4. Verify this contract `npx hardhat verify --constructor-args arguments.js --network rinkeby "0x5dBD1d3C5179Fb34a917a3FBA1E7cfA9f45F71f1"`

[Result]

Mocktoken: https://rinkeby.etherscan.io/address/0xbDde9b61Dc4Edd5A39b9A6c71Bf6277f10f8aa09#code
Claim: https://rinkeby.etherscan.io/address/0x5dBD1d3C5179Fb34a917a3FBA1E7cfA9f45F71f1#code

# Analyze Gas Optimizationa and Test

You can get the test result here, ./coverage/index.html (`npx hardhat coverage`)

result screenshot : `./screenshots/test-result.png`

You can compare 2 cases - maaping and array for whitelist on mapping.png and array.png

From this, I can notice that using mapping in this case is more optimal way.

# Front end

This is simple react app.

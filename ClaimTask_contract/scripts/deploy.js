async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Test = await ethers.getContractFactory("Test");
    const test = await Test.deploy("0xbDde9b61Dc4Edd5A39b9A6c71Bf6277f10f8aa09", [
        "0x780A14FEaF5D46ec21Aa24DF6B5943427323c005",
        "0x0A9878219B971d3ff90312BD0C101157fFCB0868",
        "0x69a91Bfb0E44C1DD153f71FF75A359E8f70f9060",
        "0x4E0392b342B2fb15cD0a390f1F408e7d6E2e65C1",
        "0x6EB248C6FfeDc8FA4a3d7FCEEb3E40261829BcaD"
    ]);
  
    console.log("Test Contract address:", test.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
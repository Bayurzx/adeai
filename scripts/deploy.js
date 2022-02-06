// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
require('dotenv').config();
const fs = require('fs');

const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const provider = hre.ethers.provider;
  const deployerWallet = new hre.ethers.Wallet(process.env.REACT_APP_AURORA_PRIVATE_KEY, provider);

  console.log(
    "Deploying contracts with the account:",
    deployerWallet.address
  );

  console.log(
    "Account balance:",
    (await deployerWallet.getBalance()).toString()
  );


  const options = { gasLimit: 1000000000 };
  // deploy the marketplace contract
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  console.log('After Marketplace');
  const marketplace = await Marketplace
    .connect(deployerWallet)
    .deploy();
  await marketplace.deployed();

  console.log("Marketplace deployed to:", marketplace.address);



  // deploy the collection contract
  const Collection = await hre.ethers.getContractFactory("Collection");
  const marketFee = +(await hre.ethers.utils.parseUnits('0.001', 'ether'));
  const collection = await Collection
    .connect(deployerWallet)
    .deploy(marketFee, options);
  await collection.deployed();

  console.log("Collection deployed to:", collection.address);
  
  
  let config = `export const marketplaceAddress = "${marketplace.address}";
export const collectionAddress = "${collection.address}";` // make sure to remove indentation

  let data = JSON.stringify(config)
  fs.writeFileSync('./src/config.js', JSON.parse(data))
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

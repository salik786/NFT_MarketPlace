// const ethers = require("ethers");
// require("@nomiclabs/hardhat-ethers");
// const ethers=require("ethers")

// const { ethers } = require("hardhat");
async function main() {
 
  const NFT = await ethers.getContractFactory("MyNFT");
  const mynft = await NFT.deploy();

  await mynft.deployed();

  console.log("NFT deployed to:", mynft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

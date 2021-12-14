// const ethers = require("ethers");
// require("@nomiclabs/hardhat-ethers");
// const ethers=require("ethers")

// const { ethers } = require("hardhat");
async function main() {
 
  const NFT = await ethers.getContractFactory("NFTTrade");
  const mynft = await NFT.deploy();

  await mynft.deployed();
  const marketAddress=mynft.address;

  console.log("NFT deployed to:", mynft.address);
//

const NFT1 = await ethers.getContractFactory("MyNFT")
const nft = await NFT1.deploy(marketAddress)
await nft.deployed()
const nftContractAddress = nft.address
console.log(nftContractAddress)
let listingPrice = await mynft.getListingPrice()
listingPrice = listingPrice.toString()

const auctionPrice = ethers.utils.parseUnits('1', 'ether')

/* create two tokens */
await nft.createToken("https://gateway.pinata.cloud/ipfs/QmdCfj3fiE1LqV5Q6TxDFyGWkVd6BNCrYsW27LE1tcLjqB")
// await nft.createToken("https://www.mytokenlocation2.com")

/* put both tokens for sale */
await mynft.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
// await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })

const [_, buyerAddress] = await ethers.getSigners()

/* execute sale of token to another user */
await mynft.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

/* query for and return the unsold items */
items = await mynft.fetchMarketItems()
items = await Promise.all(items.map(async i => {
  const tokenUri = await nft.tokenURI(i.tokenId)
  let item = {
    price: i.price.toString(),
    tokenId: i.tokenId.toString(),
    seller: i.seller,
    owner: i.owner,
    tokenUri
  }
  return item
}))
console.log('items: ', items)





}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

require("dotenv").config();
const API_URL=process.env.API_URL;
const PUBLIC_KEY=process.env.PUBLIC_KEY;
const PRIVATE_KEY=process.env.PRIVATE_KEY;

const {createAlchemyWeb3}=require("@alch/alchemy-web3");
const web3=createAlchemyWeb3(API_URL)
const contract=require("../artifacts/contracts/MyNFT.sol/MyNFT.json")

console.log(JSON.stringify(contract.abi))
const contractAddress="0xD82d65F433253634A7b570B829E1F354F770D768"

const nftContract=new web3.eth.Contract(contract.abi,contractAddress);
async function mintNFT(tokenURI)
{
    const nonce=await web3.eth.getTransactionCount(PUBLIC_KEY,"latest")
    const tx={
        'from':PUBLIC_KEY,
        'to':contractAddress,
        'nonce':nonce,
        gas:21000,
        data:nftContract.methods.mint(PUBLIC_KEY,tokenURI).encodedABI
    
    }

    const signPromise=web3.eth.accounts.signTransaction(tx,PRIVATE_KEY)
    signPromise
    .then((signedTx)=>{
        web3.eth.sendSignedTransaction(signedTx.rawTransaction,
            
                function(err,hash)
                {
                    if(!err)
                    console.log("the hash of your transaction is ",hash,"check alchemy mempool")

                    else{
                    console.log("something went wrong ",err)
                    }
                }
                
            )


    }).catch(err=>{
        console.log("promise failed ",err)
    })
}
mintNFT("https://gateway.pinata.cloud/ipfs/QmPD4rsV19cvn3JsH38LxXJuRQcupQvzgzShaBpQodX7ua")
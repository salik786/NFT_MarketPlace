pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract  MyNFT is ERC721URIStorage,Ownable{

using Counters for Counters.Counter;
Counters.Counter private token_id;

    constructor ()
    ERC721("Salik pic","SAL"){}
    //this function help to mint nft 
    //onlyowner is modifier decalred in ERC721 Library  
    function mint(address recepient, string memory tokenUri)public onlyOwner returns(uint _tokenId )
    {
        token_id.increment();//this function in ERC21
        uint256 newItemId=token_id.current();
        _mint(recepient,newItemId);
        _setTokenURI(newItemId, tokenUri);
        return newItemId;

    }
        
    function transfer(address to,uint256 _tokenId)public onlyOwner
    {   //GET Approve check if a token is taken by specifi user 
        require(to != address(0));
        //Gets the approved address for a token ID, or zero if no address set Reverts if the token ID does not exist.
        bool check_token=_exists( _tokenId);
        if(check_token)
        {
            address realOwner=getApproved(_tokenId);
            safeTransferFrom(realOwner, to, _tokenId);    
         }
    }
    //this function take token id and returns the owner of token
    function getOwner(uint256 _tokenId)public view returns(address _owner) {
        _owner=ownerOf(_tokenId);

    }
    //this function helps to get the amou of nft a owner have
    function getNftAmou(address _ownerAdd)public view returns(uint256 amou) {
        amou=balanceOf(_ownerAdd);

    }
    // function getTokenIndex(address _owner,uint256 _index)public returns(uint256 token) {
    //     token=tokenOfOwnerByIndex(_owner,_index); 
    // }

}
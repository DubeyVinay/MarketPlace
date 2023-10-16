// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

interface  INFTContract is  IERC721 , IERC2981 {
    
}
contract NFTMarketplace is Ownable {
    using Counters for Counters.Counter;

    struct Sale {
        address seller;
        uint256 tokenId;
        uint256 price;
    }

    INFTContract public nftContract;
    IERC20 public paymentToken;

    mapping(uint256 => Sale) public tokenIdToSale;
    Counters.Counter private saleIds;

    event NFTListed(uint256 saleId, uint256 tokenId, address seller, uint256 price);
    event NFTSold(uint256 saleId, uint256 tokenId, address seller, address buyer, uint256 price);
    
    constructor(address _nftContract, address _paymentToken) {
        nftContract = INFTContract(_nftContract);
        paymentToken = IERC20(_paymentToken);
    }



    function listNFT(uint256 tokenId, uint256 price) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT");
        tokenIdToSale[tokenId] = Sale({
            seller: msg.sender,
            tokenId: tokenId,
            price: price
        });
        saleIds.increment();
        emit NFTListed(saleIds.current(), tokenId, msg.sender, price);
    }

    function buyNFT(uint256 saleId) external {
        Sale memory sale = tokenIdToSale[saleId];
        require(sale.seller != address(0), "Sale does not exist");
        require(msg.sender != sale.seller, "You cannot buy your own NFT");
        uint256 price = sale.price;
        uint256 tokenId = sale.tokenId;

        require(paymentToken.transferFrom(msg.sender, address(this), price), "Payment failed");
        paymentToken.transfer(sale.seller, price);
        nftContract.transferFrom(sale.seller, msg.sender, tokenId);

         

           (address creator, uint256 royaltyAmount) = nftContract.royaltyInfo(tokenId, price);
           if (creator != address(0) && royaltyAmount > 0) {
               paymentToken.transfer(creator, royaltyAmount);
           }
       
        delete tokenIdToSale[saleId];
        emit NFTSold(saleId, tokenId, sale.seller, msg.sender, price);
    }

}
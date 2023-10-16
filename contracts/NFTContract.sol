// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract NFT is ERC721, ERC721URIStorage, Ownable, ERC2981{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenId;

    constructor(uint96 _defaultRoyalty, address _royaltyReciver) ERC721("MarketPlace","MKT"){
        _setDefaultRoyalty(_royaltyReciver, _defaultRoyalty);
    }

    function mint(address royaltyReciver,string memory _tokenURI, uint96 rayalty) external returns (uint256){
        require(address(msg.sender) != address(0), "NFT : Creator address can't be 0x0");
            uint256 newItemId = _tokenId.current();
            _mint(royaltyReciver,newItemId);
            _setTokenURI(newItemId,_tokenURI);
            _setTokenRoyalty(newItemId, royaltyReciver, rayalty);

            _tokenId.increment();

            return newItemId;
        }

     function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

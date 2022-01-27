// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// A simple way to incremented or decremented; Also helps prevent overflow
import "@openzeppelin/contracts/utils/Counters.sol";
// helps with storage based token URI management
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// An access control contract; determines who has access to a function (admin)
import "@openzeppelin/contracts/access/Ownable.sol";
// A modifier to prevent reentrancy in functions
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// one of the three interface of ERC721; adds enumerability of all the token ids
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// standardized way to retrieve royalty payment information for NFTs
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

contract NFT is
    Ownable,
    ReentrancyGuard,
    ERC721Enumerable,
    ERC721URIStorage
{
    address creator;

    constructor(
        string memory name_,
        string memory symbol_,
        address creator_
    ) ERC721(name_, symbol_) {
        creator = creator_;
    }

    using Counters for Counters.Counter;
    Counters.Counter private tokenId_;

    mapping(uint256 => uint256) royaltyId;

    modifier onlyCreator() {
        require(
            msg.sender == creator,
            "ONLY CREATOR HAS ACCESS TO THIS FUNCTION"
        );
        _;
    }

    function mint(string calldata metaHash, uint256 royalty_)
        external
        onlyCreator
    {
        tokenId_.increment();
        uint256 newtokenId = tokenId_.current();
        _mint(msg.sender, newtokenId);
        // set up token URI, it's where our image is hosted (id, uri)
        _setTokenURI(newtokenId, metaHash);
        royaltyId[newtokenId] = royalty_;
    }

    function getTokenRoyalty(uint256 _tokenId) external view returns (uint256) {
        return royaltyId[_tokenId];
    }

    function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
        external
        view
        returns (address receiver, uint256 royaltyAmount)
    {
        receiver = creator;
        royaltyAmount = (_salePrice * royaltyId[_tokenId]) / 100;
    }

    receive() external payable {}

    function withdraw() external onlyCreator {
        payable(creator).transfer(address(this).balance);
    }

    function getCreator() external view returns (address) {
        return creator;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
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
        virtual
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Enumerable).interfaceId ||
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}

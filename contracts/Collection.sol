// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// A simple way to incremented or decremented; Also helps prevent overflow
import "@openzeppelin/contracts/utils/Counters.sol";
// An access control contract; determines who has access to a function (admin)
import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFT.sol";

contract Collection is Ownable {
    uint256 price; // market fee set by admin

    constructor(uint256 price_) {
        price = price_;
    }

    using Counters for Counters.Counter;
    Counters.Counter private collectionId_;

    struct CollectionInfo {
        address contractAddress;
        string metaDataHash;
        address creator;
    }

    mapping(address => uint256[]) userAddrToContractIds;
    mapping(address => uint256) contractToIndex;
    mapping(uint256 => CollectionInfo) collectionByIndex;

    event CollectionCreatedEvent(
        address indexed creator,
        address indexed contractAddress,
        string indexed metaData
    );

    // Set a new price
    function setPrice(uint256 newPrice_) external onlyOwner {
        price = newPrice_;
    }

    // get current price
    function getPrice() external view returns (uint256) {
        return price;
    }

    // get owner balance
    function retrieveBalance() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function createCollection(
        string calldata name_,
        string calldata symbol_,
        string calldata metaData
    ) external payable {
        require(msg.value >= price, "MSG.VALUE IS LESS THAN THE PRICE");

        collectionId_.increment();
        NFT NFTContract = new NFT(name_, symbol_, msg.sender);
        CollectionInfo memory Info = CollectionInfo(
            address(NFTContract),
            metaData,
            msg.sender
        );
        userAddrToContractIds[msg.sender].push(collectionId_.current());
        collectionByIndex[collectionId_.current()] = Info;
        contractToIndex[address(NFTContract)] = collectionId_.current();
        emit CollectionCreatedEvent(msg.sender, address(NFTContract), metaData);
    }

    function editMetaData(address contractAddress, string calldata newHash)
        external
    {
        require(
            contractToIndex[contractAddress] != 0,
            "CONTRACT DOESN'T EXIST"
        );
        CollectionInfo storage Info = collectionByIndex[
            contractToIndex[contractAddress]
        ];
        require(Info.creator == msg.sender, "ONLY CREATOR CAN EDIT METADATA");
        Info.metaDataHash = newHash;
    }

    function getUserCollections()
        external
        view
        returns (CollectionInfo[] memory)
    {
        uint256 length = userAddrToContractIds[msg.sender].length;
        CollectionInfo[] memory Info = new CollectionInfo[](length);
        for (uint256 i = 0; i < length; i++) {
            Info[i] = collectionByIndex[userAddrToContractIds[msg.sender][i]];
        }
        return Info;
    }

    function totalCollections() external view returns (uint256) {
        return collectionId_.current();
    }

    function getCollectionsPaginated(uint256 startIndex, uint256 endIndex)
        external
        view
        returns (CollectionInfo[] memory, bool)
    {
        require(
            endIndex >= startIndex,
            "END INDEX CANNOT BE LESSER THAN START INDEX"
        );
        uint256 length = endIndex - startIndex + 1;
        CollectionInfo[] memory Info = new CollectionInfo[](length);
        uint256 j = 0;
        for (uint256 i = startIndex; i <= endIndex; i++) {
            Info[j] = collectionByIndex[i];
            j++;
        }
        if (endIndex < collectionId_.current()) {
            return (Info, false);
        } else {
            return (Info, true);
        }
    }
}

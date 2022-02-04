// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// interfaces, contracts, and utilities that are all related to NFTs
// This is a one-third of ERC 721, the rest are IERC721Metadata, and IERC721Enumerable
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// Helps check if a third party addresses is not making an incorrect call
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
// A modifier to prevent reentrancy in functions
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// a simple way to incremented or decremented; Also helps prevent overflow
import "@openzeppelin/contracts/utils/Counters.sol";
// standardized way to retrieve royalty payment information for NFTs
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
// To print logging messages and contract variables calling console.log()
import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    // this gets the properties available for a contract type e.g.(IERC721)
    bytes4 public constant ERC721INTERFACE = type(IERC721).interfaceId;
    // this is to check if it conforms to the EIP-2981 NFTs royalty standard
    // can also check by comparing with 0x2a55205a or bytes4(keccak256("royaltyInfo(uint256,uint256)"))
    bytes4 public constant ERC2981INTERFACE = type(IERC2981).interfaceId;

    // template for our market items
    struct MarketItem {
        uint256 itemId;
        address nftContractAddress;
        uint256 tokenId;
        address payable creator;
        address payable seller;
        address payable owner;
        uint256 price;
        uint256 royalty;
        bool isAuction;
        bool sold;
    }

    // template for our auction
    struct AuctionInfo {
        uint256 highestBid;
        address highestBidder;
        uint256 timeEnding;
    }

    // map data to template defined
    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => AuctionInfo) private auctionData;

    // writing this rather rhan a function to check every time
    // All sellers
    address[] public allSellers;

    // All creators
    address[] public allCreators;

    // All creators earnings
    uint public totalEarnings;

    // define events
    event MarketItemCreatedEvent(
        uint256 indexed itemId,
        address indexed nftContractAddress,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price
    );

    event MarketAuctionItemCreatedEvent(
        uint256 indexed itemId,
        address indexed nftContractAddress,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price
    );

    event MarketItemSoldEvent(
        uint256 itemId,
        address indexed nftContractAddress,
        address indexed seller,
        address indexed newOwner
    );

    event MarketItemUnlistedEvent(uint256 itemId);

    event MarketItemBidEvent(
        uint256 indexed itemId,
        address indexed bidder,
        uint256 amount
    );

    // Functions

    // create item, check for royalty request, transfer item
    function createMarketItem(
        address nftContractAddress,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(
            ERC165Checker.supportsInterface(
                nftContractAddress,
                ERC721INTERFACE
            ),
            "ERC721 CONTRACT IS REQUIRED"
        );
        require(
            IERC721(nftContractAddress).ownerOf(tokenId) == msg.sender,
            "MSG.SENDER MUST BE THE OWNER OF ITEM"
        );
        require(price > 0, "PRICE CANNOT BE ZERO");

        // Increase item count
        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        if (
            ERC165Checker.supportsInterface(
                nftContractAddress,
                ERC2981INTERFACE
            )
        ) {
            (address creator, uint256 royaltyAmount) = IERC2981(
                nftContractAddress
            ).royaltyInfo(tokenId, price);

            idToMarketItem[itemId] = MarketItem(
                itemId,
                nftContractAddress,
                tokenId,
                payable(creator),
                payable(msg.sender),
                payable(address(0)),
                price,
                royaltyAmount,
                false,
                false
            );
        } else {
            address creator = msg.sender;
            uint256 royaltyAmount = 0;
            idToMarketItem[itemId] = MarketItem(
                itemId,
                nftContractAddress,
                tokenId,
                payable(creator),
                payable(msg.sender),
                payable(address(0)),
                price,
                royaltyAmount,
                false,
                false
            );
        }

        IERC721(nftContractAddress).transferFrom(
            msg.sender,
            address(this),
            tokenId
        );

        allCreators.push(msg.sender);

        emit MarketItemCreatedEvent(
            itemId,
            nftContractAddress,
            tokenId,
            msg.sender,
            address(0),
            price
        );
    }

    // creates an auction item instead of a fixed price item
    // create auction item, check for royalty request, transfer item, enter auction data
    function createMarketAuction(
        address nftContractAddress,
        uint256 tokenId,
        uint256 floorPrice,
        uint256 auctionTime
    ) external payable nonReentrant {
        require(floorPrice > 0, "PRICE CANNOT BE ZERO");
        require(auctionTime > 0, "O HOURS IS AN INVALID AUCTION TIME");
        require(
            ERC165Checker.supportsInterface(
                nftContractAddress,
                ERC721INTERFACE
            ),
            "CONTRACT SHOULD TO BE ERC721 ENUM"
        );
        require(
            IERC721(nftContractAddress).ownerOf(tokenId) == msg.sender,
            "MSG.SENDER MUST BE THE OWNER OF ITEM"
        );
        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        if (
            ERC165Checker.supportsInterface(
                nftContractAddress,
                ERC2981INTERFACE
            )
        ) {
            (address creator, uint256 royaltyAmount) = IERC2981(
                nftContractAddress
            ).royaltyInfo(tokenId, floorPrice);
            idToMarketItem[itemId] = MarketItem(
                itemId,
                nftContractAddress,
                tokenId,
                payable(creator),
                payable(msg.sender),
                payable(address(0)),
                floorPrice,
                royaltyAmount,
                true,
                false
            );
        } else {
            address creator = msg.sender;
            uint256 royaltyAmount = 0;
            idToMarketItem[itemId] = MarketItem(
                itemId,
                nftContractAddress,
                tokenId,
                payable(creator),
                payable(msg.sender),
                payable(address(0)),
                floorPrice,
                royaltyAmount,
                true,
                false
            );
        }

        IERC721(nftContractAddress).transferFrom(
            msg.sender,
            address(this),
            tokenId
        );

        auctionData[itemId] = AuctionInfo(
            0,
            address(0),
            (block.timestamp + auctionTime * 1 hours)
        );

        allCreators.push(msg.sender);

        emit MarketAuctionItemCreatedEvent(
            itemId,
            nftContractAddress,
            tokenId,
            msg.sender,
            address(0),
            floorPrice
        );
    }

    // get item and info, 
    function createAuctionBid(uint256 itemId) external payable nonReentrant {
        MarketItem storage currentItem = idToMarketItem[itemId];
        AuctionInfo storage currentInfo = auctionData[itemId];
        require(!currentItem.sold, "ITEM HAS ALREADY BEEN SOLD");
        require(currentItem.isAuction, "NOT FOR AUCTION!");
        require(
            currentInfo.timeEnding > block.timestamp,
            "AUCTION HAS ENDED!"
        );
        require(
            msg.value > currentItem.price,
            "MSG.VALUE IS BELOW THE MINIMUM PRICE"
        );
        require(
            msg.value > currentInfo.highestBid,
            "MSG.VALUE HAS TO BE MORE THAN THE HIGHEST BID"
        );
        payable(currentInfo.highestBidder).transfer(currentInfo.highestBid);
        currentInfo.highestBidder = msg.sender;
        currentInfo.highestBid = msg.value;
        emit MarketItemBidEvent(itemId, msg.sender, msg.value);
    }

    // Sell the NFT item in an auction
    function createAuctionSale(address nftContractAddress, uint256 itemId)
        external
        payable
        nonReentrant
    {
        MarketItem storage currentItem = idToMarketItem[itemId];
        AuctionInfo storage currentInfo = auctionData[itemId];
        require(!currentItem.sold, "ITEM HAS ALREADY BEEN SOLD");
        require(currentItem.isAuction, "ITEM IS NOT FOR AUCTION");
        require(
            currentInfo.timeEnding < block.timestamp,
            "AUCTION HAS NOT YET ENDED"
        );
        require(
            msg.sender == currentInfo.highestBidder,
            "MSG.SENDER IS NOT THE HIGHEST BIDDER"
        );
        if (currentItem.creator == currentItem.seller) {
            payable(currentItem.nftContractAddress).transfer(msg.value);
        } else {
            payable(currentItem.seller).transfer(currentItem.royalty);
            currentItem.seller.transfer(msg.value - currentItem.royalty);
        }
        IERC721(nftContractAddress).transferFrom(
            address(this),
            msg.sender,
            currentItem.tokenId
        );
        currentItem.owner = payable(msg.sender);
        currentItem.sold = true;
        _itemsSold.increment();

        allSellers.push(currentItem.seller);
        totalEarnings += msg.value;

        emit MarketItemSoldEvent(
            itemId,
            nftContractAddress,
            currentItem.seller,
            currentItem.owner
        );
    }

    // Let user buy NFT and exchange fund between the interested parties
    function createMarketSale(address nftContractAddress, uint256 itemId)
        public
        payable
        nonReentrant
    {
        MarketItem storage currentItem = idToMarketItem[itemId];
        require(!currentItem.isAuction, "THIS ITEM IS ON AUCTION");
        require(
            msg.value == currentItem.price,
            "SUBMIT ASKING PRICE TO COMPLETE PURCHASE"
        );
        require(!currentItem.sold, "ITEM ALREADY SOLD");
        if (currentItem.creator == currentItem.seller) {
            payable(currentItem.nftContractAddress).transfer(msg.value);
        } else {
            payable(currentItem.seller).transfer(currentItem.royalty);
            currentItem.seller.transfer(msg.value - currentItem.royalty);
        }
        IERC721(nftContractAddress).transferFrom(
            address(this),
            msg.sender,
            currentItem.tokenId
        );
        
        allSellers.push(currentItem.seller);
        totalEarnings += msg.value;
        
        currentItem.owner = payable(msg.sender);
        currentItem.sold = true;
        _itemsSold.increment();
        emit MarketItemSoldEvent(
            itemId,
            nftContractAddress,
            currentItem.seller,
            currentItem.owner
        );
    }

    // Get user bids
    function fetchUserBids()
        external
        view
        returns (MarketItem[] memory, AuctionInfo[] memory)
    {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (auctionData[i + 1].highestBidder == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        AuctionInfo[] memory info = new AuctionInfo[](itemCount);

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                AuctionInfo storage currentInfo = auctionData[currentId];
                items[currentIndex] = currentItem;
                info[currentIndex] = currentInfo;
                currentIndex += 1;
            }
        }
        return (items, info);
    }

    // Returns all unsold market items
    function fetchMarketItems()
        public
        view
        returns (MarketItem[] memory, AuctionInfo[] memory)
    {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        AuctionInfo[] memory info = new AuctionInfo[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (!idToMarketItem[i + 1].sold) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                AuctionInfo storage currentInfo = auctionData[currentId];
                items[currentIndex] = currentItem;
                info[currentIndex] = currentInfo;
                currentIndex += 1;
            }
        }
        return (items, info);
    }

    // Returns only items that msg.sender has purchased
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items msg.sender has created */
    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function unlistItem(uint256 itemId) external nonReentrant {
        require(!idToMarketItem[itemId].sold, "SOLD ITEMS CAN'T BE UNLISTED");
        require(
            idToMarketItem[itemId].seller == msg.sender,
            "MSG.SENDER IS NOT THE LISTER"
        );
        if (idToMarketItem[itemId].isAuction) {
            AuctionInfo storage info = auctionData[itemId];
            if (info.highestBid > 0) {
                payable(info.highestBidder).transfer(info.highestBid);
            }
            delete auctionData[itemId];
        }
        IERC721(idToMarketItem[itemId].nftContractAddress).transferFrom(
            address(this),
            msg.sender,
            idToMarketItem[itemId].tokenId
        );
        delete idToMarketItem[itemId];
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();
        emit MarketItemUnlistedEvent(itemId);
    }
}

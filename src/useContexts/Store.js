import React, { useState, createContext } from "react";
import { ethers, utils } from 'ethers';
import Web3Modal from 'web3modal'
import { notification } from 'antd';
import 'antd/dist/antd.css'; // Add this to where you export the function

import { marketplaceAddress, collectionAddress } from "../config.js"
import CollectionAbi from '../artifacts/contracts/Collection.sol/Collection.json';
import MarketplaceAbi from '../artifacts/contracts/Marketplace.sol/Marketplace.json';
import NFTAbi from '../artifacts/contracts/NFT.sol/NFT.json';


const Store = createContext();

export const StoreFunctions = (props) => {
    const [account, setAccounts] = useState();

    const fx = {};

    fx.setup = async () => {
        await ethereum.request({ method: 'eth_requestAccounts' }).then(res => {
            if (window.ethereum?.chainId === "0x4e454153") {
                setAccounts(res[0])
            } else if (window.ethereum?.chainId !== "0x4e454153") {
                const answer = prompt("You need to be on the Aurora testnet network \nShould I go ahead to add or switch to the Aurora testnet network on metamask? \nTYPE yes or no", 'yes')
                if (answer.toLowerCase() === "yes") {
                    
                    try {
                        await ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: '0x4e454153' }],
                        });
                        await ethereum.request({ method: 'eth_requestAccounts' }).then(res => setAccounts(res[0]))
                    } catch (switchError) {
                        // This error code indicates that the chain has not been added to MetaMask.
                        console.log("Could not switch to the Aurora Testnet Network \nAttempting to add it...");

                        if (switchError.code === 4902) {
                            try {
                                await ethereum.request({
                                    method: 'wallet_addEthereumChain',
                                    params: [
                                        {
                                            chainId: '0x4e454153',
                                            blockExplorerUrls: ["https://explorer.testnet.aurora.dev"],
                                            chainName: "Aurora",
                                            nativeCurrency: {
                                                name: "Aurora ETH",
                                                symbol: "ETH",
                                                decimals: 18,
                                            },
                                            rpcUrls: ["https://testnet.aurora.dev"],
                                        },
                                    ],
                                });
                                await ethereum.request({ method: 'eth_requestAccounts' }).then(res => setAccounts(res[0]))

                            } catch (addError) {
                                // handle "add" error
                                console.error("Failed to add the Aurora Testnet Network: ", addError);
                            }
                        }
                    }

                }
            } else {
                window.alert("Get web3 extension")
            }
        })

    };

    const startNotification = (type='success', header, body, duration=10) => {
        // types allowed are 'success', 'info', 'warning', 'error'
        notification[type]({
            message: header,
            description: body,
            duration: duration,
        });
    }
    
    const signerOperations = async (result) => {
        startNotification('info', 'Mining Transaction...', 'Please wait...', 3)
        let onStart, onWaitResult;
        try {
            onStart = await Promise.resolve(result)

        } catch (error) {
            startNotification('error', 'Transaction failed to deploy!', error.toString(), 14)
            return false;
        }

        try {
            onWaitResult = await onStart.wait()
            if (onWaitResult.status === 1) {
                startNotification('success', 'Mining success!', `Your transaction hash is ${onWaitResult.transactionHash} `, 10)
            } else {
                startNotification('error', 'Something went wrong!', 'Status failed to return', 14)
            }
        } catch (waitError) {
            startNotification('error', 'Could not complete mining!', waitError.toString(), 14)
        }
        
        return onWaitResult;

    }


    const signerFunction = async (address, abi) => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        return signer
    }

    const providerFunction = (address, abi) => {
        const provider = new ethers.providers.JsonRpcProvider();
        // const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
        const contract = new ethers.Contract(address, abi, provider);
        return contract;

    }

    fx.getCollectionPrice = async () => {
        if (!account) fx.setup();

        // const contract = await Promise.resolve(providerFunction(collectionAddress, CollectionAbi))
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(collectionAddress, CollectionAbi, provider);

        const result = await contract.getPrice()
        console.log("getPrice()", result);
        return (result);
    }

    fx.createCollection = async (name, symbol, metadata, creationValue) => {
        if (!account) fx.setup();

        const signer = signerFunction()
        const contract = new ethers.Contract(collectionAddress, CollectionAbi, signer)
        
        return (await signerOperations(contract.createCollection(name, symbol, metadata, { value: creationValue })))
    }
    
    fx.getUserCollection = async () => {
        if (!account) fx.setup();

        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(collectionAddress, CollectionAbi, provider);
        const result = await contract.getUserCollections()
        console.log("getUserCollections()", result);
        
        return result;
    }
    
    fx.totalCollections = async () => {
        if (!account) fx.setup();

        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(collectionAddress, CollectionAbi, provider);
        const result = await contract.totalCollections()
        console.log("totalCollections()", result);
        
        return result;
    }
    
    fx.getMoreCollections = async () => {
        if (!account) fx.setup();

        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(collectionAddress, CollectionAbi, provider);
        const result = await contract.getCollectionsPaginated(startIndex, endIndex)
        console.log("getMoreCollections()", result);
        
        return result;
    }

    // *********************
    // NFT Section is here
    // *********************
    fx.mint = async (metadata, royaltyPercentage, contractAddress) => {
        if (!account) fx.setup();

        const signer = signerFunction()
        const contract = new ethers.Contract(contractAddress, NFTAbi, signer)

        return (await signerOperations(contract.mint(metadata, royaltyPercentage)))
    }

    fx.tokenURI = async (tokenID, contractAddress) => {
        if (!account) fx.setup();

        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(contractAddress, NFTAbi, provider);
        const result = await contract.tokenURI(tokenID)
        console.log("tokenURI()", result);

        return result;
    }

    fx.getTokenRoyalty = async (tokenID, contractAddress) => {
        if (!account) fx.setup();

        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(contractAddress, NFTAbi, provider);
        const result = await contract.getTokenRoyalty(tokenID)
        console.log("getTokenRoyalty()", result);

        return result;
    }

    fx.balanceOf = async (userAddress, contractAddress) => {
        if (!account) fx.setup();

        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(contractAddress, NFTAbi, provider);
        const result = await contract.balanceOf(userAddress)
        console.log("balanceOf()", result);

        return result;
    }

    fx.tokenOfOwnerByIndex = async (ownerAddress, index, contractAddress) => {
        if (!account) fx.setup();

        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(contractAddress, NFTAbi, provider);
        const result = await contract.tokenOfOwnerByIndex(ownerAddress, index)
        console.log("tokenOfOwnerByIndex()", result);

        return result;
    }

    fx.setApprovalForAll = async (bool, contractAddress) => {
        if (!account) fx.setup();

        const signer = signerFunction()
        const contract = new ethers.Contract(contractAddress, NFTAbi, signer)

        return (await signerOperations(contract.setApprovalForAll(marketplaceAddress, bool)))
    }

    fx.isApprovedForAll = async (userAddress, contractAddress) => {
        if (!account) fx.setup();

        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(contractAddress, NFTAbi, provider);
        const result = await contract.isApprovedForAll(userAddress, marketplaceAddress)
        console.log("isApprovedForAll()", result);

        return result;
    }

    fx.createMarketItem = async (NFTContractAddress, tokenID, price) => {
        if (!account) fx.setup();

        const etherPrice = utils.parseEther(price);
        const signer = signerFunction()
        const contract = new ethers.Contract(marketplaceAddress, MarketplaceAbi, signer)

        return (await signerOperations(contract.createMarketItem(NFTContractAddress, tokenID, etherPrice)))
    }

    fx.fetchMarketItems = async () => {
        if (!account) fx.setup();

        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(marketplaceAddress, MarketplaceAbi, provider);
        const result = await contract.fetchMarketItems()
        console.log("fetchMarketItems()", result);

        return result;
    }

    fx.fetchItemsCreated = async () => {
        if (!account) fx.setup();

        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(marketplaceAddress, MarketplaceAbi, provider);
        const result = await contract.fetchItemsCreated()
        console.log("fetchItemsCreated()", result);

        return result;
    }

    fx.fetchMyNFTs = async () => {
        if (!account) fx.setup();

        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(marketplaceAddress, MarketplaceAbi, provider);
        const result = await contract.fetchMyNFTs()
        console.log("fetchMyNFTs()", result);

        return result;
    }

    // aka buyNFT
    fx.createMarketSale = async (NFTContractAddress, itemId, nftPrice) => {
        if (!account) fx.setup();

        const signer = signerFunction()
        const contract = new ethers.Contract(marketplaceAddress, MarketplaceAbi, signer)

        return (await signerOperations(contract.createMarketSale(NFTContractAddress, itemId, { value: nftPrice })))
    }
    
    fx.unlistItem = async (itemId) => {
        if (!account) fx.setup();

        const signer = signerFunction()
        const contract = new ethers.Contract(marketplaceAddress, MarketplaceAbi, signer)

        return (await signerOperations(contract.unlistItem(itemId)))
    }
    
    fx.createMarketAuction = async (NFTContractAddress, tokenId, floorPrice, auctionTime) => {
        if (!account) fx.setup();

        const etherPrice = utils.parseEther(floorPrice);
        const signer = signerFunction()
        const contract = new ethers.Contract(marketplaceAddress, MarketplaceAbi, signer)

        return (await signerOperations(contract.createMarketAuction(NFTContractAddress, tokenId, etherPrice, auctionTime)))
    }

    fx.createAuctionBid = async (itemId, bidAmount) => {
        if (!account) fx.setup();

        const etherPrice = utils.parseEther(bidAmount);
        const signer = signerFunction()
        const contract = new ethers.Contract(marketplaceAddress, MarketplaceAbi, signer)

        return (await signerOperations(contract.createAuctionBid(itemId, { value: etherPrice })))
    }

    fx.createAuctionSale = async (NFTContractAddress, itemId) => {
        if (!account) fx.setup();

        const signer = signerFunction()
        const contract = new ethers.Contract(marketplaceAddress, MarketplaceAbi, signer)

        return (await signerOperations(contract.createAuctionSale(NFTContractAddress, itemId)))
    }
    
    //Only bids where user is highest bidder are visible through this
    fx.fetchUserBids = async () => {
        if (!account) fx.setup();

        const provider = new ethers.providers.JsonRpcProvider();
        const contract = new ethers.Contract(marketplaceAddress, MarketplaceAbi, provider);
        const result = await contract.fetchUserBids()
        console.log("fetchUserBids()", result);

        return result;
    }



    return (
        <Store.Provider value={{ account, ...fx }}>
            {props.children}
        </Store.Provider>
    )
}

export default Store;
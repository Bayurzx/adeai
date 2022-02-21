import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Store from '../useContexts/Store'
import SelectStateContext from '../useContexts/SelectState'
import { getJSONfromHash } from "../helpers";
import NFTAuction from './NFTAuction';
import NFTFixed from './NFTFixed';
import BuyNFTModal from './BuyNFTModal';


function UnsoldNFTCard(props) {

    // console.log('props', props);

    const {
        metaData,
        tokenId,
        nftContractAddress,
        price,
        royalty,
        creator,
        isAuction,
        itemId,
        auction,

    } = props;

    let navigate = useNavigate();

    const { selectedNFT, setSelectedNFT } = useContext(SelectStateContext);
    const { tokenURI, createAuctionBid, createMarketSale } = useContext(Store);

    // another metadata is not necessary
    const [currentMetaData, setCurrentMetaData] = useState();
    const [nftData, setNftData] = useState()
    const [bid, setBid] = useState(0);
    const [timeLeft, setTimeLeft] = useState(new Date());

    const timeRemaining = (auctionTime) => {
        // not necessary
    }

    const fetchMetaData = async () => {
        const nftDetails = {
            ...props,
        }
        nftDetails.tokenURI = await tokenURI(+tokenId, nftContractAddress)
        nftDetails.metaData = (await getJSONfromHash(nftDetails.tokenURI)).data;
        // console.log('nftDetails.metaData', nftDetails.metaData);
        setNftData(nftDetails);
        // console.log('nftDetails', nftDetails);
        setCurrentMetaData(nftDetails.metaData);
        // not another metadata

    }

    useEffect(() => {

        fetchMetaData();
    }, [tokenId])

    const handleClick = () => {
        setSelectedNFT(nftData);
        navigate('/nftdetail')
    }

    const handleAuctionBid = async () => {
        // console.log('bid & itemId:', bid, +itemId);
        await createAuctionBid(+itemId, bid)
    }


    return (
        <>
            {currentMetaData && <BuyNFTModal
                isAuction={isAuction}
                handleAuctionBid={handleAuctionBid}
                bid={bid} setBid={setBid}
                auction={auction}
                metaData={currentMetaData}
                itemId={itemId}
                price={price}
                nftContractAddress={nftContractAddress}
            />}


            {isAuction ? (
                <>
                    {currentMetaData && <NFTAuction
                        currentMetaData={currentMetaData}
                        isAuction={isAuction}
                        price={price}
                        creator={creator}
                        royalty={royalty}
                        auction={auction}
                        timeLeft={timeLeft}
                        bid={bid}
                        handleAuctionBid={handleAuctionBid}
                        handleClick={handleClick}

                    />}
                </>
            ) : (
                <>
                    <NFTFixed
                        currentMetaData={currentMetaData}
                        isAuction={isAuction}
                        price={price}
                        royalty={royalty}
                        creator={creator}
                        handleClick={handleClick}


                    />
                </>

            )}

        </>
    )
}

export default UnsoldNFTCard;
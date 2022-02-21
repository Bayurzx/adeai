import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Store from '../useContexts/Store'
import SelectStateContext from '../useContexts/SelectState'
import { getJSONfromHash } from "../helpers";
import NFTAuction from './NFTAuction';
import NFTFixed from './NFTFixed';
import BuyNFTModal from './BuyNFTModal';
import { utils } from "ethers";
import { lastNum } from '../helpers/fx';

function OwnedNFTCard(props) {

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
        seller,
        sold,
        owner,

    } = props;

    let navigate = useNavigate();

    const { selectedNFT, setSelectedNFT } = useContext(SelectStateContext);
    const { tokenURI, createAuctionBid, createMarketSale } = useContext(Store);

    // another metadata is not necessary
    const [currentMetaData, setCurrentMetaData] = useState();
    const [nftData, setNftData] = useState()


    const fetchMetaData = async () => {
        const nftDetails = {
            ...props,
        }
        // console.log('+tokenId', +tokenId);
        nftDetails.tokenURI = await tokenURI(+tokenId, nftContractAddress)
        nftDetails.metaData = (await getJSONfromHash(nftDetails.tokenURI)).data;
        // console.log('nftDetails.metaData', nftDetails.metaData);
        setNftData(nftDetails);
        // console.log('nftDetails', nftDetails);
        setCurrentMetaData(nftDetails.metaData);
        // not another metadata

    }

    useEffect(() => {
        if (!(+tokenId)) return ;

        fetchMetaData();
    }, [tokenId])

    const handleClick = () => {
        setSelectedNFT(nftData);
        navigate('/nftdetail')
    }


    return (
        <>

            { currentMetaData && <div className="col-md-4 col-sm-12">{/* Start col */}
                <div className="single_product item_collection mt-50 pb-30"> {/* Single Product */}


                    <div onClick={handleClick} className="single_product_img">{/* start single product img */}
                        <Link to="" className="theme_preview_link">
                            <img src={`https://ipfs.infura.io/ipfs/${currentMetaData?.image}`}
                                alt="NFT"
                                className="responsive-fluid"
                            />
                        </Link>

                    </div> {/* End single product img */}

                    <div className="nft_product_description">{/* start product description */}
                        <div className="nft_product_text">
                            <div className="author-profile-link slider_collection_author">{/* start author*/}
                                <span className="collection-create">Created by</span>
                            </div>
                            <div className="author-profile-link slider_collection_author">{/* start author*/}
                                <span className="collection-create">{creator.substring(0, 15) + " ..."}</span>
                                <Link to="author-details.html" className="author_link author-slider offline">
                                    <img src={`/img/avatar/${lastNum(creator)}.jpg`} alt="author" className="responsive-fluid img-1" />
                                    <i className="bx bxs-check-circle" />
                                </Link>
                            </div>
                        </div>{/* end author*/}
                        <div className="product_title_link slider_item">{/* start product title*/}
                            <div className="product-title" href="#">
                                <h6 className="product-title product_title_intro">Name: <span style={{ color: "orange" }}>{currentMetaData.name}</span></h6>
                            </div>
                            <div className="product-title" href="#">
                                <h6 className="product-title product_title_intro">Caption: <span style={{ color: "orange" }}>{currentMetaData.caption}</span></h6>
                            </div>
                            <div className="product-title" href="#">
                                <h6 className="product-title product_title_intro">Royalty:<span style={{ color: "orange" }}> {utils.formatEther(royalty.toString())}</span></h6>
                            </div>
                            <div className="product-title" href="#">
                                <h6 className="product-title product_title_intro">Price :<span style={{ color: "orange" }}> {utils.formatEther(price.toString())} ETH</span></h6>
                            </div>
                            {/* <div className="product-title" href="#">
                                <h6 className="product-title product_title_intro">Highest Bid :<span style={{ color: "orange" }}> {utils.formatEther(auction.highestBid.toString())} ETH</span></h6>
                            </div> */}
                        </div>{/* end product title*/}
                    </div>{/* end product description */}


                </div>
            </div>}

        </>
    )
}

export default OwnedNFTCard;
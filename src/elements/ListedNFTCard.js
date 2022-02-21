import React, { useContext, useEffect, useState } from "react";
import Store from '../useContexts/Store'
import { useNavigate } from "react-router-dom";
import { getJSONfromHash } from "../helpers";


function ListedNFTCard(props) {
    // console.log('propsL', props);

    let navigate = useNavigate();
    const { tokenURI, unlistItem } = useContext(Store);
    const [nftData, setNftData] = useState();
    const [currentMetaData, setCurrentMetaData] = useState();



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


    const fetchMetaData = async () => {
        const nftDetails = {
            ...props,
        }
        nftDetails.tokenURI = await tokenURI(+tokenId, nftContractAddress)
        nftDetails.metaData = (await getJSONfromHash(nftDetails.tokenURI)).data;
        setNftData(nftDetails);
        setCurrentMetaData(nftDetails.metaData);

        // not another metadata
        // console.log('nftData', nftData);

    }

    useEffect(() => {

        fetchMetaData();
    }, [tokenId])

    const handleClick = async () => {
        if (await unlistItem(+itemId)); {
            navigate("/")
        }
    }



    return (
        <>
            {currentMetaData && <>
                <div className="col-md-4 col-sm-12">{/* Start col */}
                    <div className="single_product item_collection mt-50 pb-30"> {/* Single Product */}
                        <div className="single_category2 category_box2" data-toggle="modal" data-target="#popup_bid"> {/* Remove incase of issue */}
                            <div className="slide-header item-details-header text-left">
                                <h4 className="explore_title section_heading"> {currentMetaData.name}</h4>
                                <div>
                                    <img
                                        src={`https://ipfs.infura.io/ipfs/${currentMetaData?.image}` || "/img/placeholder.jpg"}
                                        className="responsive-fluid"
                                        alt="NFT"
                                    ></img>
                                </div>
                                <p className="item-details-text mt-10">{currentMetaData.description.substring(0, 150) + " ..."}</p>
                            </div>
                        </div>
                        {/* end slide header */}
                        <div className="text-center">
                            <button onClick={handleClick} className="btn btn-lg btn-success">
                                Unlist
                            </button>
                        </div>
                    </div>
                </div>{/* end Single Product */}
            </>

            }
        </>
    )
}

export default ListedNFTCard;
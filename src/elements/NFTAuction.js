import React from 'react';
import { lastNum } from '../helpers/fx';
import { utils } from "ethers";
import { Link } from 'react-router-dom';


function NFTAuction({ currentMetaData, isAuction, price, creator, royalty, auction, bid, handleAuctionBid, handleClick,  }) {
    // console.log('currentMetaData2', currentMetaData);
    let endTime = new Date(+auction.timeEnding )
    // console.log('endTime', +auction.timeEnding );

    const calculateTimeLeft = (endTime) => {
        let currDate = Date.now();
        // console.log('endTime', endTime*1000);
        const actualDate = new Date(parseInt(endTime) * 1000).getTime();
        // console.log('actualDate', actualDate);
        // console.log('currDate', currDate);
        if (currDate>actualDate ) return "Auction Ended!";
        return secondstoTime((new Date(actualDate - currDate).getTime())/1000);
    };
    
    calculateTimeLeft(+auction.timeEnding )
    
    function secondstoTime(sec = 500) {
        sec = Number(sec);
        let hour, second, minute
        if (sec < 1) return " "
        if (sec < 4) return "Auction Ended 🎉🎉🎉!!!"
        if (sec > 3) {
            hour = Math.floor(sec / 3600);
            minute = Math.floor((sec % 3600) / 60);
            second = Math.floor((sec % 3600) % 60);
        }

        return `${hour === 1 ? hour + " hr :" : hour < 1 ? "" : hour + " hrs :"} 
         ${minute === 1 ? minute + " min :" : minute < 1 ? "" : minute + " mins :"}
         ${second === 1 ? second + " sec" : second < 1 ? "" : second + " secs"} `;

    }



    return (
        <>
            <div className="col-md-4 col-sm-12">{/* Start col */}
                <div className="single_product item_collection mt-50 pb-30"> {/* Single Product */}
                    <div className="jumbotron countdown show" data-date="2022/01/24 02:59:59" data-endtext="Auction ended">
                        <div className="running">
                            <span className="timer">
                                {calculateTimeLeft(+auction.timeEnding)}
                            </span>
                        </div>
                    </div> {/* end count down */}
                    <div className="profile-rating"> {/* thumbsup rating */}
                        <i className="bx bx-heart" />
                        <span className="thumbsup">2.9k</span>
                    </div> {/* end thumbsup rating */}
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
                                <Link to="" className="author_link author-slider offline">
                                    <img src={`/img/avatar/${lastNum(creator)}.jpg`} alt="author" className="responsive-fluid img-1" />
                                    <i className="bx bxs-check-circle" />
                                </Link>
                            </div>
                        </div>{/* end author*/}
                        <div className="product_title_link slider_item">{/* start product title*/}
                            <div className="product-title" href="#">
                                <h6 className="product-title product_title_intro">Name: <span style={{color: "orange"}}>{currentMetaData.name}</span></h6>
                            </div>
                            <div className="product-title" href="#">
                                <h6 className="product-title product_title_intro">Caption: <span style={{color: "orange"}}>{currentMetaData.caption}</span></h6>
                            </div>
                            <div className="product-title" href="#">
                                <h6 className="product-title product_title_intro">Royalty:<span style={{ color: "orange" }}> {utils.formatEther(royalty.toString())} ETH</span></h6>
                            </div>
                            <div className="product-title" href="#">
                                <h6 className="product-title product_title_intro">Price :<span style={{color: "orange"}}> {utils.formatEther(price.toString())} ETH</span></h6>
                            </div>
                            <div className="product-title" href="#">
                                <h6 className="product-title product_title_intro">Highest Bid :<span style={{color: "orange"}}> {utils.formatEther(auction.highestBid.toString())} ETH</span></h6>
                            </div>
                        </div>{/* end product title*/}
                    </div>{/* end product description */}




                    <div className="nft_product_link pt-10 pb-10">{/* start product link */}
                        <ul>
                            <li className="product-all-icon">
                                <span className="report-icon product-icon">
                                    <button className='btn btn-lg btn-danger' data-toggle="modal" data-target="#popup_bid_nft">
                                        Bid <i className="bx bx-basket" />
                                    </button>
                                </span>
                            </li>
                        </ul>
                        {/* <button className="btn btn-info btn-lg mt-5 ps-5">
                            Payout
                        </button> */}
                    </div>{/* end product link */}
                </div>{/* end Single Product */}
            </div>{/* End col */}

        </>
    );
}

export default NFTAuction;

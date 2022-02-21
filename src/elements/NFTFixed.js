import React from 'react';
import { lastNum } from '../helpers/fx';
import { utils } from "ethers";
import { Link } from 'react-router-dom';


function NFTFixed({ currentMetaData, handleClick, isAuction, price, royalty, creator }) {
    return (
        <>
            <div className="col-md-4 col-sm-12">{/* Start col */}
                <div className="single_product item_collection mt-50 pb-30"> {/* Single Product */}
                    <div className="jumbotron countdown show" data-date="2022/01/24 23:59:59" data-endtext="Auction ended">
                        <span>Fixed Price</span>

                    </div> {/* end count down */}
                    <div className="profile-rating"> {/* thumbsup rating */}
                        <i className="bx bx-heart" />
                        <span className="thumbsup">2.9k</span>
                    </div> {/* end thumbsup rating */}
                    <div onClick={handleClick} className="single_product_img">{/* start single product img */}
                        <Link to="" className="theme_preview_link">
                            <img src={currentMetaData ? `https://ipfs.infura.io/ipfs/${currentMetaData?.image}` : "/img/placeholder.jpg"} 
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
                                <h6 className="product-title product_title_intro">Name: <span style={{color: "orange"}}>{currentMetaData?.name}</span></h6>
                            </div>
                            <div className="product-title" href="#">
                                <h6 className="product-title product_title_intro">Caption: <span style={{color: "orange"}}>{currentMetaData?.caption}</span></h6>
                            </div>
                            <div className="product-title" href="#">
                                <h6 className="product-title product_title_intro">Royalty: <span style={{color: "orange"}}>{utils.formatEther(royalty.toString())} ETH</span></h6>
                            </div>
                            <div className="product-title" href="#">
                                <h6 className="product-title product_title_intro">
                                    Price : <span style={{ color: "orange" }}>{utils.formatEther(price.toString())} ETH</span>
                                </h6>
                            </div>
                        </div>{/* end product title*/}
                    </div>{/* end product description */}


                    {/* <div className="nft_product_link pt-10 pb-10">
                        <ul>
                            <li className="product-all-icon">
                                <span className="report-icon product-icon">
                                    <Link to="#" className="report-link placebid slider-bid price" data-toggle="modal" data-target="#popup_bid_nft">
                                        Buy &nbsp;&nbsp;&nbsp;

                                        <i className="bx bx-basket" />
                                    </Link>
                                </span>
                            </li>
                        </ul>
                    </div> */}
                </div>{/* end Single Product */}
            </div>{/* End col */}

        </>
    );
}

export default NFTFixed;

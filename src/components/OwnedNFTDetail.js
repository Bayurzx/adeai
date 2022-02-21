import React, { useContext, useEffect, useState } from "react";
import Store from '../useContexts/Store'
import SelectStateContext from '../useContexts/SelectState'
import ButtonAI from "../elements/ButtonAI";
import { Link, useNavigate } from "react-router-dom";
import Sketchfab from "../elements/Sketchfab";
import { notification } from "antd";
import { twitterShare, linkedInShare, facebookShare } from "../helpers/fx";
import { predictYourImage } from "../helpers/predictionAi";
import { utils } from "ethers";



function NFTDetail() {
    let navigate = useNavigate();

    const { selectedNFT, loading, setLoading } = useContext(SelectStateContext);
    const { createMarketSale, createAuctionSale } = useContext(Store);

    useEffect(() => {
        if (!selectedNFT) {

            notification['info']({
                message: "Redirecting...",
                description: "No NFT was selected",
                duration: 20,
            });

            navigate('/allnfts')
        }
        notification['warning']({
            message: "Keep State...",
            description: "Do not refresh this page to keep selected NFT state",
            duration: 12,
        });

    }, [selectedNFT])

    // console.log('selectedNFT', selectedNFT);

    const { metaData, tokenId, price, auction, royalty, creator, isAuction, nftContractAddress, itemId } = selectedNFT;

    const onClickBuyNFT = async () => {
        setLoading(true)
        await createMarketSale(nftContractAddress, itemId, price);
        setLoading(false)
    }

    const onClickAuctionNFT = async () => {
        setLoading(true)
        await createAuctionSale(nftContractAddress, itemId);
        setLoading(false)
    }

    const toPredictWithUrl = async (image) => {
        image = `https://ipfs.infura.io/ipfs/${image}`

        // console.log('image', image);
        const predictedData = await predictYourImage(image);
        // console.log("predictedData", predictedData);

        return predictedData
    };



    return (
        <>

            <>
                <div id="blog_area" className="dark-bg-all pt-50 pb-20">
                    {/* start blog details */}
                    <div className="container">
                        {/* start container */}
                        <div className="row">
                            {/* start row */}

                            <div className="col-md-8 pt-50">
                                {/* start col-8 */}
                                <div className="blog_post">
                                    <div className="post_img">
                                        <img src={metaData?.image ? `https://ipfs.infura.io/ipfs/${metaData?.image}` : "/img/placeholder.jpg"}
                                            className="responsive-fluid"
                                            alt="img_detail"
                                        />
                                    </div>
                                    <div className="post_text">
                                        <ul>
                                            <li> <Link to="#"><i className="bx bx-calendar-star" />{metaData?.caption}</Link> </li>
                                            <li> <Link to="#"><i className="bx bx-comment-detail" />Royalty: {metaData?.royalty}%</Link> </li>
                                            <li> <Link to="#"><i className="bx bx-money" />Price: {utils.formatEther(price.toString())}</Link> </li>
                                        </ul>
                                    </div>
                                    <div className="post_hyperlink">
                                        <div className="post_title">
                                            <h4 className="post_title_text single_title">{metaData?.name}</h4>
                                        </div>
                                    </div>
                                    <div className="blog_description">
                                        <p className="single-blog-text">
                                            {metaData?.description} <br />
                                            <br />
                                        </p>
                                    </div>
                                    <div className="row pb-20">
                                        <div className="tag_area col-md-12 text-center">
                                            <div className="post-tags">
                                                <span>Tags:</span>
                                                <Link to="#">Category</Link>
                                                <Link to="#">{metaData?.category}</Link>
                                                <Link to="#">Art</Link>
                                            </div>
                                            <ul className="social-links">
                                                <li>Share:</li>
                                                <li><a href={twitterShare('collection', metaData.name)} target="_blank" rel="noopener noreferrer" className="twitter"><i className="bx bxl-twitter" /></a></li>
                                                <li><a href={facebookShare()} target="_blank" rel="noopener noreferrer" className="facebook"><i className="bx bxl-facebook" /></a></li>
                                                <li><a href={linkedInShare()} target="_blank" rel="noopener noreferrer" className="linkedin"><i className="bx bxl-linkedin" /></a></li>

                                            </ul>
                                        </div>
                                    </div>
                                </div> {/* End  blog details */}
                            </div> {/* End  col-8 */}



                            <div className="col-md-4 animate-box pt-50">
                                {/* col-4 */}
                                <div className="blog-sidebar row">
                                    {/* sidebar right */}
                                    <div className="col-md-12">
                                        <div className="section_title">
                                            <h4 className="section-subtitle wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">Ask AdeAI what it thinks, you might get a witty reply!</h4>
                                        </div>{/* end section title */}
                                    </div>
                                    <div className="col-md-12">

                                        {/* col-12 */}
                                        <div className="widget">

                                            <ButtonAI whenClicked={() => toPredictWithUrl(metaData?.image)} />
                                        </div>
                                    </div>{/* end col-12 */}
                                    <div className="col-md-12">
                                        {/* col-12 */}

                                        {!isAuction && <div className="widget text-center">
                                            <button type="button" className='btn-danger' onClick={onClickBuyNFT} >
                                                {loading && (
                                                    <i
                                                        className="fa fa-refresh fa-spin"
                                                        style={{ marginRight: "5px" }}
                                                    />
                                                )}
                                                {loading && <span>Purchasing...</span>}
                                                {!loading && <span>Make Purchase</span>}
                                            </button>
                                        </div>}

                                        {isAuction && <p>Auction off button will appear at the end of auction</p>}

                                        {isAuction && +auction?.highestBid > 0 && +auction?.timeEnding < 1 && <div className="widget text-center">
                                            <button type="button" className='btn-danger' onClick={onClickAuctionNFT} >
                                                {loading && (
                                                    <i
                                                        className="fa fa-refresh fa-spin"
                                                        style={{ marginRight: "5px" }}
                                                    />
                                                )}
                                                {loading && <span>Auction Closing...</span>}
                                                {!loading && <span>Auction off</span>}
                                            </button>
                                        </div>}

                                    </div>{/* end col-12 */}
                                </div>{/* end sidebar right */}
                            </div>{/* end col-4 */}


                        </div>{/* end row */}
                    </div>{/* end container */}
                </div>
            </>





            {metaData.threeD &&


                <div id="terms" className="terms_area pt-50 pb-100">
                    <div className="container">{/* start container */}
                        <div className="row">{/* start row */}


                            <div className="col-md-8 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".5s">{/* start col */}
                                <div className="404-img mb-50 text-center">
                                    <Sketchfab sketchFabId={metaData.threeD} />
                                </div>
                            </div>{/* end col */}

                            <div className="col-md-4 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">{/* start col */}
                                <div className="error-text-area text-left">
                                    <h2 className="section_heading">Virtual 3D</h2>
                                    <div className="section_description">
                                        <p className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".5s">Play around with the 3D object. Also check out the augment reality on your tablet or mobile devices (Only on supported IOS 12+ and Android 8.0+ ) </p>
                                    </div>
                                    <div className="error_page_btn pt-20">
                                        <Link to="index.html" className="btn btn_authors">Back Home <i className="bx bx-arrow-back" /></Link>
                                    </div>
                                </div>
                            </div>{/* end col */}


                        </div>{/* end row */}
                    </div> {/* end container */}
                </div>
            }

        </>
    )
}

export default NFTDetail;
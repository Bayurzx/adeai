import { AccountBookFilled } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJSONfromHash } from '../helpers';
import { lastNum } from '../helpers/fx';


function AllCollectionCard({ collectionData }) {

    // console.log("collectionCardData", collectionData);
    const { metaDataHash, creator, contractAddress } = collectionData;

    const [data, setData] = useState([]);

    useEffect(() => {
        dataFromMetadata()

        // console.log("data ", data);
    }, [metaDataHash]);

    const dataFromMetadata = async () => {
        if (!metaDataHash) return;

        getJSONfromHash(metaDataHash)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => console.log('getJSONfromHash Err: ', err))
    }
    // console.log('data', data);

    return (
        <>
            <div className="col-md-4 col-sm-12">{/* Start col */}

                {
                    !data ? (
                        <div className="single_product item_collection mt-50 pb-30"> {/* Single Product */}


                            <div className="single_product_img">{/* start single product img */}
                                <Link to="product.html" className="theme_preview_link">
                                    <img src="/img/placeholder.jpg" className="responsive-fluid" alt="" />
                                </Link>

                            </div> {/* End single product img */}
                            <div className="nft_product_description">{/* start product description */}
                                <div className="nft_product_text">
                                    <div className="author-profile-link slider_collection_author">{/* start author*/}
                                        <span className="collection-create">Created by...</span>
                                        <Link to="author-details.html" className="author_link author-slider">
                                            <img src="/img/avatar/3.jpg" alt="author" className="responsive-fluid img-1" />
                                            <i className="bx bxs-check-circle" />
                                        </Link>
                                    </div>
                                </div>{/* end author*/}
                                <div className="product_title_link slider_item">{/* start product title*/}
                                    <Link className="product-title" to="#">
                                        <h6 className="product_title_intro">3D Video Clips Collection </h6>
                                    </Link>
                                </div>{/* end product title*/}
                            </div>{/* end product description */}
                            <div className="nft_product_link pt-20 pb-10">{/* start product link */}
                                <ul>
                                    <li className="product-all-icon">
                                        <span className="item-history product-icon">
                                            <Link to="#" className="item-history-btn" data-toggle="modal" data-target="#popup_history">
                                                <i className="bx bx-comment-detail" />
                                            </Link>
                                        </span>
                                    </li>
                                    <li className="product-all-icon">
                                        <span className="report-icon product-icon">
                                            <Link to="#" className="report-link" data-toggle="modal" data-target="#popup_share">
                                                <i className="bx bxs-share-alt" />
                                            </Link>
                                        </span>
                                    </li>
                                    <li className="product-all-icon">
                                        <span className="report-icon product-icon">
                                            <Link to="#" className="report-link" data-toggle="modal" data-target="#popup_report">
                                                <i className="bx bxs-flag-alt" />
                                            </Link>
                                        </span>
                                    </li>
                                    <li className="product-all-icon">
                                        <span className="report-icon product-icon">
                                            <Link to="#" className="report-link placebid slider-bid price" data-toggle="modal" data-target="#popup_bid">
                                                <i className="bx bx-basket" />
                                            </Link>
                                        </span>
                                    </li>
                                    <li className="product-all-icon">
                                        <span className="sale-count product-icon">
                                            <span className="sale-counter">Unit : 135 ETH 1/4</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>{/* end product link */}
                        </div>

                        // point of exchange
                    ) : (
                        // point of exchange

                        <div className="single_product item_collection mt-50 pb-30"> {/* Single Product */}


                            {/* <Link
                                to=''
                                // to={`/${contractAddress}/${metaDataHash}/${creator}`}
                                className="theme_preview_link"
                            > */}
                                <div className="single_product_img">{/* start single product img */}
                                    <img src={data?.image ? `https://ipfs.infura.io/ipfs/${data?.image}` : "/img/placeholder.jpg"} className="responsive-fluid" alt="" />
                                </div> {/* End single product img */}
                                <div className="nft_product_description">{/* start product description */}
                                    <div className="nft_product_text">
                                        <div className="author-profile-link slider_collection_author">{/* start author*/}
                                            <span className="collection-create">Created by {creator.substring(0, 15) + " ..."} </span>
                                            <Link to="#" className="author_link author-slider">
                                                <img src={`/img/avatar/${lastNum(creator)}.jpg`} alt="author" className="responsive-fluid img-1" />
                                                <i className="bx bxs-check-circle" />
                                            </Link>
                                        </div>
                                    </div>{/* end author*/}
                                    <div className="product_title_link slider_item">{/* start product title*/}
                                        <Link className="product-title" to="#">
                                            <h5 className="product_title_intro">{data.name} </h5>
                                            <h6 className="product_title_intro">{data.caption} </h6>
                                            <p className="product_title_intro">{data.description?.substring(0,65) + "..."} </p>
                                        </Link>
                                    </div>{/* end product title*/}
                                </div>{/* end product description */}
                            {/* </Link> */}

                        </div>
                    )
                }

            </div>{/* End col */}

        </>
    );
}

export default AllCollectionCard;

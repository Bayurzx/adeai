import React from 'react';


function CollectionCard({ metaData }) {
    return (
        <>
            <div className="col-md-4 col-sm-12">{/* Start col */}
                <div className="single_product item_collection mt-50 pb-30"> {/* Single Product */}
                    <div className="jumbotron countdown show" data-date="2022/01/24 23:59:59" data-endtext="Auction ended">
                        <div className="running">
                            <span className="timer">
                                <span className="days" />d
                                <span className="hours" />h
                                <span className="minutes" />m
                                <span className="seconds" />s
                            </span>
                        </div>
                    </div> {/* end count down */}
                    <div className="profile-rating"> {/* thumbsup rating */}
                        <i className="bx bx-heart" />
                        <span className="thumbsup">2.9k</span>
                    </div> {/* end thumbsup rating */}
                    <div className="single_product_img">{/* start single product img */}
                        <a href="product.html" className="theme_preview_link">
                            <img src="/img/items/12.jpg" alt className="responsive-fluid" />
                        </a>
                        <div className="item-collection-img">{/* start item collection img */}
                            <a href="img/items/3.jpg" className="item-popup">
                                <img src="/img/items/3.jpg" alt className="responsive-fluid" />
                            </a>
                            <a href="img/items/1.jpg" className="item-popup">
                                <img src="/img/items/1.jpg" alt className="responsive-fluid" />
                            </a>
                            <a href="img/items/11.jpg" className="item-popup">
                                <img src="/img/items/11.jpg" alt className="responsive-fluid" />
                            </a>
                        </div>{/* end item collection img */}
                    </div> {/* End single product img */}
                    <div className="nft_product_description">{/* start product description */}
                        <div className="nft_product_text">
                            <div className="author-profile-link slider_collection_author">{/* start author*/}
                                <span className="collection-create">4 items. Created by</span>
                                <a href="author-details.html" className="author_link author-slider">
                                    <img src="/img/avatar/3.jpg" alt="author" className="responsive-fluid img-1" />
                                    <i className="bx bxs-check-circle" />
                                </a>
                                <a href="author-details.html" className="author_link author-slider">
                                    <img src="/img/avatar/5.jpg" alt="author" className="responsive-fluid img-1" />
                                    <i className="bx bxs-check-circle" />
                                </a>
                            </div>
                        </div>{/* end author*/}
                        <div className="product_title_link slider_item">{/* start product title*/}
                            <a className="product-title" href="#">
                                <h6 className="product_title_intro">3D Video Clips Collection </h6>
                            </a>
                        </div>{/* end product title*/}
                    </div>{/* end product description */}
                    <div className="nft_product_link pt-20 pb-10">{/* start product link */}
                        <ul>
                            <li className="product-all-icon">
                                <span className="item-history product-icon">
                                    <a href="#" className="item-history-btn" data-toggle="modal" data-target="#popup_history">
                                        <i className="bx bx-comment-detail" />
                                    </a>
                                </span>
                            </li>
                            <li className="product-all-icon">
                                <span className="report-icon product-icon">
                                    <a href="#" className="report-link" data-toggle="modal" data-target="#popup_share">
                                        <i className="bx bxs-share-alt" />
                                    </a>
                                </span>
                            </li>
                            <li className="product-all-icon">
                                <span className="report-icon product-icon">
                                    <a href="#" className="report-link" data-toggle="modal" data-target="#popup_report">
                                        <i className="bx bxs-flag-alt" />
                                    </a>
                                </span>
                            </li>
                            <li className="product-all-icon">
                                <span className="report-icon product-icon">
                                    <a href="#" className="report-link placebid slider-bid price" data-toggle="modal" data-target="#popup_bid">
                                        <i className="bx bx-basket" />
                                    </a>
                                </span>
                            </li>
                            <li className="product-all-icon">
                                <span className="sale-count product-icon">
                                    <span className="sale-counter">Unit : 135 ETH 1/4</span>
                                </span>
                            </li>
                        </ul>
                    </div>{/* end product link */}
                </div>{/* end Single Product */}
            </div>{/* End col */}

        </>
    );
}

export default CollectionCard;

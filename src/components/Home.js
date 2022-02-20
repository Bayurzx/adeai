import React from 'react'
import { Link } from 'react-router-dom'

function Home() {

    return (
        <>

            <div id="hero-slider-area" className="header-hero-area fix"> {/* header banner  */}
                <div className="shape-relative">
                    <div className="blur-shape shape-1" />
                    <div className="blur-shape shape-2" />
                </div>
                <div className="container"> {/* start container  */}
                    <div className="row"> {/* start row  */}
                        <div className="col-md-6 col-sm-12 pb-30"> {/* start col-6  */}
                            <div className="product_heading pt-200 ml-20 mt-20 text-left">{/* start header left  */}
                                <h2 className="product_page_subtitle font-bold wow fadeInUp" data-wow-duration="1s" data-wow-delay=".7s">
                                    NFT Marketplace <br /> Explore, Collect or Sell
                                </h2>
                                <div className="header-description">
                                    <p className="header-paragraph">
                                        Connect <i className="bx bx-arrow-back" />
                                        Explore <i className="bx bx-arrow-back" />
                                        Earn
                                    </p>
                                </div>{/* end header description  */}
                                <div className="header-btn-container wow fadeInUp" data-wow-duration="1s" data-wow-delay=".7s">
                                    <Link to="newcollection" className="btn btn-wallet btn_all_nft_product">Create New Collection <i className="bx bx-arrow-back" /> </Link>
                                    <Link to="allcollection" className="btn btn-wallet account_btn">View All Collection</Link>
                                </div>{/* end header btn  */}
                                <div className="row">{/* start row  */}
                                    <div className="col-md-4">{/* start col-4  */}
                                        <div className="counter_area_header wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                                            <div className="counter-up header">
                                                <div className="counter_heading">
                                                    <p className="count-text pt-10">Total Creators</p>
                                                    <div className="counter_text header">
                                                        <span className="counter-to" data-to={15} data-speed={4000}>15</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>{/* end col-4  */}
                                    <div className="col-md-4">{/* start col-4  */}
                                        <div className="counter_area_header wow fadeInUp" data-wow-duration="1s" data-wow-delay=".5s">
                                            <div className="counter-up header">
                                                <div className="counter_heading">
                                                    <p className="count-text pt-10">Total Sellers</p>
                                                    <div className="counter_text header">
                                                        <span className="counter-to" data-to={7} data-speed={4000}>7</span> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>{/* end col-4  */}
                                    <div className="col-md-4">{/* start col-4  */}
                                        <div className="counter_area_header wow fadeInUp" data-wow-duration="1s" data-wow-delay=".7s">
                                            <div className="counter-up header">
                                                <div className="counter_heading">
                                                    <p className="count-text pt-10">Total Earning</p>
                                                    <div className="counter_text header">
                                                        <span className="counter-to" data-to={6} data-speed={4000}>6 </span> ETH
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>{/* end col-4  */}
                                </div>{/* end row  */}
                            </div>{/* end header left  */}
                        </div> {/* end col-6  */}
                        <div className="col-md-6 col-sm-12"> {/* start col-6  */}
                            <div className="header-right wow fadeInRight" data-wow-duration="1s" data-wow-delay=".8s">
                                <img src="/img/crown.jpg" alt="crown" className="responsive-fluid" />
                            </div>
                        </div> {/* end col-7  */}
                    </div> {/* end row  */}
                </div> {/* end container  */}
            </div> {/* end header banner  */}


            <section className="author-list-area pt-50 pb-50">{/* start author list area */}
                <div className="container pt-50 mb-20">{/* start container */}
                    <div className="row">{/* start row */}
                        <div className="col-md-6 col-sm-12 pb-30">
                            <div className="section_intro wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                                <h2 className="section_heading">Our Amazing Authors</h2>
                                <div className="section_description">
                                    <p className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".5s">Explore on the world's best &amp; largest NFT marketplace with our beautiful NFT products. We want to be a part of your smile. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 float-right col-sm-12">
                            <div className="author-btn">
                                <Link to="" className="btn btn_authors">All Creators <i className="bx bx-arrow-back" /></Link>
                            </div>
                        </div>
                    </div>{/* end row */}
                </div>{/* end container */}
                <div className="container pb-20"> {/* start Container */}
                    <div className="row">{/* start row */}
                        <div className="col-md-3 col-sm-6 mb-30 mt-20">{/* start col */}
                            <div className="single-author-area">{/* start single author */}
                                <div className="single-author-img">
                                    <Link to="author-details.html" className="author_link offline">
                                        <img src="/img/avatar/2.jpg" alt="author" className="responsive-fluid img-1" />
                                        <i className="bx bxs-check-circle" />
                                    </Link>
                                    <div className="name-amount">
                                        <Link to="" className="author_link_text">@bayurzx</Link>
                                        <p className="eth-amount"> <span className="total-items">Total items : </span>5</p>
                                    </div>
                                </div>{/* end single author image */}
                                <div className="copy-icon-otr single-author-copy">
                                    <div id="wallet0" className="profile_wallet text heading-SB">W1HPa7K7f865Kk4LqnrME</div>
                                    <Link to="" className="btn_copy_link" title="Copy Text">
                                        <i className="bx bx-copy-alt" />
                                    </Link>
                                </div>{/* end copy link */}
                            </div>{/* end single author */}
                        </div>{/* end col */}
                    </div>{/* End row */}
                </div> {/* End Container */}
            </section>{/* end author list area */}


            <section className="promo-area"> {/* start promo area */}
                <div className="container container-bg"> {/* start container */}
                    <div className="row"> {/* start row */}
                        <div className="col-md-6 col-sm-12"> {/* start col */}
                            <div className="promo-text-area">
                                <div className="promo-title">
                                    <h2 className="promo-subtitle pb-10">Start your own collection today with AdeAI NFT Marketplace</h2>
                                    <p className="promo-description">AdeAI NFT Marketplace is a shared liquidity NFT market smart contract which is used by multiple websites to provide the users the best possible experience.</p>
                                </div>
                                <div className="promo-btn wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                                    <Link to="newcollection" className="btn btn-wallet btn_all_nft_product mt-20">Create Collection <i className="bx bx-band-aid" /> </Link>
                                    <Link to="allcollection" className="btn btn-wallet btn_all_nft_product mt-20">View Collections<i className="bx bx-bitcoin" /></Link>
                                </div>
                            </div>
                        </div> {/* end col */}
                        <div className="col-md-6 col-sm-12"> {/* start col */}
                            <div className="image-right wow fadeInRight" data-wow-duration="1s" data-wow-delay=".5s">
                                <img src="img/main/3.png" alt="promo" className="responsive-fluid" />
                            </div>
                        </div> {/* end col */}
                    </div> {/* end row */}
                </div> {/* end container */}
            </section>  {/* end promo area */}


        

        </>
    )
}

export default Home
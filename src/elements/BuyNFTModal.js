import React, { useState, useContext } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import Store from '../useContexts/Store'
import { notification } from 'antd';
import { utils } from "ethers";


function BuyNFTModal({ itemId, price, isAuction, handleAuctionBid, bid, setBid, auction, metaData, nftContractAddress }) {
    let navigate = useNavigate();

    const { createMarketItem, createMarketAuction, createMarketSale } = useContext(Store);

    const [isError, setIsError] = useState(false)

    const handleBuying = async (e) => {
        e.preventDefault();
        if (isAuction) {
            await handleAuctionBid();
            navigate("/allnfts"); // remeber to change to where you wanna go
            window.location.reload()
        }

        else if (!isAuction) {
            await createMarketSale(nftContractAddress, itemId, price);
            navigate("/"); // remeber to change to where you wanna go
            window.location.reload()
        }

        else alert("Something went wrong!")
    }

    const handlePriceAuction = ({ target: {value} }) => {
        value = +(value.replace(/[^0-9]\.+/g, ""));
        let highestBids = +(utils.formatEther(auction.highestBid.toString()))

        
        // console.log('auction.highestBid', highestBids);
        if (parseFloat(value) < highestBids) {
            value = highestBids;
            setIsError(true)
        } else setIsError(false)
        setBid(value)
        // console.log('bid', bid);

    }

    const showError = (val) => (
        <div className="" style={{ display: isError ? "" : "none" }}>
            <p className='text-danger'> cannot be lesser than or equal to {val} </p>
        </div>
    )


    return (
        <>

            <div className="modal fade popup" id="popup_bid_nft" tabIndex={-1} role="dialog" aria-hidden="true">{/* start bid input popup */}
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <div className="modal-body space-y-20 p-40">

                            <h3>{metaData.name}</h3>
                            <form onSubmit={handleBuying }>
                                {/* {console.log('isAuction', isAuction)} */}
                                {isAuction ? (
                                    <>
                                        <div className="d-flex justify-content-between">
                                            <p> Place your bids </p>
                                        </div>

                                        <div className="input-field-form">
                                            <input onChange={handlePriceAuction} type="text" className="form-control" placeholder=" Enter Starting Bid" />
                                            {showError(utils.formatEther(auction.highestBid.toString()))}
                                            <p className="enter-quantity">Starting Bid must not be: <span className="offline-color"> less than 0.0001 </span></p>
                                        </div>
                                        <div className="hr" />

                                    </>
                                ) : (
                                    <>
                                        <div className="d-flex justify-content-between">
                                            <p> Make Purchase </p>
                                        </div>

                                    </>
                                )}
                                
                                <div className="hr" />
                                <div className="place-bid-btn">{/* start place btn */}
                                    <button 
                                        className="btn btn-primary w-full popup-bid-btn"
                                    >
                                        Place Order
                                    </button>
                                </div>


                            </form>
                        </div>{/* end modal body */}
                    </div>{/* end modal content */}
                </div>{/* end modal dialog */}
            </div>{/* end bid input popup */}


        </>
    )
}

export default BuyNFTModal;
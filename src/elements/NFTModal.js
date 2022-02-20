import React, { useState, useContext } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import Store from '../useContexts/Store'
import { notification } from 'antd';


function NFTModal({ contractAddress, tokenId, metaData, ownerAddress, isApproved }) {
    let navigate = useNavigate();

    const { createMarketItem, createMarketAuction } = useContext(Store);

    const [price, setPrice] = useState(0);
    const [auctionHours, setAuctionHours] = useState(4)
    const [isAuction, setIsAuction] = useState(false);
    const [isError, setIsError] = useState(false)

    const handleListing = async (e) => {
        e.preventDefault();
        if (!isApproved) {
            alert("Collection has not yet been approved")
            notification['error']({
                message: "Approval!",
                description: "Collection has not yet been approved!",
                duration: 20,
            });

            return;
        }

        else if (!isAuction) {
            await createMarketItem(contractAddress, tokenId, price);
            navigate("/allnfts"); // remeber to change to where you wanna go
            window.location.reload();
        }

        else if (isAuction) {
            await createMarketAuction(contractAddress, tokenId, price, auctionHours);
            navigate("/allnfts"); // remeber to change to where you wanna go
            window.location.reload();
        }

        else alert("Something went wrong!")
    }

    const handlePriceChange = ({ target: {value} }) => {
        value = value.replace(/[^0-9]\.+/g, "");
        
        if (parseFloat(value) < 0.0001) {
            value = "0.0001";
            setIsError(true)
        } else setIsError(false)
        setPrice(value);

    }
    const handleTimeChange = ({ target: { value } }) => {
        value = +(value.replace(/[^0-9]+/g, ""));
        if (parseInt(value) < 4) {
            value = 4;
            setIsError(true)
        } else setIsError(false)
        setAuctionHours(value);

    }

    const errorText = (val) => {
        return (
            <>
                <p className="text-error">cannot be lesser than {val}</p>
            </>
        )
    }

    const showError = (val) => (
        <div className="" style={{ display: isError ? "" : "none" }}>
            <p className='text-danger'> cannot be lesser than {val} </p>
        </div>
    )


    return (
        <>

            <div className="modal fade popup" id="popup_bid" tabIndex={-1} role="dialog" aria-hidden="true">{/* start bid input popup */}
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <div className="modal-body space-y-20 p-40">
                            <div className="d-flex justify-content-between">
                                <p> Listing type : </p>

                                <div className="text-right color_black txt _bold">
                                    <ul className="menu_categories">
                                        <li className="d-flex switch_item">
                                            <span className="ml-10 me-5 switch-text">Fixed &nbsp;</span>
                                            <label className="switch">
                                                <input onClick={() => setIsAuction(!isAuction)} type="checkbox" />
                                                <span className="slider round" />
                                            </label>
                                            <span className="ml-10 switch-text">Auction</span>
                                        </li>{/* end li */}
                                    </ul>{/* end ul */}
                                </div>

                            </div>

                            <h3>{metaData.name}</h3>
                            <form onSubmit={handleListing }>

                                {isAuction ? (
                                    <>
                                        <div className="input-field-form">
                                            <input onChange={handlePriceChange} type="text" className="form-control" placeholder=" Enter Starting Bid" />
                                            {showError("0.0001")}
                                            <p className="enter-quantity">Starting Bid must not be: <span className="offline-color"> less than 0.0001 </span></p>
                                        </div>
                                        <div className="hr" />
                                        <div className="input-field-form">
                                            <input onChange={handleTimeChange} type="text" className="form-control" placeholder=" Enter Auction Time in Hours" />
                                            {showError("4")}
                                            <p className="enter-quantity">Auction time must not be. <span className="offline-color">less than 4hours</span></p>
                                        </div>
                                    </>
                                ) : (
                                    <>

                                        <div className="input-field-form">
                                            <input onChange={handlePriceChange} type="text" className="form-control" placeholder=" Enter Fixed Price" />
                                                {showError("0.0001")}
                                            <p className="enter-quantity">Price must not be: <span className="offline-color"> less than 0.0001 </span></p>
                                        </div>
                                    </>
                                )}
                                
                                <div className="hr" />
                                <div className="place-bid-btn">{/* start place btn */}
                                    <button 
                                        className="btn btn-primary w-full popup-bid-btn"
                                    >
                                        List to Marketplace
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

export default NFTModal;
import React from 'react';
import {Link} from "react-router-dom";
import { twitterShare, linkedInShare, facebookShare } from "../helpers/fx";

function ModalPopup() {
    return (
        <>

            <div>
                {/* Start Modal Popup */}
                <div className="modal fade popup" id="popup_share" tabIndex={-1} role="dialog" aria-hidden="true">{/* start share btn popup */}
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <div className="modal-body space-y-20 p-40">
                                <h3>Share with : </h3>
                                <div className="share-btn">{/* start place btn */}
                                    <ul className="share-icon-list">
                                        <li className="nav-item">
                                            <a  
                                                href={twitterShare('collection', 'awesome')} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="share-icon3"
                                            ><i className="bx bxl-twitter" /></a>
                                        </li>
                                        <li className="nav-item">
                                            <a 
                                                href={facebookShare()} 
                                                target="_blank"
                                                rel="noopener noreferrer" 
                                                className="share-icon1"
                                            ><i className="bx bxl-facebook" /></a>
                                        </li>
                                        <li className="nav-item">
                                            <a 
                                                href={linkedInShare()} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="share-icon2"
                                            ><i className="bx bxl-linkedin" /></a>
                                        </li>
                                    </ul>
                                </div>{/* end share btn */}
                            </div>{/* end modal body */}
                        </div>{/* end modal content */}
                    </div>{/* end modal dialog */}
                </div>{/* end  share btn popup */}
                <div className="modal fade popup" id="popup_report_success" tabIndex={-1} role="dialog" aria-hidden="true">{/* start report successful */}
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <div className="modal-body space-y-20 p-40">
                                <h3 className="text-center">Your Report Successfuly Counted</h3>
                                <p className="text-center">We will have taken against this item after reviewing. Thanks for your support.</p>
                                <Link to=" " className="btn btn-dark"> Watch More</Link>
                            </div>
                        </div>
                    </div>
                </div>{/* end report successful */}
                <div className="modal fade popup" id="popup_report" tabIndex={-1} role="dialog" aria-hidden="true">{/* start report input popup */}
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <div className="modal-body space-y-20 p-40">
                                <h3>Copyright Claim Against :</h3>
                                <div className="input-field-form">
                                    <input type="text" className="form-control" placeholder="Explain behind the reason" />
                                </div>
                                <div className="hr" />
                                <div className="place-bid-btn">{/* start place btn */}
                                    <Link to className="btn btn-primary w-full popup-bid-btn" data-toggle="modal" data-target="#popup_report_success" data-dismiss="modal" aria-label="Close"> Submit Report
                                    </Link>
                                </div>{/* end place btn */}
                            </div>{/* end modal body */}
                        </div>{/* end modal content */}
                    </div>{/* end modal dialog */}
                </div>{/* end report input popup */}
                <div className="modal fade popup" id="popup_bid_success" tabIndex={-1} role="dialog" aria-hidden="true">{/* start bid successful */}
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <div className="modal-body space-y-20 p-40">
                                <h3 className="text-center">Your Bid Successfuly Added</h3>
                                <p className="text-center">Your bid <span className="color_text txt_bold">(5.511 ETH) </span> has been counted.</p>
                                <Link to=" " className="btn btn-dark"> Watch More</Link>
                            </div>
                        </div>
                    </div>
                </div>{/* end bid successful */}
                <div className="modal fade popup" id="popup_bid" tabIndex={-1} role="dialog" aria-hidden="true">{/* start bid input popup */}
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <div className="modal-body space-y-20 p-40">
                                <h3>Place a Bid</h3>
                                <div className="d-flex justify-content-between">
                                    <p> service fee : </p>
                                    <p className="text-right color_black txt _bold"> .511 ETH </p>
                                </div>
                                <div className="d-flex justify-content-between last-child-bid">
                                    <p> You must bid at least : </p>
                                    <p className="text-right color_black txt _bold"> 5.00 ETH</p>
                                </div>
                                <div className="input-field-form">
                                    <input type="text" className="form-control" placeholder=" 5.00 ETH / UNIT" />
                                    <p className="enter-quantity">Unit Quantity. <span className="offline-color">26 available</span></p>
                                </div>
                                <div className="hr" />
                                <div className="d-flex justify-content-between">
                                    <p> Total bid amount : </p>
                                    <p className="text-right color_black txt _bold"> 5.511 ETH </p>
                                </div>
                                <div className="place-bid-btn">{/* start place btn */}
                                    <Link to className="btn btn-primary w-full popup-bid-btn" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Place bid
                                    </Link>
                                </div>{/* end place btn */}
                            </div>{/* end modal body */}
                        </div>{/* end modal content */}
                    </div>{/* end modal dialog */}
                </div>{/* end bid input popup */}
                <div className="modal fade popup" id="popup_history" tabIndex={-1} role="dialog" aria-hidden="true">{/* start bid history */}
                    <div className="modal-dialog modal-dialog-centered" role="document">{/* start modal-dialog */}
                        <div className="modal-content">{/* start modal-content */}
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <div className="modal-body space-y-20 p-40">{/* start modal-body */}
                                <h4> Bidding Activity </h4>
                                <div className="creator_item creator_card space-x-10">{/* start creator item */}
                                    <div className="avatars space-x-10">
                                        <div className="media">
                                            <Link to="Profile.html" className="btn-avatar">
                                                <i className="bx bxs-check-circle" />
                                                <img src="/img/avatar/7.jpg" alt="Avatar" className="avatar avatar-md" />
                                            </Link>
                                        </div>
                                        <div className="bid-accepted">
                                            <p className="color_black">Bid accepted
                                                <span className="color_brand">12 ETH</span> by <Link className="color_black txt_bold" to="Profile.html">Amanda</Link>
                                            </p>
                                            <span className="date color_text">18/11/2021, 17:54</span>
                                        </div>
                                    </div>
                                </div>{/* end creator item */}
                                <div className="creator_item creator_card space-x-10">{/* start creator item */}
                                    <div className="avatars space-x-10">
                                        <div className="media">
                                            <Link to="Profile.html" className="btn-avatar">
                                                <i className="bx bxs-check-circle" />
                                                <img src="/img/avatar/4.jpg" alt="Avatar" className="avatar avatar-md" />
                                            </Link>
                                        </div>
                                        <div className="bid-accepted">
                                            <p className="color_black">Bid accepted
                                                <span className="color_brand">5.511 ETH</span> by <Link className="color_black txt_bold" to="Profile.html">Devid Monda</Link>
                                            </p>
                                            <span className="date color_text">28/11/2021, 13:54</span>
                                        </div>
                                    </div>
                                </div>{/* end creator item */}
                            </div>{/* end modal-body */}
                        </div>{/* end modal-content */}
                    </div>{/* end modal-dialog */}
                </div>{/* end bid history */}
                {/* End Modal Popup */}
            </div>



        </>
    )
}

export default ModalPopup;

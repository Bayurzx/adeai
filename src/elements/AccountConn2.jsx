import React from 'react';
import { Link } from "react-router-dom";

function AccountConn() {
    return (
        <>
            <div className="action-nav">
                <div className="profile-nav-main">
                    <div className="profile-nav">
                        <div className="img-otr">
                            <img className="nav-prof-img" src="img/avatar/1.jpg" alt="Avatar" />
                            <i className="bx bxs-check-circle" />
                        </div>
                    </div>{/* end profile-nav  */}
                    <div className="profile-pop-otr">
                        <div className="balance-otr">
                            <div className="balance">
                                <p className="text heading-S">Balance</p>
                                <p className="price heading-L">30.656 ETH</p>
                            </div>
                            <div className="img-etherem">
                                <img className="etherem" src="img/avatar/ethereum.png" alt="img" />
                            </div>
                        </div>{/* end balance  */}
                        <div className="copy-icon-otr">
                            <span id="wallet" className="profile_wallet text heading-SB">DdzFFzCqrhshMSxb9oW1HPa7K7f865Kk4LqnrME</span>
                            <button id="btn_copy" title="Copy Text">
                                <i className="bx bx-copy-alt" />
                            </button>
                        </div>{/* end copy link  */}
                        <ul className="link-profile-ul">
                            <li className="link-profile-li">
                                <Link to className="link-profile-a heading-SB">My Item</Link>
                            </li>
                            <li className="link-profile-li">
                                <Link to className="link-profile-a heading-SB">Edit Profile</Link>
                            </li>
                            <li className="link-profile-li">
                                <Link to className="link-profile-a heading-SB">Upload File</Link>
                            </li>
                            <li className="link-profile-li">
                                <Link to className="link-profile-a heading-SB">Logout</Link>
                            </li>
                        </ul>{/* end ul  */}
                    </div>{/* end profile pop  */}
                </div>{/* end profile nav  */}
            </div>
        </>
    )
}

export default AccountConn;

import { useContext } from "react";
import { Link } from "react-router-dom";

import Store from '../useContexts/Store'

const Navbar = () => {
    const { account, setup } = useContext(Store);

    return (
        <>
            {/* Start Header */}
            <header id="header-area" className="header-transparent sticky">
                <div className="mobile_menubar">
                    <i className="bx bx-menu" />
                </div>{/* End Mobile menu  */}
                <div className="main-menu-area"> {/* start main menu area */}
                    <div className="container container-main-menu">
                        <div className="main-menu d-flex align-items-center">
                            <div className="logo"> {/* start logo  */}
                                <Link to="/" className="navbar-brand">
                                    <img src="img/logo.png" alt="logo" />
                                </Link>
                                <Link to="/" className="navbar-icon">
                                    <img src="img/favicon.png" alt="logo" />
                                </Link>
                            </div> {/* End logo  */}
                            <div className="input-main"> {/* start search bar  */}
                                <input className="input" type="text" placeholder="Search..." />
                                <button type="submit">
                                    <i className="bx bx-search" />
                                </button>
                            </div> {/* end search bar  */}
                            <div className="menu d-flex"> {/* start menu  */}
                                <nav className="navigation" id="mobile-menu">
                                    <ul className="menu-list list-style-none mb-0"> {/* start ul  */}
                                        <li><Link to="/">Home</Link></li>
                                        <li className="has-children"><Link to="#">Explore</Link>
                                            <ul className="sub-menu">
                                                <li><Link to="explores.html">Explore One</Link></li>
                                                <li><Link to="live.html"> Live Auction</Link></li>
                                                <li><Link to="collection.html"> Collection</Link></li>
                                                <li><Link to="item-details.html">Item Details</Link></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"><Link to="#">Community</Link>
                                            <ul className="sub-menu">
                                                <li><Link to="blog.html">News &amp; Press</Link></li>
                                                <li><Link to="blog-details.html">Single Blog</Link></li>
                                                <li><Link to="faqs.html">Help Center</Link></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"><Link to="#">Pages</Link>
                                            <ul className="sub-menu">
                                                <li><Link to="signin.html">My Account</Link></li>
                                                <li><Link to="signup.html">Sign Up</Link></li>
                                                <li><Link to="authors.html">Authors</Link></li>
                                                <li><Link to="author-details.html">Author Details</Link></li>
                                                <li><Link to="terms-conditions.html">Terms &amp; Conditions</Link></li>
                                                <li><Link to="about.html">About Us</Link></li>
                                                <li><Link to="contact.html">Contact Us</Link></li>
                                                <li><Link to="privacy.html">Privacy Policy</Link></li>
                                                <li><Link to="wallet.html">Connect Wallet</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to="activity.html">Activity</Link></li>
                                    </ul> {/* end ul  */}
                                </nav> {/* end nav  */}
                            </div>{/* end menu  */}
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
                            </div>{/* end action nav  */}
                            {/* Responsive Menu */}
                            <div className="mobile-menu mobile-menu-preview" />
                        </div>{/* end main menu  */}
                        <div className="main-menu-icon"> {/* start mobile menu icon  */}
                            <span className="line line-1" />
                            <span className="line line-2" />
                            <span className="line line-3" />
                        </div> {/* end mobile menu icon  */}
                    </div>{/* end container  */}
                </div>{/* end main menu area  */}
            </header> {/* end header  */}

        </>
    )

}
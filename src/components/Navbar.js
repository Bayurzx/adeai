import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountConn from "../elements/AccountConn";
import AccountDisConn from "../elements/AccountDisConn";

import Store from '../useContexts/Store'

const Navbar = () => {
    const { account, setup } = useContext(Store);

    // quick fixes: the jQuery issue for non-responsiveness
    useEffect(() => {
        let $ = window.$;
        $('.main-menu-icon').click(function () {
            $('.menu').toggleClass('menu-open');
            $('.main-menu-icon').toggleClass('icon-cross');
            $('.menu ul').slideToggle();
            $('ul ul').css('display', 'none');
        });
        // Submenu
        $('.menu ul li.has-children').click(function () {
            $(this).find('ul').slideToggle();
            $(this).siblings().find('ul').slideUp();
        });

        $(window).resize(function () {
            if ($(window).width() > 1199) {
                $('ul').removeAttr('style');
            }
        });;


        // Toggle Image Profile
        $(".header-transparent.sticky .action-nav").each(function () {
            $(".img-otr", this).on("click", function (e) {
                e.preventDefault();
                $(".profile-pop-otr").slideToggle();
            });
        });


    }, []);


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

                            <div className="ml-4">{account ? <AccountConn /> : <AccountDisConn />}</div>

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

export default Navbar;
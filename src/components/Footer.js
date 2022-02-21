import React, {useState} from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    const [notify, setNotify] = useState("")

    const handleChange = ({target: {value}}) => {
        setNotify(value)
    }

    const handleNotifyClick = () => {
        window.open(`mailto:bayurzx@gmail.com?subject=${notify}`)
    }


    return (

        <>
            <footer id="footer_area" className="footer_area_bg"> {/* start footer area */}
                <div className="container"> {/* start container */}
                    <div className="row"> {/* start row */}
                        <div className="col-md-3 col-sm-6"> {/* start col-3 */}
                            <div className="footer_widget wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                                <div className="widget_title">
                                    <h6>AdeAI NFT Marketplace</h6>
                                </div>
                                <div className="widget_nav_link">
                                    <ul className="footer_nav">
                                        <li><a href="https://github.com/Bayurzx/adeai#readme" target="_blank">About</a></li>
                                        <li><a href="mailto:bayurzx@gmail.com">Contact Us</a></li>
                                        <li><Link to="">_____</Link></li>
                                        <li><a href="https://metabuild.devpost.com/" target="_blank">Hackathon</a></li>
                                    </ul>
                                    <div className="share-btn social-profile">{/* start place btn */}
                                        <ul className="share-icon-list social-list">
                                            <li className="nav-item">
                                                <Link to="#" className="share-icon1"><i className="bx bxl-facebook" /></Link>
                                            </li>
                                            <li className="nav-item">
                                                <a href="https://www.linkedin.com/in/adebayo-omolumo-2b1ba078/" target="_blank" className="share-icon2"><i className="bx bxl-linkedin" /></a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="https://twitter.com/AdebayoOmolumo" target="_blank" className="share-icon3"><i className="bx bxl-twitter" /></a>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="#" className="share-icon6"><i className="bx bxl-instagram" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> {/* end col-3 */}
                        <div className="col-md-3 col-sm-6"> {/* col-3 */}
                            <div className="footer_widget wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
                                <div className="widget_title">
                                    <h6>Aurora Resources</h6>
                                </div>
                                <div className="widget_nav_link">
                                    <ul className="footer_nav">
                                        <li><a href="https://doc.aurora.dev/" target="_blank">Welcome</a></li>
                                        <li><a href="https://doc.aurora.dev/getting-started/network-endpoints/" target="_blank">Network</a></li>
                                        <li><a href="https://doc.aurora.dev/interact/metamask" target="_blank">Metamask</a></li>
                                        <li><a href="https://explorer.aurora.dev/" target="_blank">Block Explorer</a></li>
                                        <li><a href="https://doc.aurora.dev/bridge/rainbow-bridge" target="_blank">Rainbow Bridge</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div> {/* end col-3 */}
                        <div className="col-md-3 col-sm-6"> {/* col-3 */}
                            <div className="footer_widget wow fadeInUp" data-wow-duration="1s" data-wow-delay=".5s">
                                <div className="widget_title">
                                    <h6>Marketplace</h6>
                                </div>
                                <div className="widget_nav_link">
                                    <ul className="footer_nav">
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="usercollection">My Collections</Link></li>
                                        <li><Link to="allcollection">All Collections</Link></li>
                                        <li><Link to="allnfts">Explore</Link></li>
                                        <li><a href="https://adeai-walkthrough.netlify.app/" target="_blank">Walkthrough</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div> {/* end col-3 */}
                        <div className="col-md-3 col-sm-6"> {/* col-3 */}
                            <div className="footer_widget wow fadeInUp" data-wow-duration="1s" data-wow-delay=".6s">
                                <div className="widget_title">
                                    <h6>MetaBuild Hackathon</h6>
                                </div>
                                <div className="widget_nav_link">
                                    <p className="subscribe-text">First of its kind NFT Marketplace built on top of AI.</p>
                                    <div className="email-input">
                                        <div className="form-group">
                                            <input onChange={handleChange} placeholder="Notify about..." className="form-control" id="subscribe" />

                                            <button 
                                                onClick={handleNotifyClick}
                                                className="btn btn-subscribe"
                                            >
                                                Notify
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> {/* end col-3 */}
                    </div> {/* end row */}
                </div> {/* end container */}
                <div className="container pt-50"> {/* start container */}
                    <div className="row wow fadeInUp" data-wow-duration="1s" data-wow-delay=".7s"> {/* start row */}
                        <div className="col-md-12 text-center  col-sm-12"> {/* col-3 footer copyright */}
                            <div className="footer_copyright">
                                <p className="copyright_text text-center">Copyright © {new Date().getFullYear()}. All rights reserved by AdeAI NFT Marketplace.</p>
                            </div>
                        </div>{/* end col-3 footer copyright */}
                    </div>{/* end row */}
                </div>{/* end container */}
            </footer>{/* end footer area */}

        </>


    )
}

export default Footer
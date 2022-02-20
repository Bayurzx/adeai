import React from 'react'
import { Link } from 'react-router-dom';
import Breadcrumb from '../elements/Breadcrumb';

function NotFound() {
    return (
        <>

            <Breadcrumb 
                title="Not Found"
                description="It seems you are lost"
            />
            <div id="terms" className="terms_area pt-50 pb-20"> {/* start 404 page */}
                <div className="container">{/* start container */}
                    <div className="row">{/* start row */}
                        <div className="col-md-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">{/* start col */}
                            <div className="error-text-area text-left">
                                <h2 className="section_heading">Something went wrong</h2>
                                <div className="section_description">
                                    <p className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".5s">What do you call a magician who lost their magic? </p>
                                    <h3 className="float-right">"Ian"</h3>
                                </div>
                                <div className="error_page_btn pt-20">
                                    <Link to="/" className="btn btn_authors">Back Home <i className="bx bx-arrow-back" /></Link>
                                </div>
                            </div>
                        </div>{/* end col */}
                        <div className="col-md-6 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".5s">{/* start col */}
                            <div className="404-img mb-50 text-center">
                                <img src="/img/extra/404.png" alt={404} className="responsive-fluid" />
                            </div>
                        </div>{/* end col */}
                    </div>{/* end row */}
                </div> {/* end container */}
            </div> {/* end 404 page */}



        </>
    )
}

export default NotFound;
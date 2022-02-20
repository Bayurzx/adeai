import React from 'react';

function Breadcrumb({ title, description }) {
    return (
        <>
            <div id="hero-slider-area" className="header-hero-area site-breadcrumb-header fix"> {/* start header banner */}
                {/* Start Breadcrumb
		============================================= */}
                <div className="site-breadcrumb pb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center pt-200 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                                <h2 className="breadcrumb-title">{title}</h2>
                                <h5 className="breadcrumb-menu clearfix">{description}</h5>

                            </div>
                        </div>
                    </div>
                </div>
                {/* End  Breadcrumb */}
            </div>{/* End header hero area */}

        </>
    );
}

export default Breadcrumb;


// let wallet = document.getElementById("wallet").outerText;


/* Copy the text inside the text field */
// navigator.clipboard.writeText(wallet);
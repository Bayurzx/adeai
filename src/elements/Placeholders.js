import React from 'react'
import { Skeleton } from 'antd';


function Placeholders() {
    return (
        <>

            <div className="col-md-4 col-sm-12">{/* Start col */}
                <div className="single_product item_collection mt-50 pb-30"> {/* Single Product */}

                    <div className="single_product_img">{/* start single product img */}
                        <img src="/img/loading.gif" alt="loading" className="responsive-fluid" />
                    </div> {/* End single product img */}

                    <div style={{ backgroundColor: "white", padding: "40px" }}
                        className="nft_product_description"
                    >

                        <Skeleton active avatar />
                        <div style={{marginLeft: "60px"}}>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                        </div>
                    </div>





                </div>
            </div>

        </>
    )
}

export default Placeholders
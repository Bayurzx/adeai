import React from 'react'
import { Link } from 'react-router-dom'

function NFTmini({ metaData }) {
    return (
        <>
            <div
                className="contact_map wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay=".2s"
            >
                <div>
                    
                    <Link to='' className="single_category2 category_box2" data-toggle="modal" data-target="#popup_bid"> {/* Remove incase of issue */}
                        <div className="slide-header item-details-header text-left">
                            <h4 className="explore_title section_heading"> {metaData.name}</h4>
                            <div>
                                <img
                                    src={`https://ipfs.infura.io/ipfs/${metaData?.image}`}
                                    className="responsive-fluid"
                                    alt="NFT"
                                ></img>
                            </div>
                            <p className="item-details-text mt-10">{metaData.description.substring(0, 150)+" ..."}</p>
                        </div>
                    </Link>
                    {/* end slide header */}
                </div>
            </div>
        </>
    )
}

export default NFTmini
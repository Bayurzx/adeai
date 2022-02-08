import React from 'react';

// ***********************
// **** Not in use  ******
// ***********************
function CollectionCard({ metaData }) {
    return (
        <>
            <div className="single_product mt-50 pb-30">
                <div className="single_product_img">
                    <a href="product.html" className="theme_preview_link">
                        {!metaData.file && <img src="img/items/11.jpg" alt="placeholder" className="responsive-fluid" />}
                        {metaData.file && <img src={URL.createObjectURL(metaData.file)} alt="photo" className="responsive-fluid" />}
                    </a>
                </div> 
                <div className="nft_product_description">
                    <div className="product_title_link slider_item">
                        <h6 className="product_title_intro">{metaData.title} </h6>
                    </div>
                    <div className="product_title_link slider_item">
                        <h6 className="product_title_intro">{metaData.caption}</h6>
                    </div>
                </div>
            </div>

        </>
    );
}

export default CollectionCard;

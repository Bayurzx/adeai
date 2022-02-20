import React from 'react';

function NFTCard2({ metaData, dataType }) {
  return (
    <>
      <div
        className="contact_map pt-50 wow fadeInUp"
        data-wow-duration="1s"
        data-wow-delay=".2s"
      >
        <div>
          <div className="slide-header item-details-header text-left">
            <h2 className="explore_title section_heading">Name: {metaData.name}</h2>
            <div>
              {metaData?.file ? (
                <img
                  src={URL.createObjectURL(metaData.file)}
                  className="responsive-fluid"
                  alt="NFT"
                ></img>
              ) : (
                <img
                  src="/img/items/8.jpg"
                  className="responsive-fluid"
                  alt="NFT"
                ></img>
              )}

            </div>
            <p className="item-details-text mt-10">{metaData.description}</p>
          </div>
          {/* end slide header */}

          <div className="slide_auction_bid text-left">
            <p className="auction_bid_text">
              Royalty : <span className="item_size">{metaData.royalty}</span>
            </p>
            <p className="auction_bid_text">
              Food for thought : <span className="item_size">{metaData.caption}</span>
            </p>
            {dataType ? (
              <p className="auction_bid_text">
                3D Value : <span className="item_size">{metaData.threeD}</span>
              </p>

            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NFTCard2;

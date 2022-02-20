import React from 'react';

function CollectionCard({ metaData }) {
    return (
      <>
        <div
          className="contact_map pt-50 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay=".2s"
        >
          <div>
            <div className="slide-header item-details-header text-left">
              <h2 className="explore_title section_heading">{metaData.name} <span>({metaData.symbol}) </span></h2>
              <div>
                {metaData?.file ? (
                  <img
                    src={URL.createObjectURL(metaData.file)}
                    alt="NFT"
                    className="responsive-fluid"
                  ></img>
                ) : (
                  <img
                    src="/img/items/8.jpg"
                    alt="NFT"
                    className="responsive-fluid"
                  ></img>
                )}

              </div>
              <p className="item-details-text mt-10">{metaData.description}</p>
            </div>
            {/* end slide header */}

            <div className="slide_auction_bid text-left">
              <p className="auction_bid_text">
                SYMBOL : <span className="item_size">{metaData.symbol}</span>
              </p>
              <p className="auction_bid_text">
                Food for thought : <span className="item_size">{metaData.caption}</span>
              </p>
              <p className="auction_bid_text">
                Outreach : <span className="item_size">{metaData.title}</span>
              </p>
            </div>
          </div>
        </div>
      </>
    );
}

export default CollectionCard;

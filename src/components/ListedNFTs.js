import React, { useContext, useEffect, useState } from "react";
import Store from '../useContexts/Store'
import SelectStateContext from '../useContexts/SelectState'
import Breadcrumb from "../elements/Breadcrumb";
import Spinner from "../elements/Spinner";
import UnsoldNFTCard from "../elements/UnsoldNFTCard";
import NFTModal from "../elements/NFTModal";
import Placeholders from "../elements/Placeholders";
import Emptys from "../elements/Emptys";
import { useNavigate } from "react-router-dom";
import ListedNFTCard from "../elements/ListedNFTCard";

// quick fix for owned
function ListedNFTs() {
    const { fetchMarketItems, account, fetchMyNFTs, fetchItemsCreated } = useContext(Store);
    const { loading, setLoading } = useContext(SelectStateContext);

    const [allUnsoldNFTs, setAllUnsoldNFTs] = useState([]); // basically all NFTs
    const [itemListed, setItemListed] = useState([]); // basically all my NFTs I wanna sell
    const [ownedItem, setOwnedItem] = useState([]); // basically all my NFTs 

    let navigate = useNavigate();


    const fetchItems = async () => {
        setLoading(true)
        const res = await fetchMarketItems()

        const [fixedNFT, auctionNFT] = res;

        const fixedAndAuction = fixedNFT.map((v, i) => ({ fixed: v, auction: auctionNFT[i] }));

        setAllUnsoldNFTs(fixedAndAuction)
        setLoading(false)
    }

    useEffect(() => {

        fetchItems();
    }, [])

    const emptyFx = () => {
        if (!loading && allUnsoldNFTs && allUnsoldNFTs.length < 1) {
            return (
                <div style={{ minWidth: "400px" }}>
                    <Emptys item="NFT" onClick={() => navigate(`/usercollection`)} />
                </div>
            )
        }
    }

    function isSeller(value) {
        // console.log('value', value);
        return value.fixed.seller.toUpperCase() === account.toUpperCase();
    }



    return (
        <>
            {loading && <Spinner />}

            <Breadcrumb
                title="Listed NFTs"
                description="You will find your listed NFTs here. You can also unlist them"
            />

            <section
                id="nft_product_part"
                className="nft-product-area collection-area-page pt-12 pb-50"
            >
                {/* start explore products */}
                <div className="container pb-30">
                    {/* Start container */}
                    
                    {emptyFx()}

                    <div className="row">


                        {loading ? (
                            <>
                                <Placeholders />
                            </>
                        ) : (
                            <>
                                {allUnsoldNFTs.filter(isSeller).map((v) => (

                                    // <UnsoldNFTCard key={(v.fixed.itemId).toString()} {...(v.fixed)} auction={v.auction} />
                                    <ListedNFTCard key={(v.fixed.itemId).toString()} {...(v.fixed)} auction={v.auction} />
                                ))}
                            </>
                        )}

                    </div>
                </div>
            </section>


        </>
    )
}

export default ListedNFTs;
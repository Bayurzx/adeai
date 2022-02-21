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
import OwnedNFTCard from "../elements/OwnedNFTCard";

// quick fix for owned NFt
function OwnedNFTs() {
    const { fetchMarketItems, account, fetchMyNFTs, fetchItemsCreated } = useContext(Store);
    const { loading, setLoading } = useContext(SelectStateContext);

    const [allUnsoldNFTs, setAllUnsoldNFTs] = useState([]); // basically all NFTs
    const [itemListed, setItemListed] = useState([]); // basically all my NFTs I wanna sell
    const [ownedItem, setOwnedItem] = useState([]); // basically all my NFTs 

    let navigate = useNavigate();


    const fetchItems = async () => {
        setLoading(true)
        const res = await fetchMarketItems()
        const res2 = await fetchMyNFTs()
        setOwnedItem(res2)
        // console.log('res2', res2);

        const [fixedNFT, auctionNFT] = res;

        const fixedAndAuction = fixedNFT.map((v, i) => ({ fixed: v, auction: auctionNFT[i] }));

        setAllUnsoldNFTs(fixedAndAuction)
        setLoading(false)
    }

    useEffect(() => {

        fetchItems();
    }, [])

    const emptyFx = () => {
        // temp fix using 2 since the first val is always 0x00000000...
        if (!loading && ownedItem && ownedItem.length < 2) {
            return (
                <div style={{ minWidth: "400px" }}>
                    <Emptys item="NFT" onClick={() => navigate(`/usercollection`)} />
                </div>
            )
        }
    }

    function isOwner(value) {
        // console.log('value', value);
        return value.fixed.owner.toUpperCase() === account.toUpperCase();
    }
    
    function isNotEmpty(value) {
        return value[0] !== "0x0000000000000000000000000000000000000000"
    }



    return (
        <>
            {loading && <Spinner />}

            <Breadcrumb
                title="Owned NFTs"
                description="You will find only your own NFTs here"
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
                                {/* {allUnsoldNFTs.filter(isOwner).map((v) => (

                                    <UnsoldNFTCard key={(v.fixed.itemId).toString()} {...(v.fixed)} auction={v.auction} />
                                ))} */}


                                    {ownedItem.filter(isNotEmpty).map((v) => (

                                    <OwnedNFTCard key={(v.itemId).toString()} {...(v)} />
                                ))}
                            </>
                        )}

                    </div>
                </div>
            </section>


        </>
    )
}

export default OwnedNFTs
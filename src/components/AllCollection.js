import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { notification, Form, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import Store from '../useContexts/Store'
import CollectionStateContext from '../useContexts/CollectionState'
import SelectStateContext from '../useContexts/SelectState'
import { getJSONfromHash } from "../helpers";
import AllCollectionCard from "../elements/AllCollectionCard";
import Breadcrumb from "../elements/Breadcrumb";
import ModalPopup from "../elements/ModalPopup";
import Spinner from "../elements/Spinner";
import { Button } from "react-bootstrap";
import Placeholders from "../elements/Placeholders";
import Emptys from "../elements/Emptys";


function AllCollection() {

    // TEST: attempting to prevent re-renders with context here
    const { totalCollections, getMoreCollections } = useContext(Store);
    const { loading, setLoading } = useContext(SelectStateContext);

    const [allCollections, setAllCollections] = useState([]);

    const [numCollection, setNumCollection] = useState(0);
    const [totalNumCollection, setTotalNumCollection] = useState(0);

    let navigate = useNavigate();


    const getAllCollections = async () => {
        setLoading(true)
        const res = +((await totalCollections()).toString());
        setTotalNumCollection(res);

        setNumCollection(Math.min(2, res));

        const moreCollections = (await getMoreCollections(0, Math.min(5, res)))
        console.log("moreCollections", moreCollections);
        setAllCollections(moreCollections[0]);
        setLoading(false);
    }

    useEffect(() => {

        console.log('hello');
        getAllCollections();

    }, []);


    const gettingMoreCollections = async () => {
        setAllCollections([
            ...allCollections,
            ...(await getMoreCollections(
                numCollection,
                Math.min(numCollection + 5, totalNumCollection)
            )),
        ]);
        setNumCollection(Math.min(numCollection + 5, totalNumCollection));

    };

    const emptyFx = () => {
        if (!loading && allCollections && allCollections.length < 1) {
            return (
                <div >
                    <Emptys item="NFT" onClick={() => navigate(`/usercollection`)} />
                </div>
            )
        }
    }


    function isNotEmpty(value) {
        return value[0] !== "0x0000000000000000000000000000000000000000"
    }



    return (
        <>
            {loading && <Spinner />}
            <Breadcrumb
                title="All Collections"
                description="Browse through all collections here"
            />
            <ModalPopup />

            <section
                id="nft_product_part"
                className="nft-product-area collection-area-page pt-12 pb-50"
            >
                {/* start explore products */}
                <div className="container pb-30">

                    {emptyFx()}


                    {/* Start container */}
                    <div className="row">
                        {/* Start row */}

                        {loading ? (
                            <>
                                <Placeholders />
                            </>
                        ) : (
                            <>
                                {allCollections.filter(isNotEmpty).map((val) => (
                                    <AllCollectionCard key={val.metaDataHash} collectionData={val} />
                                ))}
                            </>
                        )}



                    </div>



                    {numCollection < totalNumCollection ? (
                        <div className="owl-nav">
                            <Button
                                className="owl-next"
                                onClick={gettingMoreCollections}
                            >
                                Load More
                            </Button>
                        </div>

                    ) : (
                        <></>
                    )}


                </div>
            </section>
        </>
    );
}

export default AllCollection;

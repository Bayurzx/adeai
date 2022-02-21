import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { notification, Form, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import Store from '../useContexts/Store'
import CollectionStateContext from '../useContexts/CollectionState'
import SelectStateContext from '../useContexts/SelectState'
import { getJSONfromHash } from "../helpers";
import CollectionCard from "../elements/CollectionCard";
import Breadcrumb from "../elements/Breadcrumb";
import ModalPopup from "../elements/ModalPopup";
import Spinner from "../elements/Spinner";
import { Button } from "react-bootstrap";
import Emptys from "../elements/Emptys";
import Placeholders from "../elements/Placeholders";



function UserCollection() {

    // TEST: attempting to prevent re-renders with context here
    const { totalCollections, getMoreCollections, account } = useContext(Store);
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
        // console.log("moreCollections", moreCollections);
        setAllCollections(moreCollections[0]);
        setLoading(false);
    }

    useEffect(() => {

        // console.log('hello');
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

    function isNotEmpty(value) {
        return value[0] !== "0x0000000000000000000000000000000000000000";
    }

    function isCreator(value) {
        return value.creator.toUpperCase() === account.toUpperCase();
    }

    const emptyFx = () => {
        if (!loading && allCollections?.filter(isNotEmpty).filter(isCreator).length < 1) {
            return (
                <div style={{ minWidth: "400px" }}>
                    <Emptys item="Collection" onClick={() => navigate(`/newcollection`)} />
                </div>
            )
        }
    }



    return (
        <>
            {loading && <Spinner />}
            <Breadcrumb
                title="User Collection"
                description="You will find your collection here"
            />
            <ModalPopup />

            <section
                id="nft_product_part"
                className="nft-product-area collection-area-page pt-12 pb-50"
            >
                {/* start explore products */}
                <div className="container pb-30">
                    {/* Start container */}

                        {emptyFx()}

                    <div className="row">


                        {/* Start row */}
                        {loading ? (
                            <>
                                <Placeholders />
                            </>
                        ) : (
                            <>
                                    {allCollections.filter(isNotEmpty).filter(isCreator).map((val) => (
                                        <CollectionCard key={val.metaDataHash} collectionData={val} />
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

export default UserCollection;

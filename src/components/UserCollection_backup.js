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

function UserCollection() {

    const { getUserCollections } = useContext(Store);
    const { loading, setLoading } = useContext(SelectStateContext);

    const [userCollections, setUserCollections] = useState([]);


    useEffect(() => {

        // console.log('hello');

        getUserCollections()
            .then((res) => {
                setUserCollections(res)
                // console.log('userCollections', userCollections);
            })
            .catch((err) => {
                // console.log('getUserCollections Err: ', err);

                notification['error']({
                    message: "Error fetching User Collection!",
                    description: err.message,
                    duration: 30,
                });

            })

    }, []);




    return (
        <>
            {loading && <Spinner />}
            <Breadcrumb title="User Collection" description="You will find your collection here" />

            <section
                id="nft_product_part"
                className="nft-product-area collection-area-page pt-12 pb-50"
            >
                {/* start explore products */}
                <div className="container pb-30">
                    {/* Start container */}
                    <div className="row">
                        {/* Start row */}
                        {userCollections.map((val) => {
                            <CollectionCard key={val.metaDataHash} collectionData={val} />

                        })}

                    </div>
                </div>
            </section>


        </>
    );
}

export default UserCollection;

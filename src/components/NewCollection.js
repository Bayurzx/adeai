import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { notification, Form, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import Store from '../useContexts/Store'
import SelectedNftContext from '../useContexts/SelectedNft'
import { pinFileToIPFS, pinJSONToIPFS, unPin } from "../helpers";
import CollectionCard from "../elements/CollectionCard2";
import Spinner from "../elements/Spinner";

function NewCollection() {
    const [price, setPrice] = useState();
    const [metaData, setMetaData] = useState({
        name: "MyNFT Name",
        symbol: "SYM",
        title: "myNFT@gmail.com",
        caption: "The greatest!",
        description: "Are you religious? Cause you\’re the answer to all my prayers.",
        image: "img/items/8.jpg",
        file: "",
    });

    useEffect(() => {
        // clear metadata after first render
      setMetaData({
        name: "",
        symbol: "",
        title: "",
        caption: "",
        description: "",
        image: "",
        file: "",
      })

    }, []);


    let navigate = useNavigate();

    const { getCollectionPrice, createCollection } = useContext(Store);
    const { loading, setLoading } = useContext(SelectedNftContext);

    const handleInputChange = (field, value) => {
        // console.log(field, value);
        const newMetaData = { ...metaData };
        newMetaData[field] = value;
        setMetaData(newMetaData);
        console.log('newMetaData', newMetaData);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createNewCollection()
    }

    useEffect(async () => {
        setPrice(+(await getCollectionPrice())); // no purpose, can remove from useeffect

    }, []);

    const createNewCollection = async () => {
        notification['info']({
            message: "Upload to IPFS",
            description: "Upload to IPFS has commenced please wait...",
            duration: 7,
        });

        setLoading(true)

        const { data: { IpfsHash: IpfsHash } } = await pinFileToIPFS(metaData.file) // rename not necessary

        notification['info']({
            message: "Upload to IPFS",
            description: "Uploading metadata please wait...",
            duration: 8,
        });

        console.log('ipfsdata', IpfsHash);
        const hash = await pinJSONToIPFS({ ...metaData, image: IpfsHash });

        console.log("hash", hash);
        setLoading(false)

        notification['info']({
            message: "Upload to IPFS",
            description: "Upload to IPFS was successful, Creating new collection",
            duration: 3,
        });

        setLoading(true)

        await createCollection(metaData.name, metaData.symbol, hash.data.IpfsHash, price.toString())
            .then((res) => {
                console.log('createCollection', res);
                setLoading(false)

                notification['success']({
                    message: "Collection Creation Successfully!",
                    description: "Heading to NFT creation page...",
                    duration: 8,
                });

                navigate('/userCollection') // this should be nft creation page
            })
            .catch(error => {
                setLoading(false)
                notification['error']({
                    message: "Collection Creation Failed!",
                    description: error.message,
                    duration: 30,
                });

                unPin(IpfsHash);
                unPin(hash.data.IpfsHash);
                console.log("error", error);

            })

    }


    return (
        <>
            {loading && <Spinner />}
            <section className="dark-bg-all">{/* start dark bg */}
                <div id="contact_form_page" className="contact-form-area pt-100">{/* start contact area */}
                    <div className="container pb-20">{/* start container */}


                        <div className="row">{/* start row */}
                            <div className="col-md-6">{/* start col */}
                                <div className="contact-left-area">
                                    <div className="form-title pt-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                                        <h2 className="section_heading">Send us Message</h2>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-12">
                                            <div className="contact_form_area wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
                                                <form onSubmit={handleSubmit} className="contact-form" id="contact-form">
                                                    <div className="row">
                                                        <div className="form-group col-md-6 pb-10">
                                                            <input
                                                                value={metaData.name}
                                                                type="text"
                                                                name="name"
                                                                className="form-control"
                                                                id="name"
                                                                placeholder="Name..."
                                                                required="required"
                                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-6 pb-10">
                                                            <input
                                                                value={metaData.symbol}
                                                                type="text"
                                                                name="symbol"
                                                                className="form-control"
                                                                id="symbol"
                                                                placeholder="Symbol.."
                                                                required="required"
                                                                onChange={(e) => handleInputChange('symbol', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-6 pb-10">
                                                            <input
                                                                value={metaData.title}
                                                                type="text"
                                                                name="title"
                                                                className="form-control"
                                                                id="title"
                                                                placeholder="Website / Socials..."
                                                                required="required"
                                                                onChange={(e) => handleInputChange('title', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-6 pb-10">
                                                            <input
                                                                value={metaData.caption}
                                                                type="text"
                                                                name="caption"
                                                                className="form-control"
                                                                id="caption"
                                                                placeholder="Catch Phrase..."
                                                                onChange={(e) => handleInputChange('caption', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-12">
                                                            <textarea
                                                                value={metaData.description}
                                                                rows={6}
                                                                name="message"
                                                                className="form-control"
                                                                id="description"
                                                                placeholder="Drop your words..."
                                                                required="required"
                                                                onChange={(e) => handleInputChange('description', e.target.value)}
                                                            />
                                                        </div>


                                                        <div className="col-md-12 text-center" style={{ backgroundColor: "#bdc5ff" }}>
                                                            <Form.Item>
                                                                <Form.Item name="dragger" valuePropName="fileList" noStyle>
                                                                    <Upload.Dragger
                                                                        onChange={(e) => handleInputChange("file", e.file)}
                                                                        beforeUpload={() => false}
                                                                        name="files"
                                                                        accept=".apng,.avif,.gif,.jpg,.jpeg,.jfif,.pjpeg,.pjp,.png,.svg,.webp"
                                                                        action=""
                                                                    >
                                                                        <p className="ant-upload-drag-icon">
                                                                            <InboxOutlined />
                                                                        </p>
                                                                        <p className="text-dark">Click or drag file to this area to upload</p>
                                                                        <p className="text-muted">Support for PNG, JPG, GIF up to 10MB.</p>
                                                                    </Upload.Dragger>
                                                                </Form.Item>
                                                            </Form.Item>
                                                        </div>

                                                        <div className="col-md-12 text-center">
                                                            <div className="actions pt-30">
                                                                <button type="submit" name="submit" id="submit" className="btn btn-lg btn-contact-bg">
                                                                    Submit Now
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 text-center mt-20">
                                                            <p className="form-message" />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>{/* end col-6 */}
                            <div className="col-md-6">{/* start col-6 */}

                                <CollectionCard metaData={metaData} />

                            </div>{/* end col-6 */}
                        </div>{/* end row */}
                    </div>{/* end container */}
                </div>{/* end contact area */}
                <div id="why_we_are" className="why-choose-us pb-100">{/* start why */}


                </div>{/* end contact area */}
            </section>{/* end dark bg */}


        </>
    );
}

export default NewCollection;

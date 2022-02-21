import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { notification, Form, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import Store from '../useContexts/Store'
import SelectStateContext from '../useContexts/SelectState'
import { pinFileToIPFS, pinJSONToIPFS, unPin } from "../helpers";
import Spinner from "../elements/Spinner";
import Breadcrumb from "../elements/Breadcrumb";
import NFTCard2 from "../elements/NFTCard2";

function NewNFT() {
    const [price, setPrice] = useState();
    const [metaData, setMetaData] = useState({
        name: "",
        royalty: "",
        caption: "",
        description: "",
        category: "",
    });
    const [dataType, setDataType] = useState(false);


    let navigate = useNavigate();
    const { contractAddress } = useParams();

    const { mint } = useContext(Store);
    const { loading, setLoading } = useContext(SelectStateContext);

    const handleInputChange = (field, value) => {
        // console.log(field, value);
        const newMetaData = { ...metaData };
        newMetaData[field] = value;
        setMetaData(newMetaData);
        // console.log('newMetaData', newMetaData);

    }

    const handleOnChange = (dataType) => {
        setDataType(!dataType);
        // console.log("is 3D? ", dataType);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createNewNFT()
    }

    const createNewNFT = async () => {
        notification['info']({
            message: "Upload to IPFS",
            description: "Upload to IPFS has commenced please wait...",
            duration: 7,
        });

        setLoading(true)
        
        if (!metaData?.file) {
            notification['error']({
                message: "File Upload Failed!",
                description: "You need to upload an image!",
                duration: 30,
            });
            setLoading(false)

            throw new Error("You need to upload an image")
        }
        const { data: { IpfsHash } } = await pinFileToIPFS(metaData.file) 

        notification['info']({
            message: "Upload to IPFS",
            description: "Uploading metadata please wait...",
            duration: 8,
        });

        // console.log('ipfsdata', IpfsHash);
        const hash = await pinJSONToIPFS({ ...metaData, image: IpfsHash });

        // console.log("hash", hash);
        setLoading(false)

        notification['info']({
            message: "Upload to IPFS",
            description: "Uploaded to IPFS, now Creating new NFT...",
            duration: 3,
        });

        setLoading(true)

        await mint(hash.data.IpfsHash, metaData.royalty, contractAddress)
            .then((res) => {
                setLoading(false)
                // console.log('mint', res);
                if (!res) throw new Error("Something went wrong")

                notification['success']({
                    message: "NFT Creation Successfully!",
                    description: "Heading to NFT creation page...",
                    duration: 8,
                });

                navigate('/usercollection') // this should be nft creation page
            })
            .catch(error => {
                setLoading(false)
                notification['error']({
                    message: "NFT Creation Failed!",
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
            <Breadcrumb title="Create a new NFT" description="Create something extraordinary!" />
            <section className="dark-bg-all">{/* start dark bg */}
                <div id="contact_form_page" className="contact-form-area pt-100">{/* start contact area */}
                    <div className="container pb-20">{/* start container */}


                        <div className="row">{/* start row */}
                            <div className="col-md-6">{/* start col */}
                                <div className="contact-left-area">
                                    <div className="form-title pt-30 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                                        <h2 className="section_heading">Create NFT</h2>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-12">
                                            <div className="contact_form_area wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
                                                <form onSubmit={handleSubmit} className="contact-form" id="contact-form">
                                                    <div className="row">

                                                        <div className="form-group col-md-12 pb-10">

                                                            <ul className="menu_categories">
                                                                <li className="d-flex switch_item">
                                                                    <span className="switch-text float-left"><h4> Is NFT 3D?</h4></span>
                                                                    <span className="ml-10 me-5 switch-text">No  &nbsp;</span>
                                                                    <label className="switch">
                                                                        <input onClick={() => handleOnChange(dataType)} type="checkbox" />
                                                                        <span className="slider round" />
                                                                    </label>
                                                                    <span className="ml-10 switch-text">Yes</span>
                                                                </li>{/* end li */}
                                                            </ul>{/* end ul */}


                                                        </div>

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
                                                                value={metaData.royalty}
                                                                type="number"
                                                                min="0"
                                                                max="15"
                                                                name="royalty"
                                                                className="form-control"
                                                                id="royalty"
                                                                placeholder="Royalty.."
                                                                required="required"
                                                                onChange={(e) => handleInputChange('royalty', e.target.value)}
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
                                                        <div className="form-group col-md-6 pb-10">

                                                        </div>
                                                        {dataType ? (

                                                            <div className="form-group col-md-12 pb-10">
                                                                <p>Check <Link to="/walkthrough">Walkthrough Page</Link> on how to add 3D files</p>
                                                                <input
                                                                    value={metaData.threeD}
                                                                    type="text"
                                                                    name="threeD"
                                                                    className="form-control"
                                                                    id="threeD"
                                                                    placeholder="Only enter 3D Value..."
                                                                    onChange={(e) => handleInputChange('threeD', e.target.value)}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <></>
                                                        )}

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
                                                            <Form.Item rules={[{ required: true }]}>
                                                                <Form.Item name="dragger" valuePropName="fileList" noStyle rules={[{ required: true }]}>
                                                                    <Upload.Dragger
                                                                        onChange={(e) => handleInputChange("file", e.file)}
                                                                        beforeUpload={() => false}
                                                                        name="files"
                                                                        accept=".apng,.avif,.gif,.jpg,.jpeg,.jfif,.pjpeg,.pjp,.png,.svg,.webp"
                                                                        action=""
                                                                        rules={[{ required: true }]}
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

                                <NFTCard2 metaData={metaData} dataType={dataType} />

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

export default NewNFT;
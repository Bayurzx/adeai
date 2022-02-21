import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { notification, Form, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import Store from '../useContexts/Store'
import SelectStateContext from '../useContexts/SelectState'
import { getJSONfromHash } from "../helpers";
import Spinner from "../elements/Spinner";
import Breadcrumb from "../elements/Breadcrumb";
import NFTCard2 from "../elements/NFTCard2";
import NFTModal from "../elements/NFTModal";
import Emptys from "../elements/Emptys";
import NFTmini from "../elements/NFTmini";
import { twitterShare, linkedInShare, facebookShare } from "../helpers/fx";

function CollectionDetail() {
    


    let navigate = useNavigate();

    const { balanceOf, tokenOfOwnerByIndex, tokenURI, setApprovalForAll, isApprovedForAll } = useContext(Store);
    const { loading, setLoading } = useContext(SelectStateContext);

    const { contractAddress, metaDataHash, ownerAddress } = useParams();

    const [metaData, setmetaData] = useState([]);
    const [nftCount, setNftCount] = useState(0)
    const [nftDetails, setNftDetails] = useState([])
    const [selectedNFT, setSelectedNFT] = useState()
    const [isApproved, setIsApproved] = useState(false)

    const checkApproval = async () => {
        setIsApproved(await isApprovedForAll(ownerAddress, contractAddress))
        
        if (!(await isApprovedForAll(ownerAddress, contractAddress))) {
            await startApproval();
            
        }

        
    }

    const startApproval = async () => {
        if (window.confirm('Are you sure you want to assign full approval rights to the operator?')) {
            
            notification['success']({
                message: "Approval!",
                description: "Approval has been granted!",
                duration: 20,
            });

            const setAppr = await setApprovalForAll(true, contractAddress)
            // console.log("setAppr", setAppr);

            return setAppr;
            

        } else {
            // Do nothing!
            // console.log('It was not approved.');
            notification['info']({
                message: "Approval!",
                description: "Approval has been denied!",
                duration: 20,
            });
            return;

        }
        await setApprovalForAll(true, contractAddress)
    }

    const fetchNFTs = async () => {
        const res = +(await balanceOf(ownerAddress, contractAddress))
        setNftCount(res)
        // console.log('nftCount', nftCount);
        // console.log('res', res);

    }

    const fetchMetaData = async () => {
        if (metaDataHash) {
            const res = await getJSONfromHash(metaDataHash);
            setmetaData(res.data);
            // console.log('metaData' ,res.data);
        }
    };

    const fetchNFTData = async () => {
        if (nftCount < 1) return;

        let nfts = [];

        for (let i = 0; i < nftCount; i++) {
            const nftData = {
                ownerAddress: ownerAddress,
                contractAddress: contractAddress,
                tokenId: +((await tokenOfOwnerByIndex(ownerAddress, i, contractAddress)).toString())
            }

            nftData.tokenURI = await tokenURI(nftData.tokenId, contractAddress);
            nftData.metaData = (await getJSONfromHash(nftData.tokenURI)).data;
            // console.log('nftData.metaData', nftData.metaData);

            nfts.push(nftData);
        }
        // console.log("mapped NFTs", nfts.map(e => e.toString()));
        setNftDetails(nfts);
    }


    useEffect(() => {
        if (!contractAddress) return;

        checkApproval();
        fetchNFTs();

    }, [contractAddress])

    useEffect(() => {

        fetchMetaData()

    }, [metaDataHash])

    useEffect(() => {
        fetchNFTData();

    }, [nftCount])






    return (
        <>
            {loading && <Spinner />}

            <Breadcrumb title="Explore your world of NFTs" description="Create something extraordinary! Here you will find unlisted NFTs too" />

            {selectedNFT && <NFTModal {...selectedNFT} isApproved={isApproved} />}


            <div id="blog_area" className="dark-bg-all pt-50 pb-100"> {/* start blog details */}
                <div className="container"> {/* start container */}
                    <div className="row"> {/* start row */}

                        <div className="col-md-12">{/* col-12 */}
                            <div className="widget text-center">
                                <Link
                                    className="btn btn-success btn-lg text-white"
                                    to={`/${contractAddress}/${metaDataHash}/${ownerAddress}/mint`}
                                >
                                    Create NFT
                                </Link>

                            </div>
                        </div>{/* end col-12 */}


                        <div className="col-md-4 animate-box pt-50">{/* col-4 */}
                            <div className="blog-sidebar row">{/* sidebar right */}
                                {/* <div className="col-md-12">
                                    <div className="section_title">
                                        <h4 className="section-subtitle wow fadeInUp" data-wow-duration="1s" data-wow-delay=".4s">
                                            Browse by category to choose
                                        </h4>
                                    </div>
                                </div> */}

                                { nftDetails.length < 1 ? (
                                    <div className="col-md-12">{/* col-12 */}
                                        <div className="widget">

                                        <Emptys item="NFT" onClick={() => navigate(`/${contractAddress}/${metaDataHash}/${ownerAddress}/mint`)} />
                                        </div>
                                    </div>

                                ) : (
                                    <>
                                        {nftDetails.map( (nftdetail) => (
                                            <div key={nftdetail.metaData.image} onClick={() => setSelectedNFT(nftdetail)}>
                                                <div className="col-md-12">{/* col-12 */}
                                                    <div className="widget">

                                                        <NFTmini {...nftdetail} />
                                                        <div className="text-center">
                                                            <button 
                                                                onClick={() => setSelectedNFT(nftdetail)}
                                                                className="text-center btn btn-info btn-lg"
                                                                data-toggle="modal" data-target="#popup_bid"
                                                            >
                                                                List to Marketplace
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )) }
                                    </>
                                )}



                            </div>{/* end sidebar right */}
                        </div>{/* end col-4 */}



                        <div className="col-md-8 pt-50"> {/* start col-8 */}
                            <div className="blog_post">
                                <div className="post_img">
                                    <img 
                                        src={metaData?.image ? `https://ipfs.infura.io/ipfs/${metaData?.image}` : "/img/extra/blog/blog.jpg"} 
                                        alt="collection" 
                                        className="responsive-fluid" 
                                    />
                                </div>

                                <div className="post_hyperlink">
                                    <div className="post_title">
                                        <h4 className="post_title_text single_title">{metaData.name}</h4>
                                    </div>
                                </div>
                                <div className="blog_description">
                                    <p className="single-blog-text">
                                        {metaData.description} <br /> <br />
                                    </p>
                                </div>
                                <div className="row pb-20">
                                    <div className="tag_area col-md-12 text-center">
                                        <div className="post-tags">
                                            <span>Tags:</span>
                                            <Link to="">NFTs</Link>
                                            <Link to="">Arts</Link>
                                            <Link to="">Photography</Link>
                                        </div>
                                        <ul className="social-links">
                                            <li>Share:</li>
                                            <li><a href={twitterShare('collection', metaData.name)} target="_blank" rel="noopener noreferrer" className="twitter"><i className="bx bxl-twitter" /></a></li>
                                            <li><a href={facebookShare()} target="_blank" rel="noopener noreferrer" className="facebook"><i className="bx bxl-facebook" /></a></li>
                                            <li><a href={linkedInShare()} target="_blank" rel="noopener noreferrer" className="linkedin"><i className="bx bxl-linkedin" /></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div> {/* End  blog details */}
                        </div> {/* End  col-8 */}
                    </div>{/* end row */}
                </div>{/* end container */}
            </div>{/* end blog details */}



        </>
    );
}

export default CollectionDetail;
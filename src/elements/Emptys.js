import React from 'react'
import { Empty, Button } from 'antd';
import { Link } from 'react-router-dom';

function Emptys({ item = "Collection", onClick = () => { } }) {
    return (
        <>


            <div className="browse_categories">{/* start category */}
                <div className="container">{/* start container */}

                    <div onClick={onClick} className="">{/* start row */}
                        <div className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".2s">{/* start col-2 */}
                            <Link to="" className="single_category category_box1">
                                <span className="category_icon">
                                    <i className="bx bx-image" />
                                </span>
                                <span className="category_title">Art Works</span>
                                <Empty
                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={
                                        <span>
                                            Nothing here yet
                                        </span>
                                    }
                                >
                                    <Button type="primary">Create {item}</Button>
                                </Empty>

                            </Link>
                        </div>{/* end col-2 */}
                    </div>{/* end row */}
                </div>{/* end container */}
            </div>{/* end category */}



        </>
    )
}

export default Emptys
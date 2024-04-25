import React from 'react';
import './css/Scrollbar.css';

const ScrollBar = ({ projectdata }) => {
    const filteredData = projectdata ? projectdata.filter(item => item.category_id === 5) : []; 
    return (
        <>
            <div className="scrollbar">
                <div className="container">
                    <div className="row flex-wrap justify-content-center justify-content-lg-between align-items-lg-center">
                        <div className="col-lg-2">
                            <div className="label ripple">Flash News</div>
                        </div>
                        <div className="col-lg-10">
                            <div className="marqueenews">
                                <div className="marquee">
                                    {filteredData.length > 0 ? (
                                        filteredData?.map(item => (
                                            <p key={item.id}>{item.title}</p>
                                        ))
                                    ) : (
                                        <p>No Flash News Available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScrollBar;

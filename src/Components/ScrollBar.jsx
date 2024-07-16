import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Scrollbar.css';

const ScrollBar = ({ projectdata }) => {

    const [isScrollingAllowed, setIsScrollingAllowed] = useState(true);

    const latestNews = projectdata?.filter(item => item?.category_id === 5)?.slice(0, 1) || [];
  
    const stopScroll = () => {
      setIsScrollingAllowed(false);
    };
  
    const allowScroll = () => {
      setIsScrollingAllowed(true);
    };
  
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
                                    {latestNews.length > 0 ? (
                                        latestNews?.map(item => (
                                            <p
                                                onMouseEnter={stopScroll}
                                                onMouseLeave={allowScroll}
                                                onTouchStart={stopScroll}
                                                onTouchEnd={allowScroll}
                                                style={{ overflow: isScrollingAllowed ? "" : "hidden" }}
                                            >
                                                {latestNews?.map((newsItem, index) => (
                                                    <span key={index}>
                                                        <img
                                                            src="images/logos/output-onlinegiftools.gif"
                                                            style={{ maxWidth: "40px" }}
                                                            alt=""
                                                        />
                                                        <Link
                                                            to={`/all-flash-news?flashnewsid=${encodeURIComponent(btoa(newsItem.id))}`}
                                                            style={{ color: "white", textDecoration: "none" }}
                                                        >
                                                            {newsItem.title}
                                                        </Link>
                                                    </span>
                                                ))}
                                            </p>
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

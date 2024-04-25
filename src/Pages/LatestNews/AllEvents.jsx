import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './newstyle.css';
import { ApiUrl } from '../../API/ApiUrl';
import { Link, useLocation } from 'react-router-dom';

const AllEvents = () => {
    const search = useLocation().search;
    const eventid = new URLSearchParams(search).get("eventid");
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error] = useState('');
    const [latestEvents, latestEventsed] = useState([]);
    const [Filterprojectdata, Filterdnews] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/get/homepagee/sections`);
                localStorage.setItem("HomeData", JSON.stringify(response?.data?.data));
                setNews(response?.data?.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const newsevents = localStorage.getItem("HomeData");
        if (newsevents) {
            const parsedData = JSON.parse(newsevents);
            setNews(parsedData);
            setLoading(false);
            const latestEventsFiltered = parsedData?.projectdata
                ? parsedData?.projectdata
                    .filter((news) => news.category_id === 4)
                    .sort((a, b) => new Date(b.eventdate) - new Date(a.eventdate))
                    .slice(0, 3)
                : [];
            Filterdnews(latestEventsFiltered);
            latestEventsed(latestEventsFiltered);
        }
    }, [eventid]);

    const data = news?.projectdata?.find((item) => item.id === parseInt(eventid));

    const handleGoBack = () => {
        window.history.back();
    };
    const setNewsfilter = (value) => {

        const keys = ["title", "category_name", "content", "eventdate"];

        const filter = Filterprojectdata.filter((item) =>
            keys.some((key) =>
                item[key].toString()?.toLowerCase()?.includes(value?.toLowerCase())
            )
        );
        latestEventsed(filter)
    };
    return (
        <>
            {error && <div>Error: {error}</div>}
            <div className="rs-event-details pt-50 pb-50">
                <div className="container">
                    <div className="section-title text-center mt-2">
                        <h4 className="title">Upcoming Events</h4>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            {loading ? (
                                <div>Loading...</div>
                            ) : data === 0 ? (
                                <div>No data available</div>
                            ) : (
                                <div className="event-details-content">
                                    <h3 className="event-title">
                                        <a href="events-details.html">
                                            {data?.title}
                                        </a>
                                    </h3>
                                    <div className="event-meta">
                                        <div className="event-date">
                                            <i className="fa fa-calendar" />
                                            <span>&nbsp;{data?.eventdate}</span>
                                        </div>
                                    </div>
                                    <div className="event-img">
                                        <img
                                            src={data?.media_url || 'assets/images/img/noimage.webp'}
                                            alt="Event Details Images"
                                        />
                                    </div>
                                    <div className="event-desc">
                                        <div dangerouslySetInnerHTML={{ __html: data?.content }} />
                                    </div>
                                    <div className="share-area">
                                        <div className="row rs-vertical-middle">
                                            <div className="col-md-4">
                                                <div className="book-btn mt-5">
                                                    <Link to="/" onClick={handleGoBack}>Go Back</Link>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="share-inner">
                                                    <span>SHARE:</span>
                                                    <a href="/">
                                                        <i className="fa fa-facebook" />
                                                    </a>
                                                    <a href="/">
                                                        <i className="fa fa-twitter" />
                                                    </a>
                                                    <a href="/">
                                                        <i className="fa fa-google" />
                                                    </a>
                                                    <a href="/">
                                                        <i className="fa fa-pinterest-p" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="sidebar-area">
                                <div className="search-box">
                                    <h3 className="title">Search Events</h3>
                                    <div className="box-search">
                                        <input
                                            className="form-control"
                                            placeholder="Search Here ..."
                                            name="srch-term"
                                            onChange={(e) => setNewsfilter(e.target.value)}
                                            id="srch-term"
                                            type="text"
                                        />
                                        <button className="btn btn-default" type="submit">
                                            <i className="fa fa-search" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div className="latest-courses">
                                    <h3 className="title"> Upcoming Events</h3>
                                    {loading ? (
                                        <div>Loading...</div>
                                    ) : latestEvents.length === 0 ? (
                                        <div>No data available</div>
                                    ) : (
                                        <ul className="latest-news">
                                            {latestEvents.map((news, index) => (
                                                  <Link to={`/ourevents?eventid=${news?.id}`} key={index}>
                                                    <div className="post-item" key={index}>
                                                        <div className="post-img">
                                                            <a href="/">
                                                                <img
                                                                    src={loading ? 'Loading...' : news?.media_url || 'assets/images/img/noimage.webp'}
                                                                    alt=""
                                                                    title="News image"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="post-desc">
                                                            <h5>
                                                                <a href="/">
                                                                    {loading ? 'Loading...' : news?.title}
                                                                </a>
                                                            </h5>
                                                            <p dangerouslySetInnerHTML={{ __html: loading ? 'Loading...' : news?.content.slice(0, 60) }} />
                                                            <span className="duration">
                                                                <i className="fa fa-calendar" aria-hidden="true" /> {loading ? 'Loading...' : news?.eventdate}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    </Link>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="tags-cloud clearfix">
                                    <h3 className="title">Category</h3>
                                    <ul>
                                        {loading ? (
                                            'Loading...'
                                        ) : (<li>
                                            <a href="/">{data.category_name}</a>
                                        </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AllEvents
import React from 'react'
import { Link } from 'react-router-dom'

const OurChurch = () => {
    return (
        <>
            <div className="events-area pt-50 pb-40">
                <div className="section-title text-center mt-5">
                    <h3 className="title">Our Church</h3>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-md-6">
                            <div className="single-events-card style-4">
                                <div className="events-image">
                                    <Link to={`/history`}>
                                        <img src='assets/images/church.PNG' alt="No Event" style={{ height: "305px" }} />
                                    </Link>
                                </div>
                                <div className="events-content">
                                    <br />
                                    <Link to={`/history`} className='latestnews'>
                                        <h3>History of Fathima Shrine</h3>
                                    </Link>
                                    <p></p>
                                    <Link to={`/history`} className="read-more-btn"> Read More <i className="flaticon-next" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-events-card style-4">
                                <div className="events-image">
                                    <Link to={`/masstimings`}>
                                        <img src='assets/images/img/donate.1.webp' alt="No Event" />
                                    </Link>
                                </div>
                                <div className="events-content">
                                    <br />
                                    <Link to={`/masstimings`} className='latestnews'>
                                        <h3>Mass Timings</h3>
                                    </Link>
                                    <p></p>
                                    <Link to={`/masstimings`} className="read-more-btn"> Read More <i className="flaticon-next" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-events-card style-4">
                                <div className="events-image">
                                    <Link to={`/priest-message`} className='latestnews'>
                                        <img src='assets/images/father.jpeg' alt="No Event" style={{ height: "303px", width: "100%" }} />
                                    </Link>
                                </div>
                                <div className="events-content">
                                    <br />
                                    <Link to={`/priest-message`} className='latestnews'>
                                        <h3>Message of Parish Priest</h3>
                                    </Link>
                                    <p></p>
                                    <Link to={`/priest-message`} className='read-more-btn'> Read More <i className="flaticon-next" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-events-card style-4">
                                <div className="events-image">
                                    <Link to={`/contactus`}>
                                        <img src='assets/images/church.PNG' alt="No Event" style={{ height: "305px" }} />
                                    </Link>
                                </div>
                                <div className="events-content">
                                    <br />
                                    <Link to={`/contactus`} className='latestnews'>
                                        <h3>Contact Us</h3>
                                    </Link>
                                    <p></p>
                                    <Link to={`/contactus`} className="read-more-btn"> Read More <i className="flaticon-next" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OurChurch

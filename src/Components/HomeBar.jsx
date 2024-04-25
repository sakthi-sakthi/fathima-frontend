import React from 'react'
import './css/Homebar.css'
const HomeBar = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card-custom mt-4">
                            <div className="card-header-custom" style={{ backgroundColor: "#7878ff" }}>
                                <h6>Bank Details</h6>
                            </div>
                            <div className="card-body-custom">
                                <div className="event-detail">
                                    <div className="event-description">
                                        <i className="icon fa fa-university" />
                                        <b>Bank Name :</b> OUR LADY OF FATIMA RENOVATION FUND
                                    </div>
                                    <div className="event-description">
                                        <i className="icon fa fa-credit-card" />
                                        <b>Account Number:</b> 19930100068839
                                    </div>
                                    <div className="event-description">
                                        <i className="icon fa fa-code" />
                                        <b>IFSC Code:</b> FDRL0001993
                                    </div>
                                    <div className="event-description">
                                        <i className="icon fa fa-money-check-alt" />
                                        <b>UPI ID:</b>
                                        <a
                                            href="upi://pay?pa=fatimachurch@fbl&pn=Fatima Church Krishnagiri&cu=INR"
                                            className="upi-pay1"
                                        >
                                            fatimachurch@fbl
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-custom mt-4">
                            <div className="card-header-custom" style={{ backgroundColor: "#ff9b42" }}>
                                <h6>Special Mass Time</h6>
                            </div>
                            <div className="card-body-custom">
                                <div className="event-detail">
                                    <div className="event-title">Christmas</div>
                                    <div className="event-date">December 25, 2024</div>
                                    <div className="event-description">
                                        Join us for a special Christmas Mass celebration. Let's come together to
                                        celebrate the joyous occasion of Christmas.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card-custom mt-4">
                            <div className="card-header-custom" style={{ backgroundColor: "#FF6F61" }}>
                                <h6>தமிழ் திருவழிபாடு ( வார நாட்கள் )</h6>
                            </div>
                            <div className="card-body-custom">
                                <p><b>ஞாயிறு</b> - காலை 6 மணி , 8 மணி, <br/> மாலை 6:30 மணி</p>
                                <p><b>தினசரி</b> - காலை 6 மணி</p>
                                <p><b>வியாழன், சனி</b> - மாலை 6:30 மணி</p>
                                <p>மாதத்தின் முதல் <b>வெள்ளி</b> மாலை 6:30 மணி</p>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeBar

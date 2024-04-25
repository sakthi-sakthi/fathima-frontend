import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ApiUrl } from '../../API/ApiUrl';
const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [address, setAddress] = useState(null);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const cachedData = localStorage.getItem('addressData');
                if (cachedData) {
                    setAddress(JSON.parse(cachedData));
                } else {
                    const response = await axios.get(`${ApiUrl}/get/contactDetails`);
                    setAddress(response?.data?.data);
                    localStorage.setItem('addressData', JSON.stringify(response?.data?.data));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        const handleScrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        const goTopButton = document.querySelector('.go-top');

        if (goTopButton) {
            goTopButton.addEventListener('click', handleScrollToTop);
        }

        return () => {
            if (goTopButton) {
                goTopButton.removeEventListener('click', handleScrollToTop);
            }
        };
    }, []);
    return (
        <>
            <div className="footer-area pt-70 pb-30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6">
                            <div className="footer-widjet">
                                <div className='section-headings'>
                                    <h3 className="text-white entry-title">History</h3>
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <Link to={"/"}>
                                            <img
                                                src="assets/images/mom.png"
                                                title='Lourdes Shrine Perambur'
                                                className="main-logos mt-3"
                                                alt=""
                                                style={{
                                                    display: "block",
                                                    width: "100% !important",
                                                }}
                                            />
                                        </Link>
                                    </div>
                                    <div className="col-9">
                                        <p style={{ color: "white", textAlign: "justify", fontSize: "13px !important" }}>
                                            Almighty Lord! We are praising us We are.  Thanks to Um “daughter Treat hail with all encouragement.  Thank you for your promise of being with you. New my temple.
                                        </p>
                                    </div>
                                    <p style={{ color: "white", textAlign: "justify", fontSize: "13px !important" }}>
                                        We are happily there Who said drink drink! We, your dear people, stay in your presence Participate in Ummod and Closeup Become a new beloved Mr This project is a form renewal process We dedicate your pure revision.
                                    </p>
                                </div>
                                <br />
                                <div className="copy">
                                    <p className='text-white' id="footcopynew">
                                        &copy; {currentYear} <a
                                            href="https://boscosofttech.com/"
                                            target="_blank"
                                            id="footcopynew"
                                            className='text-white'
                                            rel="noreferrer"
                                            style={{ textDecoration: 'none', color: '#fff' }}
                                        >
                                            BoscoSoft Technologies
                                        </a>
                                        &nbsp;&nbsp;All rights reserved.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-6">
                            <div className="footer-widjet">
                                <div className='section-headings'>
                                    <h3 className="text-white entry-title">Quick Links</h3>
                                </div>
                                <div className="list">
                                    <ul className="quick-links">
                                        <li>
                                            <Link to={'/history'}><i className="fa fa-angle-right"></i> History</Link>
                                        </li>
                                        <li>
                                            <Link to={'/for-members'}><i className="fa fa-angle-right"></i> Members</Link>
                                        </li>
                                        <li>
                                            <Link to={'/videos'}><i className="fa fa-angle-right"></i> Videos</Link>
                                        </li>
                                        <li>
                                            <Link to={'/fihm'}><i className="fa fa-angle-right"></i> FIHM</Link>
                                        </li>
                                        <li>
                                            <Link to={'/mass-regulations'}><i className="fa fa-angle-right"></i> Mass Regulations</Link>
                                        </li>
                                        <li>
                                            <Link to={'/anbiyam'}><i className="fa fa-angle-right"></i> Anbiyam</Link>
                                        </li>
                                        <li>
                                            <Link to={'/contactus'}><i className="fa fa-angle-right"></i> Contact Us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-widjet">
                                <div className='section-headings'>
                                    <h3 className="text-white entry-title">Contact Us</h3>
                                </div>
                                {address ? (
                                    <span id='emailLink'>
                                        <p className="text-white mt-4">
                                            <span className="theme-clr"><i className='fa fa-map-marker'></i></span>&nbsp;&nbsp;{address.address}
                                        </p>
                                        <p className="text-white">
                                            <span className="theme-clr"><i className='fa fa-phone'></i></span>&nbsp;&nbsp;<a href={`tel:${address.mobile}`} id="phoneAnchor" className="text-white">
                                                &nbsp;{address.mobile}
                                            </a>
                                        </p>
                                        <p className="text-white">
                                            <span className="theme-clr"><i className='fa fa-envelope'></i></span>&nbsp;&nbsp;<a
                                                href={`mailto:${address.email}`}
                                                id="emailAnchor"
                                                className="text-white"
                                            >
                                                &nbsp;{address.email}
                                            </a>
                                        </p>
                                    </span>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                            <div className="visitors-count mt-3">
                                <a href="https://info.flagcounter.com/4jL0">
                                    <img
                                        src="https://s11.flagcounter.com/count2/4jL0/bg_FFFFFF/txt_000000/border_CCCCCC/columns_3/maxflags_9/viewers_Visitors+from+1+Jan+2020/labels_1/pageviews_1/flags_0/percent_0/"
                                        alt="Flag Counter"
                                        border={0}
                                        id="flag"
                                    />
                                </a>
                            </div>
                            <br />
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-widjet">
                                <div className='section-headings'>
                                    <h3 className="text-white entry-title">Our Location</h3>
                                </div>
                                <div className="list">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.843732084267!2d80.23618708440311!3d13.109084278911553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265b73211d32b%3A0xda5ec2bc77c1c7e2!2sOur%20Lady%20of%20Lourdes%20Shrine!5e0!3m2!1sen!2sin!4v1712839252208!5m2!1sen!2sin"
                                        width="100%"
                                        height={200}
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        title='loreto'
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="go-top">
                <i className="ri-arrow-up-s-line" />
                <i className="ri-arrow-up-s-line" />
            </div>
        </>
    )
}

export default Footer

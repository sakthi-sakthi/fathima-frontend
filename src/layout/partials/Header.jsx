import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import UpcomeMassTime from '../../Components/UpcomeMassTime';
const Header = ({ menudata }) => {
    const location = useLocation();
    const url = location.pathname;
    return (
        <>
            <div className="top-header-area">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <div className="header-left-content">
                                <div style={{ display: "inline-block" }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 512"
                                        id="svg-church"
                                        style={{ width: 20, height: 20 }}
                                    >
                                        <path
                                            fill="#ffffff"
                                            d="M464.5 246.7L352 179.2V128h48c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v51.2l-112.5 67.5A32 32 0 0 0 160 274.1V512h96v-96c0-35.4 28.7-64 64-64s64 28.7 64 64v96h96V274.1c0-11.2-5.9-21.7-15.5-27.4zM0 396V496c0 8.8 7.2 16 16 16h112V320L19.4 366.5A32 32 0 0 0 0 396zm620.6-29.4L512 320v192h112c8.8 0 16-7.2 16-16V396c0-12.8-7.6-24.4-19.4-29.4z"
                                        />
                                    </svg>
                                    <h6 style={{ display: "inline-block", marginLeft: 5, color: "white", marginBottom: '-5px' }}>
                                        <Link to={'/masstimings'}>
                                            <UpcomeMassTime />
                                        </Link>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="header-right-content">
                                <div className="list">
                                    <ul>
                                        <button type="button" className="btn btn-primary" id='donate-btn'>Donation</button>
                                        <li className="list-inline-item mr-5 mb-0">
                                            <a
                                                href='https://www.facebook.com/OurLadyOfFatimaShrineKrishnagiri/'
                                                id="facebookIcon"
                                                className="facebook-btn"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="fa fa-facebook" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item mr-3 mb-0">
                                            <a
                                                href='https://chat.whatsapp.com/FrlXnDyMCm37pkLvolXnDH'
                                                id="pinterestIcon"
                                                className="pinterest-btn"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="fa fa-whatsapp" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item mr-3 mb-0">
                                            <a
                                                href='https://www.youtube.com/c/ourladyoffatimashrine'
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                id="youtubeIcon"
                                                className="youtube-btn"
                                            >
                                                <i className="fa fa-youtube" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item mr-3 mb-0">
                                            <a
                                                href='https://www.instagram.com/our_lady_of_fatima_shrine/'
                                                id="instagramIcon"
                                                className="instagram-btn"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="fa fa-instagram" />
                                            </a>
                                        </li>
                                        <li className="list-inline-item mr-3 mb-0">
                                            <a
                                                href='https://twitter.com/OurLadyFatima13'
                                                id="twitterIcon"
                                                className="twitter-btn"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="fa fa-twitter" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-banner">
                <img
                    src="assets/images/banner.png"
                    alt="Banner"
                    style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }}
                />
            </div>
            <div className="navbar-area nav-bg-2">
                <div className="desktop-nav">
                    <div className="container-fluid">
                        <nav className="navbar navbar-expand-md navbar-light">
                            <div
                                className="collapse navbar-collapse mean-menu justify-content-center"
                                id="navbarSupportedContent"
                            >
                                <ul className="navbar-nav">
                                    {menudata?.map((menuItem, index) => (
                                        <li key={index} className="nav-item">
                                            {menuItem.children ? (
                                                <Link to={menuItem.url} className={`nav-link  ${menuItem.children.some(child => url.includes(child.url)) ? "activemain" : ""}`}>
                                                    {menuItem.label}{menuItem.children && <i className="fa fa-angle-down ml-2 mb-2" />}
                                                </Link>
                                            ) : (
                                                <Link
                                                    to={menuItem.url}
                                                    className={`nav-link ${url === menuItem.url ? "activemain" : ""
                                                        }`}
                                                >
                                                    {menuItem.label}
                                                </Link>
                                            )}
                                            {menuItem.children && (
                                                <ul className="dropdown-menu">
                                                    {menuItem.children?.map((subItem, subIndex) => (
                                                        <li
                                                            key={subIndex}
                                                            className={`nav-item ${url === subItem.url ? "active" : ""
                                                                }`}
                                                        >
                                                            <Link to={subItem.url} className="nav-link">
                                                                {subItem.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <button type="button" className="btn btn-primary" id='massbook-btn'>Mass Booking</button>
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="others-option-for-responsive">
                    <div className="container">
                        <div className="dot-menu">
                            <div className="inner">
                                <div className="icon">
                                    <i
                                        className="ri-menu-3-fill"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasWithBothOptions"
                                        aria-controls="offcanvasWithBothOptions"
                                        title='Click to View Menu'
                                    />
                                    <div
                                        className="offcanvas offcanvas-start"
                                        data-bs-scroll="true"
                                        tabIndex={-1}
                                        id="offcanvasWithBothOptions"
                                        aria-labelledby="offcanvasWithBothOptionsLabel"
                                    >
                                        <div className="offcanvas-header">
                                            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
                                                Our Lady of Fathima Shrine
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close text-reset"
                                                data-bs-dismiss="offcanvas"
                                                aria-label="Close"
                                            />
                                        </div>
                                        <div className="offcanvas-body">
                                            <ul className="navbar-nav ms-auto">
                                                {menudata?.map((menuItem, index) => (
                                                    <li key={index} className="nav-item" >
                                                        {menuItem.children ? (
                                                            <Link to={menuItem.url} className={`nav-link  ${menuItem.children.some(child => url.includes(child.url)) ? "activemain" : ""}`}>
                                                                {menuItem.label} {menuItem.children && <i className="fa fa-angle-down ml-2 mb-2" />}
                                                            </Link>
                                                        ) : (
                                                            <Link to={menuItem.url} className={`nav-link ${url === menuItem.url ? "activemain" : ""}`}>
                                                                {menuItem.label}
                                                            </Link>
                                                        )}
                                                        {menuItem.children && (
                                                            <ul className="dropdown-menu">
                                                                {menuItem.children?.map((subItem, subIndex) => (
                                                                    <li key={subIndex} className={`nav-item ${url === subItem.url ? "active" : ""}`}>
                                                                        <Link to={subItem.url} className="nav-link">
                                                                            {subItem.label}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Header

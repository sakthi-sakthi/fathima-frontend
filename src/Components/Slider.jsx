import React, { useState, useEffect } from 'react';
import './css/Slider.css';

const Slider = ({ sliderdata }) => {
    const [autoplay, setAutoplay] = useState(true);

    // Pause autoplay on hover
    const handleMouseEnter = () => {
        setAutoplay(false);
    };

    // Resume autoplay on mouse leave
    const handleMouseLeave = () => {
        setAutoplay(true);
    };

    // Autoplay effect
    useEffect(() => {
        let intervalId;

        if (autoplay) {
            intervalId = setInterval(() => {

            }, 3000); 
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [autoplay]);

    return (
        <div
            className="carousel slide"
            data-bs-ride="carousel"
            id="carouselExampleCaptions"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="carousel-inner">
                {sliderdata?.map((slide, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <img src={slide?.image} className="d-block w-100" alt={`Slider`} />
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" data-bs-slide="prev" data-bs-target="#carouselExampleCaptions" type="button">
                <span aria-hidden="true" className="carousel-control-prev-icon" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" data-bs-slide="next" data-bs-target="#carouselExampleCaptions" type="button">
                <span aria-hidden="true" className="carousel-control-next-icon" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Slider;

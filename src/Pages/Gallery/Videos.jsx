import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import './video.css';

const Video = () => {
    const defaultthumbnail = "assets/images/img/noimage.webp";
    const [error, setError] = useState(null);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const fetchVideos = async () => {
        try {
            const cachedData = localStorage.getItem('videosData');
            if (cachedData) {
                return JSON.parse(cachedData);
            }

            const response = await axios.get(
                'https://youtube.googleapis.com/youtube/v3/search',
                {
                    params: {
                        part: 'snippet',
                        channelId: 'UCsdH8_0dElzamrbrxd0Mdwg',
                        maxResults: 9,
                        order: 'date',
                        key: 'AIzaSyBXrHCFqaskrzAG1hkwOI5DWe6Yk6GcDTc'
                    }
                }
            );
            const videosData = response.data.items;
            localStorage.setItem('videosData', JSON.stringify(videosData));
            return videosData;
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
            throw new Error('Error fetching data');
        }
    };

    const { data: videos, isLoading, isError } = useQuery('videos', fetchVideos, {
        staleTime: 600000,
    });

    const redirectToYouTube = () => {
        window.open("https://www.youtube.com/@OurLadyOfFatimaShrine/", "_blank", "noreferrer noopener");
    };

    const openLightbox = (video, index) => {
        setLightboxImage(video);
        setLightboxIndex(index);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setLightboxImage(null);
        setLightboxIndex(null);
        document.body.style.overflow = "";
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
        padding: '10px 20px',
        color: '#fff',
        cursor: 'pointer',
        borderRadius: '5px',
        textDecoration: 'none',
        display: 'inline-block'
    };

    const publishTime = videos && videos[0]?.snippet.publishTime ? new Date(videos[0].snippet.publishTime) : null;
    const formattedDate = publishTime ? publishTime.toDateString() : '';

    return (
        <>
            {lightboxImage && lightboxIndex === 0 && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="close-button" onClick={closeLightbox}>
                        &times;
                    </button>
                    <div className="lightbox-container">
                        <iframe
                            title="lightboxVideo"
                            width="600px"
                            height="400"
                            src={`https://www.youtube.com/embed/${lightboxImage.id.videoId}?autoplay=1`}
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
            
            {lightboxImage && lightboxIndex !== 0 && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="close-button" onClick={closeLightbox}>
                        &times;
                    </button>
                    <div className="lightbox-container">
                        <iframe
                            title="lightboxVideo"
                            width="600px"
                            height="400"
                            src={`https://www.youtube.com/embed/${lightboxImage.id.videoId}?autoplay=1`}
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
            
            {isLoading ? (
                <div className="text-center mt-4">
                    <p><b>Loading...</b></p>
                </div>
            ) : isError ? (
                <div className="text-center mt-4">
                    <p>{error}</p>
                </div>
            ) : (
                <div className="section section-padding pt-0">
                    {videos && videos.length > 0 && (
                        <div className="container">
                            <div className="section-title text-center mt-2">
                                <h4 className="title">Parish Videos</h4>
                            </div>
                            <div className="row sigma_broadcast-video">
                                <div className="col-12 mb-5">
                                    <div className="row g-0 align-items-center">
                                        {videos[0] && (
                                            <div className="col-lg-6">
                                                <div className="sigma_video-popup-wrap">
                                                    <img
                                                        src={videos[0]?.snippet.thumbnails.medium.url || defaultthumbnail}
                                                        alt="video"
                                                        onError={(e) => {
                                                            e.target.src = defaultthumbnail;
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => openLightbox(videos[0], 0)}
                                                        className="sigma_video-popup popup-youtube"
                                                        style={{ border: "none" }}
                                                    >
                                                        <i className="fa fa-play" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        <div className="col-lg-6">
                                            <div className="sigma_box m-0">
                                                <p className="custom-primary mb-0 fw-600 fs-16">Posted Date : {formattedDate}</p>
                                                <br />
                                                {videos[0] && (
                                                    <>
                                                        <h5 className="title">{videos[0].snippet.title}</h5>
                                                        <p className="m-0" style={{ fontWeight: "bold" }}>{videos[0]?.snippet.channelTitle}</p>
                                                        <button className="sigma_btn-custom section-button" onClick={redirectToYouTube}>Watch Videos</button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {videos && videos.length > 1 && (
                        <div className="container">
                            <div className="row sigma_broadcast-video">
                                {videos.slice(1).map((video, index) => (
                                    <div className="col-lg-3 col-sm-6 mb-30" key={index}>
                                        <div className="sigma_video-popup-wrap">
                                            <img
                                                src={video.snippet.thumbnails.medium.url || defaultthumbnail}
                                                alt="video"
                                                onError={(e) => {
                                                    e.target.src = defaultthumbnail;
                                                }}
                                            />
                                            <button
                                                onClick={() => openLightbox(video, index + 1)}
                                                className="sigma_video-popup popup-sm popup-youtube"
                                                style={{ border: "none" }}
                                            >
                                                <i className="fa fa-play" />
                                            </button>
                                        </div>
                                        <br />
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    onClick={redirectToYouTube}
                                    style={buttonStyle}
                                >
                                    View More
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Video;
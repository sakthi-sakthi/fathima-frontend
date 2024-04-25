import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { ApiUrl } from '../../API/ApiUrl';
import styled from 'styled-components';
import "../../Components/css/LightboxGallery.css";

const StyledContainer = styled(Container)`
  margin-top: 20px;
  max-width: 1700px;
`;

const StyledTabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledTab = styled.div`
  padding: 10px 20px;
  margin:5px;
  font-size: 16px;
  color: ${(props) => (props.active ? '#fff' : '#000')};
  background-color: ${(props) => (props.active ? 'tomato' : '#f8f9fa')};
  border-radius: 10px;
  cursor: pointer;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? 'tomato' : '#e9ecef')};
  }
`;

const StyledImage = styled.img`
  object-fit: cover;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
`;

const StyledMessage = styled.p`
  text-align: center;
`;

const PhotoGallery = () => {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);


    const storeImagesInLocalStorage = (images) => {
        localStorage.setItem('galleryImages', JSON.stringify(images));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/get/gallery_images`);
                const { data } = response.data;

                const cachedImages = localStorage.getItem('galleryImages');
                if (cachedImages && JSON.stringify(data) === cachedImages) {
                    setImages(JSON.parse(cachedImages));
                    setCategories([...new Set(JSON.parse(cachedImages)?.map((image) => image.categoryname))]);
                } else {
                    setImages(data);
                    setCategories([...new Set(data?.map((image) => image.categoryname))]);
                    storeImagesInLocalStorage(data);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const filteredImages = selectedCategory
        ? images.filter((image) => image.categoryname === selectedCategory)
        : images;

    const openLightbox = (image) => {
        setLightboxImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxImage(null);
        document.body.style.overflow = '';
    };

    return (
        <StyledContainer>
            <div className="section-title text-center">
                <h4 className="title">Parish Photos</h4>
            </div>
            <StyledTabContainer>
                <div className="tabContainer">
                    <StyledTab
                        active={!selectedCategory}
                        onClick={() => handleCategorySelect('')}
                    >
                        All
                    </StyledTab>
                    {categories?.map((category, index) => (
                        <StyledTab
                            key={index}
                            active={selectedCategory === category}
                            onClick={() => handleCategorySelect(category)}
                        >
                            {category}
                        </StyledTab>
                    ))}
                </div>
            </StyledTabContainer>
            {loading ? (
                <StyledMessage style={{ color: "black" }}><b>Loading...</b></StyledMessage>
            ) : (
                <Row>
                    {filteredImages && filteredImages.length === 0 ? (
                        <StyledMessage style={{ color: "black" }}><b>No images found.</b></StyledMessage>
                    ) : (
                        filteredImages?.map((image) => (
                            <Col sm={3} className="mb-3" key={image.id}>
                                <StyledImage
                                    src={image.image}
                                    alt={image.title}
                                    onClick={() => openLightbox(image)}
                                    className="img-fluid"
                                />
                            </Col>
                        ))
                    )}
                </Row>
            )}
            {lightboxImage && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="close-button" onClick={closeLightbox}>
                        &times;
                    </button>
                    <div className="lightbox-container">
                        <img
                            src={lightboxImage.image}
                            alt="nodata"
                            className="img-fluid rounded lightbox-image"
                        />
                    </div>
                </div>
            )}
        </StyledContainer>
    );
};

export default PhotoGallery;
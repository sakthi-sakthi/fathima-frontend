import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import Slider from "./Components/Slider";
import HomeBar from "./Components/HomeBar";
import AboutUs from "./Components/AboutUs";
import Header from "./layout/partials/Header";
import Footer from "./layout/partials/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { ApiUrl } from "./API/ApiUrl";
import ScrollBar from "./Components/ScrollBar";
import LatestEvent from "./Components/LatestEvent";
import OurChurch from "./Components/OurChurch";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [homedata, setHomedata] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/homepagee/sections`);
        localStorage.setItem("HomeData", JSON.stringify(response?.data?.data));
        setHomedata(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchpageData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/Pages/{id}`);
        const newData = response?.data?.pages;
        localStorage.removeItem("Pages");
        localStorage.setItem("Pages", JSON.stringify(newData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchpageData();
    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#012c6d"
          ariaLabel="Our Lady of Fatima Shrine"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <>
      <Header menudata={homedata?.headermenudata} />
      <Slider sliderdata={homedata?.SlidesData} />
      <ScrollBar projectdata={homedata?.projectdata} />
      <AboutUs />
      <HomeBar />
      <OurChurch />
      <LatestEvent projectdata={homedata?.projectdata} />
      <br />
      <Footer footerdata={homedata?.footercontactdata} />
    </>
  );
};

export default Home;

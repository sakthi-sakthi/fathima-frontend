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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [homedata, setHomedata] = useState(null);
  const [mode, setMode] = useState("online");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/homepagee/sections`);
        localStorage.setItem("HomeData", JSON.stringify(response?.data?.data));
        setHomedata(response?.data?.data);
        if (mode === "offline") {
          setMode("online");
          toast.success("You are now online");
          setTimeout(() => toast.dismiss(), 2000);
        }
      } catch (error) {
        setMode("offline");
        let collection = localStorage.getItem("HomeData");
        setHomedata(JSON.parse(collection));
        if (mode === "online") {
          setMode("offline");
          toast.error("You are in offline mode");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [mode]);

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
          height="60"
          width="60"
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
      <ToastContainer />
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
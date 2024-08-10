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
      } catch (error) {
        setMode("offline");
        toast.error("You are in offline mode");
        let collection = localStorage.getItem("HomeData");
        setHomedata(JSON.parse(collection));
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    window.addEventListener("online", () => {
      setMode("online");
      toast.success("You are back online!", {
        autoClose: 3000,
      });
    });

    window.addEventListener("offline", () => {
      setMode("offline");
      toast.error("You are in offline mode");
    });

    return () => {
      window.removeEventListener("online", () => {});
      window.removeEventListener("offline", () => {});
    };
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
      {mode === "offline" && homedata === null ? (
        <div className="alert alert-danger" role="alert">
          No data available for offline mode.
        </div>
      ) : (
        <>
          <Slider sliderdata={homedata?.SlidesData} />
          <ScrollBar projectdata={homedata?.projectdata} />
          <AboutUs />
          <HomeBar />
          <OurChurch />
          <LatestEvent projectdata={homedata?.projectdata} />
          <br />
          <Footer footerdata={homedata?.footercontactdata} />
        </>
      )}
    </>
  );
};

export default Home;

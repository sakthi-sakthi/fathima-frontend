import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiUrl } from "./API/ApiUrl";
import Slider from "./Components/Slider";
import HomeBar from "./Components/HomeBar";
import AboutUs from "./Components/AboutUs";
import Header from "./layout/partials/Header";
import Footer from "./layout/partials/Footer";
import ScrollBar from "./Components/ScrollBar";
import LatestEvent from "./Components/LatestEvent";
import OurChurch from "./Components/OurChurch";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [homedata, setHomedata] = useState(null);
  const [mode, setMode] = useState(navigator.onLine ? "online" : "offline");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/homepagee/sections`);
        localStorage.setItem("HomeData", JSON.stringify(response?.data?.data));
        setHomedata(response?.data?.data);
        if (mode === "offline") {
          setMode("online");
          toast.success("You are now online");
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

  useEffect(() => {
    const handleOnline = () => {
      setMode("online");
      toast.success("You are now online");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    };

    const handleOffline = () => {
      setMode("offline");
      toast.error("You are in offline mode");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (mode === "offline") {
        event.preventDefault();
        event.returnValue = "You are offline. Reloading the page will erase all offline data. Are you sure you want to continue?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
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
          height="50"
          width="50"
          color="#012c6d"
          ariaLabel="Our Lady of Fatima Shrine"
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

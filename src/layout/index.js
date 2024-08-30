import React from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../API/ApiUrl";
import { useEffect, useState } from "react";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import { ThreeCircles } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const [Homedata, setHomedata] = useState(null);
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
          height="60"
          width="60"
          color="#012c6d"
          ariaLabel="Our Lady of Fatima Shrine"
        />
      </div>
    );
  }

  return (
    <>
     <ToastContainer />
      <Header menudata={Homedata?.headermenudata} />
      <div style={{ minHeight: "75vh", padding: "10px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;

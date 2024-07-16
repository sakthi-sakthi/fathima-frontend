import React from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../API/ApiUrl";
import { useEffect, useState } from "react";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import { ThreeCircles } from "react-loader-spinner";
const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const [Homedata, setHomedata] = useState(null);

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
      <Header menudata={Homedata?.headermenudata} />
      <div style={{ minHeight: "75vh", padding: "10px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;

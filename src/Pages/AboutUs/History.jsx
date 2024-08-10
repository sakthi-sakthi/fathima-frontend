import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ApiUrl } from '../../API/ApiUrl';

const History = () => {
  const location = useLocation();
  const url = location.pathname;
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [mode, setMode] = useState(navigator.onLine ? "online" : "offline");

  useEffect(() => {
    const path = {
      '/history': 1,
      '/sub-station-shrines': 2,
      '/parish-priest-list': 3,
      '/priest-from-parish': 4,
      '/sisters-from-parish': 5,
      '/golden-memorial': 31,
      '/golden-jubilee': 32
    };
    setId(path[url] ? path[url] : url);
  }, [url]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (mode === "online") {
          const response = await axios.get(`${ApiUrl}/get/Pages`);
          const newPages = response?.data?.pages;
          localStorage.setItem("HistoryData", JSON.stringify(newPages));
          setData(newPages);
        } else {
          const localData = localStorage.getItem("HistoryData");
          setData(localData ? JSON.parse(localData) : []);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    return <div className="text-center mt-5">loading...</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-5">
        <b>No Data Available</b>
      </div>
    );
  }

  const filterdata = data.filter((item) => item.id === id);

  return (
    <>
      <div className="container subpage">
        <div className="row">
          <div className="col-lg-12">
            {filterdata?.map((item) => (
              <div key={item.id}>
                <h2 className="heading text-center mb-4">{item.title}</h2>
                <div
                  style={{ textAlign: 'justify', color: 'black !important' }}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;

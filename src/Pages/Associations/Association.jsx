import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ApiUrl } from '../../API/ApiUrl';

const Association = () => {
  const location = useLocation();
  const url = location.pathname;
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const path = {
      '/parish-board': 19,
      '/treasurer': 20,
      '/mariyan-seani': 21,
      '/vincent-de-paul': 22,
      '/alter-boys-girls': 23,
      '/stpauls-youth': 24,
      '/shrine-authority': 25,
      '/choir': 26,
      '/flower-team': 27,
      '/teacher-association': 28,
      '/community-hall': 29,
      '/cemetery': 30
    };
    setId(path[url] ? path[url] : url);
  }, [url]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/Pages`);
        const newPages = response?.data?.pages;

        localStorage.setItem('Pages', JSON.stringify(newPages));

        setData(newPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                  style={{ textAlign: 'justify',color: 'black !important' }}
                  dangerouslySetInnerHTML={{
                    __html: `${item.content}`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Association;
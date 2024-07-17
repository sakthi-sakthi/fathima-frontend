import React from 'react'
import './css/LatestEvent.css'
import { Link } from 'react-router-dom'
const LatestEvent = ({ projectdata }) => {

  // Latest News Data Filter Function Start Here
  const newsData = projectdata?.filter(data => data.category_id === 3);


  // Upcoming Events Data Filter Function Start Here
  const eventData = projectdata?.filter(data => data.category_id === 4);




  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="section-titles mt-5">
              <h3 className="title">Latest News</h3>
              <br />
            </div>
            {newsData ? (
              newsData.length > 0 ? (
                <>
                  {newsData?.slice(0, 3)?.map((data, index) => (
                    <div className="card-media" key={data?.id}>
                      <div className="card-media-object-container">
                        <div
                          className="card-media-object"
                          style={{
                            backgroundImage: `url(${data?.media_url})`,
                          }}
                        />
                      </div>
                      <div className="card-media-body">
                        <div className="card-media-body-top">
                          <span className="subtle"><i className="fa fa-calendar" /> {data?.eventdate}</span>
                        </div>
                        <span className="card-media-body-heading">
                          <Link to={`/news?newsid=${data?.id}`}>
                            {data?.title}
                          </Link>
                        </span>
                        <div dangerouslySetInnerHTML={{ __html: data?.content }} className="card-media-body-text"  />
                        <Link to={`/news?newsid=${data?.id}`} className="read-more-btn"> Read More <i className="flaticon-next" /></Link>
                      </div>
                    </div>
                  ))}
                  {newsData.length >= 3 && (
                    <center><Link to="/news" className="view-more-btn">View More</Link></center>
                  )}
                </>
              ) : (
                <div style={{ color: "black" }}><b>No News available</b></div>
              )
            ) : (
              <div>Loading...</div>
            )}

          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="section-titles mt-5">
              <h3 className="title">Latest Events</h3>
              <br />
            </div>
            {eventData ? (
              eventData.length > 0 ? (
                <>
                  {eventData?.slice(0, 3)?.map((data) => (
                    <div className="card-media" key={data?.id}>
                      <div className="card-media-object-container">
                        <div
                          className="card-media-object"
                          style={{
                            backgroundImage: `url(${data?.media_url})`,
                          }}
                        />
                      </div>
                      <div className="card-media-body">
                        <div className="card-media-body-top">
                          <span className="subtle"><i className="fa fa-calendar" /> {data?.eventdate}</span>
                        </div>
                        <span className="card-media-body-heading">
                          <Link to={`/events?eventid=${data?.id}`}>
                            {data?.title}
                          </Link>
                        </span>
                        <div dangerouslySetInnerHTML={{ __html: data?.content }} className="card-media-body-text" />
                        <Link to={`/events?eventid=${data?.id}`} className="read-more-btn"> Read More <i className="flaticon-next" /></Link>
                      </div>
                    </div>
                  ))}
                  {eventData.length >= 3 && (
                    <center><Link to="/news" className="view-more-btn">View More</Link></center>
                  )}
                </>
              ) : (
                <div style={{ color: "black" }}><b>No Events available</b></div>
              )
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default LatestEvent

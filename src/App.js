import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MainLayout from "./layout";
import History from "./Pages/AboutUs/History";
import Members from "./Pages/Members/Members";
import Institution from "./Pages/Institutions/Institution";
import Convents from "./Pages/Convents/Convents";
import Association from "./Pages/Associations/Association";
import PhotoGallery from "./Pages/Gallery/Images";
import Video from "./Pages/Gallery/Videos";
import ContactUs from "./Pages/ContactUs/Contact";
import MassCalendar from "./Pages/Calendar/MassCalendar";
import MeetOurParish from "./Pages/Calendar/PriestMessage";
import AllNews from "./Pages/LatestNews/AllNews";
import AllEvents from "./Pages/LatestNews/AllEvents";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<MainLayout />}>
          {/* About Us Section Routing */}
          <Route path="history" element={<History />} />
          <Route path="sub-station-shrines" element={<History />} />
          <Route path="parish-priest-list" element={<History />} />
          <Route path="priest-from-parish" element={<History />} />
          <Route path="sisters-from-parish" element={<History />} />
          {/* For Members Section Routing */}
          <Route path="mass-regulations" element={<Members />} />
          <Route path="sunday-catechism" element={<Members />} />
          <Route path="anbiyam" element={<Members />} />
          <Route path="sacraments" element={<Members />} />
          {/* Institutions Section Routing */}
          <Route path="rc-boys-school" element={<Institution />} />
          <Route path="don-bosco-school" element={<Institution />} />
          <Route path="stanns-primary-eided" element={<Institution />} />
          <Route path="stanns-hrsec-aided" element={<Institution />} />
          <Route path="stanns-nursery-primary" element={<Institution />} />
          <Route path="stanns-cbse-school" element={<Institution />} />
          {/* Convents Section Routing */}
          <Route path="fsm-school-community" element={<Convents />} />
          <Route path="fsm-hospital-community" element={<Convents />} />
          <Route path="fihm" element={<Convents />} />
          {/* Association Section Routing */}
          <Route path="parish-board" element={<Association />} />
          <Route path="treasurer" element={<Association />} />
          <Route path="mariyan-seani" element={<Association />} />
          <Route path="vincent-de-paul" element={<Association />} />
          <Route path="alter-boys-girls" element={<Association />} />
          <Route path="stpauls-youth" element={<Association />} />
          <Route path="shrine-authority" element={<Association />} />
          <Route path="choir" element={<Association />} />
          <Route path="flower-team" element={<Association />} />
          <Route path="teacher-association" element={<Association />} />
          <Route path="community-hall" element={<Association />} />
          <Route path="cemetery" element={<Association />} />
          {/* Gallery Section Routing */}
          <Route path="gallery" element={<PhotoGallery />} />
          <Route path="videos" element={<Video />} />
          {/* Contact Us Section Routing */}
          <Route path="contactus" element={<ContactUs />} />
          {/* Mass Calender Section Routing */}
          <Route path="masstimings" element={<MassCalendar />} />
          {/* Parish Priest Message Section Routing */}
          <Route path="priest-message" element={<MeetOurParish />} />
          {/* Latest News Section Routing */}
          <Route path="news" element={<AllNews />} />
          {/* Latest Events Section Routing */}
          <Route path="events" element={<AllEvents />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import styled from "styled-components";
import axios from "axios";
import { ApiUrl } from "../../API/ApiUrl";

const StyledCalendarContainer = styled.div`
  max-width: 1500px;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
`;

const StyledCalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CalendarTitle = styled.h2`
  color: #333;
  text-align: center !important;
`;

const StyledCalendar = styled(Calendar)`
  font-size: 14px;

  .rbc-month-view {
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .rbc-header {
    background-color: #4285f4;
    color: #ffffff;
    font-weight: bold;
    padding: 10px;
    border-bottom: 2px solid #ffffff;
  }

  .rbc-day-bg {
    background-color: #f8f9fa;
  }

  .rbc-today {
    background-color: wheat;
    color: #ffffff;
  }

  .rbc-agenda-view {
    border-top: 2px solid #4285f4;
  }

  .rbc-agenda-date-cell,
  .rbc-agenda-time-cell {
    font-size: 16px;
    color: #333;
  }

  .rbc-agenda-event-cell {
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    background-color: #4285f4;
    color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;

    a {
      color: #ffffff;
      text-decoration: none;
    }

    &:hover {
      background-color: #3367d6;
    }
  }
`;

const MassCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${ApiUrl}/get/masstime`)
      .then((response) => {
        const formattedEvents = response.data.data
          .filter((event) => moment(event.startdate) >= moment().startOf("day"))
          .map((event) => ({
            start: new Date(event.startdate),
            end: new Date(event.startdate),
            title: `${moment(event.startdate).format("hh:mm")} - ${moment(
              event.startdate
            ).format("A")} ${event.first_friday ? " - Special Mass" : ""}`,
            first_friday: event.first_friday,
          }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);
  return (
    <>
      <StyledCalendarContainer>
        <StyledCalendarHeader>
          <CalendarTitle>Daily Mass Calendar</CalendarTitle>
        </StyledCalendarHeader>
        <StyledCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          style={{ height: 1000 }}
          defaultDate={new Date()}
          defaultView="month"
          views={["month", "week", "day", "agenda"]}
          showMultiDayTimes
          selectable
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.first_friday === 1 ? "#FFA500" : "#3174ad",
              color: "#fff",
            },
          })}
          dayLayoutAlgorithm="horizontal"
          eventOverlap
        />
      </StyledCalendarContainer>
    </>
  );
};

export default MassCalendar;

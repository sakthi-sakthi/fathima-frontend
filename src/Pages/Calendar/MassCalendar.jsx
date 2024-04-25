import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';

const StyledCalendarContainer = styled.div`
  max-width: 1500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #f5f5f5;
`;

const StyledCalendarHeader = styled.h2`
  color: #333;
  text-align: center;
  margin-right: 3rem;
`;

const StyledCalendar = styled(FullCalendar)`
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
    background-color: #4285f4;
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
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [processedSchedule, setProcessedSchedule] = useState([]);
    const handleEventClick = (info) => {
        const title = info.event.title;
        const eventData = processedSchedule.find((event) => event.title === title);
        if (eventData) {
            setSelectedEvent(eventData);
            setShowModal(true);
        } else {
            console.error(`Event data not found for ${title}`);
        }
    };
    const handleBookMass = () => {
        setShowModal(false);
    };
    const handleCancel = () => {
        setShowModal(false);
    };
    const processSchedule = () => {
        const massSchedule = {
            Sunday: ['06:00 AM', '08:00 AM', '06:30 PM'],
            Daily: ['06:00 AM'],
            Wednesday: ['06:00 AM', '06:30 PM'],
            Saturday: ['06:30 PM'],
            FirstFriday: ['06:30 PM']
        };

        const daysOfWeekMap = {
            Sunday: 0,
            Daily: [1, 2, 3, 4, 5, 6],
            Wednesday: 3,
            Saturday: 6,
            FirstFriday: 5
        };

        const processedSchedule = [];

        Object.entries(massSchedule).forEach(([day, times]) => {
            times.forEach(time => {
                const [hour, minute, period] = time.split(/:| /);
                const normalizedHour = period === 'PM' && hour !== '12' ? parseInt(hour) + 12 : parseInt(hour);
                const startTime = new Date();
                startTime.setHours(normalizedHour);
                startTime.setMinutes(parseInt(minute));
                startTime.setSeconds(0);
                const title = `${day}, ${hour}:${minute} ${period}`;
                processedSchedule.push({
                    title: title,
                    daysOfWeek: Array.isArray(daysOfWeekMap[day]) ? daysOfWeekMap[day] : [daysOfWeekMap[day]],
                    startTime: `${hour}:${minute}:00`,
                    location: 'Your Location',
                    additionalInfo: 'Additional Information',
                    allDay: true
                });
            });
        });

        setProcessedSchedule(processedSchedule);
    };


    useEffect(() => {
        processSchedule();
    }, []);

    return (
        <>
            <br />
            <StyledCalendarContainer>
                <StyledCalendarHeader>Mass Calendar</StyledCalendarHeader>
                <StyledCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    events={processedSchedule}
                    headerToolbar={{
                        start: 'prev,next today',
                        center: 'title',
                        end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                    }}
                    dayMaxEvents={true}
                    dayMaxEventRows={2}
                    eventClick={handleEventClick}
                    eventContent={(info) => <div className="event-tag">{info.event.title}</div>}
                    editable={true}
                    timeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    }}
                />

            </StyledCalendarContainer>
            <br />
            <Modal show={showModal} onHide={handleCancel} centered backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>{selectedEvent ? selectedEvent.title : 'Book Mass'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-end">
                        <Button
                            variant="primary"
                            onClick={handleBookMass}
                            style={{ backgroundColor: '#002147', color: 'white', border: 'none' }}
                        >
                            Book Mass
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                            variant="secondary"
                            onClick={handleCancel}
                            style={{ backgroundColor: '#dc3545', color: 'white', border: 'none' }}
                        >
                            Close
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    );
};

export default MassCalendar;

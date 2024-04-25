import React, { useEffect, useState } from 'react';
const UpcomeMassTime = () => {
    const [upcomingMass, setUpcomingMass] = useState('');

    useEffect(() => {
        const specialTimings = {
            Sunday: ['06:00', '08:00', '18:30'],
            Thursday: ['06:00', '18:30'],
            Friday: ['06:00', '18:30'],
            Saturday: ['06:00', '18:30']
        };

        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const firstFriday = findFirstFriday(firstDayOfMonth);
        const todayDate = new Date().toISOString().split('T')[0];

        const currentDay = getCurrentDay();
        const currentTime = getCurrentTime();

        let nextDay;
        if (currentDay === 'Saturday') {
            nextDay = 'Sunday';
        } else {
            const nextDayIndex = (new Date().getDay() + 1) % 7;
            nextDay = Object.keys(specialTimings)[nextDayIndex];
        }

        if (currentDay === 'Sunday') {
            const [firstMass, secondMass, thirdMass] = specialTimings[currentDay];
            if (currentTime <= firstMass) {
                setUpcomingMass(' Today at 6:00 AM');
            } else if (firstMass <= currentTime && currentTime <= secondMass) {
                setUpcomingMass(' Today at 8:00 AM');
            } else if (secondMass <= currentTime && currentTime <= thirdMass) {
                setUpcomingMass(' Today at 6:30 PM');
            } else {
                setUpcomingMass(` ${nextDay} 6:00 AM`);
            }
        } else if (currentDay === 'Thursday' || currentDay === 'Saturday') {
            const [firstMass, secondMass] = specialTimings[currentDay];
            if (firstMass >= currentTime) {
                setUpcomingMass(`Today at 6:00 AM`);
            } else if (firstMass <= currentTime && currentTime <= secondMass) {
                setUpcomingMass(`Today at 6:30 PM`);
            } else {
                setUpcomingMass(` ${nextDay} 6:00 AM`);
            }
        } else if (currentDay === 'Friday') {
            if (firstFriday === todayDate) {
                if (currentTime >= '06:00') {
                    setUpcomingMass(`Today at 6:30 PM`);
                } else {
                    setUpcomingMass(`Today at 6:00 AM`);
                }
            } else {
                setUpcomingMass(` ${nextDay} 6:00 AM`);
            }
        } else {
            if (currentTime <= '06:00') {
                setUpcomingMass(`Today at 6:00 AM`);
            } else {
                setUpcomingMass(` ${nextDay} 6:00 AM`);
            }
        }
    }, []);

    const findFirstFriday = (date) => {
        while (date.getDay() !== 5) {
            date.setDate(date.getDate() + 1);
        }
        return date.toISOString().split('T')[0];
    };

    const getCurrentDay = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date().getDay()];
    };

    const getCurrentTime = () => {
        const now = new Date();
        return now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    };
// console.log(upcomingMass);
    return (
        <div>
            {upcomingMass !== null ? (
                <h6 className="home-mass-date">Upcoming Mass Time: {upcomingMass}</h6>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpcomeMassTime;
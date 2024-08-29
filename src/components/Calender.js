import React, { useState } from 'react';
const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarCells = Array(firstDayOfMonth).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth}>&lt;</button>
        <span>
          {new Date(year, month).toLocaleString('default', { month: 'long' })} {year}
        </span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-body">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {calendarCells.map((day, index) => (
          <div key={index} className="calendar-day">
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

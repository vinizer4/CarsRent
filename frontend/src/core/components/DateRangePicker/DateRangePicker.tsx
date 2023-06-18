import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DateRangePicker: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  const handleCheckInDateChange = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      setCheckInDate(date[0]);
    } else {
      setCheckInDate(date);
    }
  };

  const handleCheckOutDateChange = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      setCheckOutDate(date[0]);
    } else {
      setCheckOutDate(date);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '3rem' }}>
      <div>
        <h3>Check-in</h3>
        <Calendar
          onChange={handleCheckInDateChange}
          value={checkInDate}
        />
      </div>
      <div>
        <h3>Check-out</h3>
        <Calendar
          onChange={handleCheckOutDateChange}
          value={checkOutDate}
          minDate={checkInDate}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
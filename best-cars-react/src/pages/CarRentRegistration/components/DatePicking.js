import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // стилі для календаря

export default function DatePicking({
  onChangeAction,
  dates,
  dateErrorText,
  blockedDates,
}) {
  function containBlockedDates() {
    const start = new Date(dates.startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(dates.end);
    end.setHours(0, 0, 0, 0);

    for (let blockedDate of blockedDates) {
      const blocked = new Date(blockedDate);
      blocked.setHours(0, 0, 0, 0);

      if (blocked <= end && blocked >= start) {
        return true;
      }
    }
    return false;
  }

  const isDateBlocked = (date) => {
    const selectedDate = new Date(date);

    selectedDate.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate)) {
      return false;
    }

    for (let blockedDate of blockedDates) {
      const blocked = new Date(blockedDate);
      blocked.setHours(0, 0, 0, 0);

      if (selectedDate.getTime() === blocked.getTime()) {
        return true;
      }
    }

    return false;
  };

  // Функція для налаштування заблокованих дат
  const filterBlockedDates = (date) => {
    return !isDateBlocked(date); // Якщо дата заблокована, то її не можна вибрати
  };

  return (
    <div id="date-picker">
      <h2>Час оренди*</h2>

      <div>
        <label htmlFor="startDate">Дата початку замовлення:</label>
        <br />
        <DatePicker
          selected={dates.startDate ? new Date(dates.startDate) : null}
          onChange={(date) =>
            onChangeAction({ target: { name: "startDate", value: date } })
          }
          minDate={new Date()} // Запобігає вибору дат в минулому
          filterDate={filterBlockedDates} // Фільтрує заблоковані дати
          name="startDate"
          dateFormat="yyyy-MM-dd"
        />
      </div>

      <div>
        <label htmlFor="endDate">Дата кінця замовлення:</label>
        <br />
        <DatePicker
          selected={dates.endDate ? new Date(dates.endDate) : null}
          onChange={(date) =>
            onChangeAction({ target: { name: "endDate", value: date } })
          }
          minDate={dates.startDate ? new Date(dates.startDate) : new Date()} // Кінець не може бути раніше початку
          filterDate={filterBlockedDates} // Фільтрує заблоковані дати
          name="endDate"
          dateFormat="yyyy-MM-dd"
        />
      </div>

      {dateErrorText && (
        <p className="error-text">
          <small>{dateErrorText}</small>
        </p>
      )}
    </div>
  );
}

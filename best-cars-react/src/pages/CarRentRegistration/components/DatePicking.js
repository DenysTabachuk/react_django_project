import React, { useState } from "react";

export default function DatePicking({ onChangeAction, dates }) {
  return (
    <div id="date-picker">
      <h2>Час оренди*</h2>

      <div>
        <label htmlFor="startDate">Дата початку замовлення:</label>
        <br />
        <input
          type="date"
          name="startDate"
          value={dates.startDate}
          onChange={onChangeAction}
          min={new Date().toISOString().split("T")[0]} // Запобігає вибору дат в минулому
        />
      </div>

      <div>
        <label htmlFor="endDate">Дата кінця замовлення:</label>
        <br />
        <input
          type="date"
          name="endDate"
          value={dates.endDate}
          onChange={onChangeAction}
          min={dates.startDate} // Кінець не може бути раніше початку
        />
      </div>
    </div>
  );
}

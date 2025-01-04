import React, { useState } from "react";
import DatePicker from "react-datepicker";


export default function DatePicking(){
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        showIcon
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    );
}
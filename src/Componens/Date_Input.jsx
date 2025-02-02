import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Date_Input = ({ year, month, day, onChange }) => {
    const selectedDate =
        year && month && day ? new Date(year, month - 1, day) : null;

    return (
        <DatePicker
            selected={selectedDate}
            onChange={onChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select day, month, and year"
            required
        />
    );
};

export default Date_Input;

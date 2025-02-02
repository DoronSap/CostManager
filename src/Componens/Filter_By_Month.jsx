import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Button } from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// filter expenses by month

const Filter_By_Month = ({ month, year, onMonthChange, onYearChange, onFilter }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs(`${year}-${month}-01`));

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const newMonth = date.format("MM");
        const newYear = date.format("YYYY");

        // Update selected month and year
        onMonthChange(newMonth);
        onYearChange(newYear);
    };

    const handleFilterClick = () => {
        onFilter();
    };

    return (
        <div>
            <h3>Filter Expenses by Month and Year</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    views={["year", "month"]}
                    label="Select Month and Year"
                    value={selectedDate}
                    onChange={handleDateChange}
                    textField={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button
                variant="contained"
                onClick={handleFilterClick}
                sx={{
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "8px",
                textTransform: "none",
                backgroundColor: "#b5bef1",
                "&:hover": {
                    backgroundColor: "#8894dd",
                },
            }}>
                Filter Expenses
            </Button>
        </div>
    );
};
export default Filter_By_Month;
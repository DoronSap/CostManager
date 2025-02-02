import React, { useState } from "react";
import Amount_Input from "./Amount_Input";
import Category_Select_Input from "./Category_Select_Input";
import { demo } from "../idb.js";
import Description_Input from "./Description_Input";
import Date_Input from "./Date_Input";
import { Box } from "@mui/material";
import Add_Expense_Button from "./Add_Expense_Button.jsx";

const Expense_Form = ({ onNewExpense }) => {
    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        description: "",
        day: 0,
        month: 0,
        year: 0,
    });

    // update the field in formData,when add/ delete expense the formData update immediately
    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value,
        });
    };


    const handleDateChange = (date) => {
        if (date) {
            const selectedMonth = date.getMonth() + 1;
            const selectedYear = date.getFullYear();
            const selectedDay = date.getDate();

            setFormData({
                ...formData,
                day: selectedDay,
                month: selectedMonth,
                year: selectedYear,
            });
        }
    };

    // when submit new expense, trying to add new expense to the formData
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await demo.addCost(formData);
            onNewExpense(); // Notify the parent to refresh the expense list
            setFormData({
                amount: "",
                category: "",
                description: "",
                day: 0,
                month: 0,
                year: 0,
            });
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <Box display="block" mb={2} mt={1}>
                <Amount_Input value={formData.amount} onChange={handleInputChange("amount")} />
            </Box>
            <Box display="block" mb={2}>
                <Category_Select_Input value={formData.category} onChange={handleInputChange("category")} />
            </Box>
            <Box display="block" mb={2}>
                <Description_Input value={formData.description} onChange={handleInputChange("description")} />
            </Box>
            <Box display="block" mb={2}>
                <Date_Input year={formData.year} month={formData.month} day={formData.day} onChange={handleDateChange} />
            </Box>
            <Add_Expense_Button type="submit">Add Expense</Add_Expense_Button>
        </form>
    );
};

export default Expense_Form;



import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Category_Select_Input = ({ value, onChange }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
                labelId="category-label"
                id="category"
                value={value}
                onChange={onChange}
                variant="filled"
                required
            >
                <MenuItem value="food">FOOD</MenuItem>
                <MenuItem value="cloth">CLOTH</MenuItem>
                <MenuItem value="car">CAR</MenuItem>
                <MenuItem value="other">OTHER</MenuItem>
                
            </Select>
        </FormControl>
    );
};

export default Category_Select_Input;

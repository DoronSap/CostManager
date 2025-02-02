import React from "react";
import { TextField } from "@mui/material";

const Amount_Input = ({ value, onChange }) => {
    return (
        <TextField
            id="amount"
            label="Amount"
            value={value}
            onChange={onChange}
            variant="outlined"
            required
        />
    );
};

export default Amount_Input;




import React from "react";
import { TextField } from "@mui/material";

const Description_Input = ({ value, onChange }) => {
    return (
        <TextField
            id="description"
            label="Description"
            value={value}
            onChange={onChange}
            variant="outlined"
            required
        />
    );
};

export default Description_Input;

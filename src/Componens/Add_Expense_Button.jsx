import React from "react";
import { Button, Box } from "@mui/material";

// submit button on the add expense form, after press new expense added
const Add_Expense_Button = ({ handleClick }) => {
    return (
        <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
                type="submit"
                variant="contained"
                onClick={handleClick}
                sx={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    textTransform: "none",
                    backgroundColor: "#b5bef1", // Custom background color
                    "&:hover": {
                        backgroundColor: "#8894dd", // Darker shade on hover
                    },
                }}
            >
                Add Expense
            </Button>
        </Box>
    );
};
export default Add_Expense_Button;

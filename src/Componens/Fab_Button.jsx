import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const Fab_Button = ({ handleOpen }) => {
    return (
        <Fab
            variant="extended"
            aria-label="add expense"
            onClick={handleOpen}

            sx={{
                backgroundColor: "#b5bef1",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                    backgroundColor: "#8894dd",
                },
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                padding: "0 16px",
                height: "40px",
                display: "flex",
                alignItems: "center",
            }}
        >
            <AddIcon sx={{mr: 1}} />
            ADD Expense
        </Fab>
    );
};

export default Fab_Button;

// App.jsx
import React, { useState } from "react";
import Expenses_List from "./Componens/Expenses_List";
import Fab_Button from "./Componens/Fab_Button";
import Add_Expenses_Dialog from "./Componens/Add_Expenses_Dialog";
import { Box, Typography } from "@mui/material";
import '@fontsource/rochester';

const App = () => {
    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = useState(false);
    
    const handleRefresh = () => setRefresh((prev) => !prev);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    document.body.style.backgroundColor = "#d7efef";

    return (
        <div>
            {/* Title and FAB */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 2,
                    gap: 2, }}>

                {/* Title */}
                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        fontWeight: "bold",
                        color: "#8894dd",
                        fontFamily: "'Rochester', cursive",}}>
                    Cost Manager:
                </Typography>

                {/*fab button to add new expense*/}
                <Fab_Button handleOpen={handleOpen}/>
            </Box>

            {/* Expense List and Dialog */}
            <Expenses_List refresh={refresh}/> {}
            <Add_Expenses_Dialog open={open} handleClose={handleClose} handleRefresh={handleRefresh}/>
        </div>
    ); // end return
}; // end App

export default App;

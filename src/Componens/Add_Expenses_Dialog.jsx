// Add_Expenses_Dialog.jsx
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent } from "@mui/material";
import Expense_Form from "./Expense_Form.jsx";
import '@fontsource/League-Script';


// the dialog that open after click on add expense FAB

const Add_Expenses_Dialog = ({ open, handleClose, handleRefresh }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            slotProps={{
                paper: {
                    style: {
                        backgroundColor: "#d7efef",
                        color: "#b5bef1",
                        width: "530px",
                        height: "480px",
                        maxWidth: "none",
                        maxHeight: "none",
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    color: "#8894dd",
                    fontSize: "60px",
                    textAlign: "center",
                    fontFamily: "'League Script', cursive",
                }}
            >
                New Expense
            </DialogTitle>

            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2, // Spacing between field
                    width: "400px", // Control dialog width
                }}
            >
                <Expense_Form
                    onNewExpense={() => {
                        handleRefresh(); // Trigger a refresh
                        handleClose(); // Close the dialog
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};

export default Add_Expenses_Dialog;

import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

// show the expenses list as mui accordion

const Expenses_Accordion = ({ expenses, onDelete }) => {
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState(null);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
        setSelected(isExpanded ? panel : null);
    };

    const sortedExpenses = [...expenses].sort((a, b) => {
        const dateA = new Date(a.year, a.month - 1, a.day);
        const dateB = new Date(b.year, b.month - 1, b.day);
        return dateB - dateA;
    });

    // Open the dialog yes/no delete when delete icon is clicked
    const handleDeleteClick = (expense) => {
        setExpenseToDelete(expense);
        setOpenDialog(true);
    };

    //  if press yes Call the onDelete function passed from parent to delete the expense
    const handleConfirmDelete = () => {
        if (expenseToDelete) {
            onDelete(expenseToDelete.id);
        }
        setOpenDialog(false); // Close the dialog after confirmation
        setExpenseToDelete(null);
    };

    // if press cancel, close the dialog without delete
    const handleCancelDelete = () => {
        setOpenDialog(false);
        setExpenseToDelete(null);
    };

    return (
        <div>
            {sortedExpenses.map((expense) => (
                <Accordion
                    key={expense.id}
                    expanded={expanded === `panel-${expense.id}`}
                    onChange={handleChange(`panel-${expense.id}`)}
                    sx={{
                        backgroundColor: selected === `panel-${expense.id}` ? '#c9ceec' : 'inherit',
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`expense-content-${expense.id}`}
                        id={`expense-header-${expense.id}`}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                        >
                            <Typography fontWeight="fontWeightBold">
                                {expense.amount} NIS
                            </Typography>
                            <Typography>
                                {expense.day}/{expense.month}/{expense.year}
                            </Typography>
                            <div onClick={() => handleDeleteClick(expense)} style={{ cursor: 'pointer', color: '#e8bbb2' }}>
                                <DeleteIcon />
                            </div>
                        </Box>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography><strong>Amount:</strong> {expense.amount}nis</Typography>
                        <Typography><strong>Date:</strong> {expense.month}/{expense.year}</Typography>
                        <Typography><strong>Description:</strong> {expense.description}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}

            {/*  Dialog for confirming deletion, show after press on the delete icon*/}
            <Dialog open={openDialog} onClose={handleCancelDelete}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this expense?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        No
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Expenses_Accordion;

import React, { useEffect, useState } from "react";
import { demo } from "../idb.js";
import ExpensesAccordion from "./Expenses_Accordion";
import FilterForm from "./Filter_By_Month.jsx";
import ExpenseChart from "./Expenses_Pie_Chart.jsx";
import { Container, Box, Button } from "@mui/material";



const Expenses_List = ({ refresh }) => {
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [chartData, setChartData] = useState([["Category", "Amount"]]);
    const [showAllExpenses, setShowAllExpenses] = useState(false);

    useEffect(() => {
        const fetchAllExpenses = async () => {
            try {
                const data = await demo.readAllExpenses();
                setExpenses(data);
                setFilteredExpenses(data);
                recalculateChartData(data);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchAllExpenses().catch((error) => console.error("Error in fetchAllExpenses:", error));
    }, [refresh]);


    const recalculateChartData = (expensesList) => {
        const categoryTotals = expensesList.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
            return acc;
        }, {});

        const chartDataArray = [["Category", "Amount"]];
        for (const [category, amount] of Object.entries(categoryTotals)) {
            chartDataArray.push([category, amount]);
        }
        setChartData(chartDataArray);
    };

    useEffect(() => {
        recalculateChartData(filteredExpenses.length > 0 ? filteredExpenses : expenses);
    }, [expenses, filteredExpenses]);

    const handleFilterExpenses = async () => {
        try {
            const filtered = await demo.readExpensesByMonth(month, year);
            setFilteredExpenses(filtered);
            setShowAllExpenses(filtered.length === 0);
            recalculateChartData(filtered);
        } catch (error) {
            console.error("Error fetching filtered expenses:", error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await demo.removeCost(itemId);
            setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== itemId));
            setFilteredExpenses((prevFiltered) =>
                prevFiltered.filter((expense) => expense.id !== itemId)
            );
            recalculateChartData(filteredExpenses.filter((expense) => expense.id !== itemId));
        } catch (error) {
            console.error("Failed to remove item:", error);
        }
    };

    const handleShowAllExpenses = () => {
        setShowAllExpenses(false);
        setFilteredExpenses(expenses);
        recalculateChartData(expenses);
    };

    return (
        <Container>
            <h2>Expense List</h2>

            <FilterForm
                month={month}
                year={year}
                onMonthChange={setMonth}
                onYearChange={setYear}
                onFilter={handleFilterExpenses}
            />


            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={5}>
                <Box flex={3} minWidth="500px">

                    {/* Expenses List, if there is expenses in the chosen month -> show them, if not show message */}
                    {filteredExpenses.length > 0 ? (
                        <ExpensesAccordion expenses={filteredExpenses} onDelete={handleRemoveItem} />
                    ) : null}

                    {filteredExpenses.length === 0 && showAllExpenses && <p>No expenses in this month</p>}

                    {!showAllExpenses && month === "" && filteredExpenses.length < 1 ? (
                        <ExpensesAccordion expenses={expenses} onDelete={handleRemoveItem} />
                    ) : null}

                    <Button
                        onClick={handleShowAllExpenses}
                        variant="contained"
                        sx={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            borderRadius: "8px",
                            textTransform: "none",
                            backgroundColor: "#b5bef1",
                            "&:hover": {
                                backgroundColor: "#8894dd",
                            },
                        }}
                    >
                        Show All Expenses
                    </Button>
                </Box>

                <Box flex={2} minWidth="600px">
                    {filteredExpenses.length > 0 && chartData.length > 1 && <ExpenseChart chartData={chartData} />}
                </Box>
            </Box>
        </Container>
    );
};

export default Expenses_List;

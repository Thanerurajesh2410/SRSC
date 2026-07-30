import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Typography,
} from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import ExpenseDialog from "../components/ExpenseDialog";
import ExpenseTable from "../components/ExpenseTable";

import { useExpenses } from "../hooks/useExpenses";
import { useDeleteExpense } from "../hooks/useExpenseMutations";

import type { Expense } from "../../types";

export default function ExpensesPage() {
    const { data, isLoading, isError } = useExpenses();

    const deleteExpense = useDeleteExpense();

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedExpense, setSelectedExpense] =
        useState<Expense | null>(null);

    const handleAdd = () => {
        setSelectedExpense(null);
        setDialogOpen(true);
    };

    const handleEdit = (expense: Expense) => {
        setSelectedExpense(expense);
        setDialogOpen(true);
    };

    const handleView = (expense: Expense) => {
        console.log("View Expense", expense);
    };

    const handleDelete = async (expense: Expense) => {
        const confirmed = window.confirm(
            `Delete "${expense.title}"?`
        );

        if (!confirmed) return;

        try {
            await deleteExpense.mutateAsync(expense.id);
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 6,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (isError || !data) {
        return (
            <Alert severity="error">
                Unable to load expenses.
            </Alert>
        );
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    Expense Management
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddOutlinedIcon />}
                    onClick={handleAdd}
                >
                    Add Expense
                </Button>
            </Box>

            <ExpenseTable
                expenses={data.expenses}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ExpenseDialog
                open={dialogOpen}
                expense={selectedExpense}
                onClose={() => {
                    setDialogOpen(false);
                    setSelectedExpense(null);
                }}
            />
        </>
    );
}
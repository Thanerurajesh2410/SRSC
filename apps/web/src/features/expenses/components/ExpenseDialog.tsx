import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@mui/material";

import ExpenseForm from "./ExpenseForm";

import {
    useCreateExpense,
    useUpdateExpense,
} from "../hooks/useExpenseMutations";

import type {
    Expense,
    ExpenseFormData,
} from "../../types";

interface ExpenseDialogProps {
    open: boolean;
    expense?: Expense | null;
    onClose: () => void;
}

export default function ExpenseDialog({
    open,
    expense,
    onClose,
}: ExpenseDialogProps) {
    const createExpense = useCreateExpense();
    const updateExpense = useUpdateExpense();

    const handleSubmit = async (
        data: ExpenseFormData
    ) => {
        try {
            if (expense) {
                await updateExpense.mutateAsync({
                    id: expense.id,
                    data,
                });
            } else {
                await createExpense.mutateAsync(data);
            }

            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                {expense
                    ? "Edit Expense"
                    : "Add Expense"}
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <ExpenseForm
                    defaultValues={
                        expense
                            ? {
                                  title: expense.title,
                                  category: expense.category,
                                  amount: expense.amount,
                                  paymentMode:
                                      expense.paymentMode,
                                  expenseDate:
                                      expense.expenseDate,
                                  paidTo: expense.paidTo,
                                  remarks:
                                      expense.remarks ?? "",
                              }
                            : undefined
                    }
                    loading={
                        createExpense.isPending ||
                        updateExpense.isPending
                    }
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                />
            </DialogContent>
        </Dialog>
    );
}
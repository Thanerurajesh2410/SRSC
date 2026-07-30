import { useMutation, useQueryClient } from "@tanstack/react-query";

import expenseService from "../../expenses/api/expense.service";
import type { ExpenseFormData } from "../../types";

export function useCreateExpense() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ExpenseFormData) =>
            expenseService.createExpense(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["expenses"],
            });
        },
    });
}

export function useUpdateExpense() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: ExpenseFormData;
        }) => expenseService.updateExpense(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["expenses"],
            });

            queryClient.invalidateQueries({
                queryKey: ["expense", variables.id],
            });
        },
    });
}

export function useDeleteExpense() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            expenseService.deleteExpense(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["expenses"],
            });
        },
    });
}
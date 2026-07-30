import { useQuery } from "@tanstack/react-query";
import expenseService from "../api/expense.service";

export function useExpenses() {
    return useQuery({
        queryKey: ["expenses"],
        queryFn: () => expenseService.getExpenses(),
        staleTime: 5 * 60 * 1000,
    });
}
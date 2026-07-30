import api from "../../../services/api";

import type {
    Expense,
    ExpenseFormData,
    ExpenseResponse,
} from "../../types";

class ExpenseService {
    async getExpenses(): Promise<ExpenseResponse> {
        const response = await api.get("/expenses");
        const rawData = response.data.data;
        const expenses = Array.isArray(rawData) ? rawData : (rawData?.expenses || []);
        const totalExpenses = expenses.reduce(
            (sum: number, item: any) => sum + Number(item.amount || 0),
            0
        );

        return {
            expenses,
            summary: {
                totalExpenses,
                monthlyExpenses: totalExpenses,
                totalTransactions: expenses.length,
            },
        };
    }

    async getExpenseById(id: string): Promise<Expense> {
        const response = await api.get(`/expenses/${id}`);
        return response.data.data;
    }

    async createExpense(
        data: ExpenseFormData
    ): Promise<Expense> {
        const response = await api.post(
            "/expenses",
            data
        );

        return response.data.data;
    }

    async updateExpense(
        id: string,
        data: ExpenseFormData
    ): Promise<Expense> {
        const response = await api.put(
            `/expenses/${id}`,
            data
        );

        return response.data.data;
    }

    async deleteExpense(id: string): Promise<void> {
        await api.delete(`/expenses/${id}`);
    }
}

const expenseService = new ExpenseService();

export default expenseService;
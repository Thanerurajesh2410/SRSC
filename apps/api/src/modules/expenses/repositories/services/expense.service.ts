import expenseRepository from "../../repositories/expense.repository";

import { Prisma } from "@prisma/client";

class ExpenseService {
    async getAllExpenses() {
        const expenses = await expenseRepository.findAll();

        const now = new Date();

        const firstDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        );

        const lastDay = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0,
            23,
            59,
            59
        );

        const totalExpenses =
            await expenseRepository.getTotalExpenses();

        const monthlyExpenses =
            await expenseRepository.getMonthlyExpenses(
                firstDay,
                lastDay
            );

        const totalTransactions =
            await expenseRepository.getCount();

        return {
            expenses,
            summary: {
                totalExpenses,
                monthlyExpenses,
                totalTransactions,
            },
        };
    }

    async getExpenseById(id: string) {
        const expense =
            await expenseRepository.findById(id);

        if (!expense) {
            throw new Error("Expense not found");
        }

        return expense;
    }

    async createExpense(
        data: Prisma.ExpenseCreateInput
    ) {
        const year = new Date().getFullYear();

        const count =
            await expenseRepository.getCount();

        const expenseNo = `EXP-${year}-${String(
            count + 1
        ).padStart(4, "0")}`;

        return expenseRepository.create({
            ...data,
            expenseNo,
        });
    }

    async updateExpense(
        id: string,
        data: Prisma.ExpenseUpdateInput
    ) {
        await this.getExpenseById(id);

        return expenseRepository.update(id, data);
    }

    async deleteExpense(id: string) {
        await this.getExpenseById(id);

        return expenseRepository.delete(id);
    }
}

export default new ExpenseService();
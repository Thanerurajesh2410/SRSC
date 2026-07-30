import { Request, Response, NextFunction } from "express";

import expenseService from "../services/expense.service";

class ExpenseController {
    async getAllExpenses(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result =
                await expenseService.getAllExpenses();

            return res.status(200).json({
                success: true,
                message: "Expenses fetched successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async getExpenseById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result =
                await expenseService.getExpenseById(
                    req.params.id
                );

            return res.status(200).json({
                success: true,
                message: "Expense fetched successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async createExpense(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result =
                await expenseService.createExpense(
                    req.body
                );

            return res.status(201).json({
                success: true,
                message: "Expense created successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateExpense(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result =
                await expenseService.updateExpense(
                    req.params.id,
                    req.body
                );

            return res.status(200).json({
                success: true,
                message: "Expense updated successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteExpense(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            await expenseService.deleteExpense(
                req.params.id
            );

            return res.status(200).json({
                success: true,
                message: "Expense deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new ExpenseController();
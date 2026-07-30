import { Router } from "express";

import expenseController from "../controllers/expense.controller";

import { validateRequest } from "../../../middleware/validateRequest";

import {
    createExpenseSchema,
    updateExpenseSchema,
} from "../validators/expense.validator";

const router = Router();

router.get("/", expenseController.getAllExpenses);

router.get("/:id", expenseController.getExpenseById);

router.post(
    "/",
    validateRequest(createExpenseSchema),
    expenseController.createExpense
);

router.put(
    "/:id",
    validateRequest(updateExpenseSchema),
    expenseController.updateExpense
);

router.delete("/:id", expenseController.deleteExpense);

export default router;
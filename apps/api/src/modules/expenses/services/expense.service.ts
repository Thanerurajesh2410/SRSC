import expenseRepository from "../repositories/expense.repository";
import { Prisma } from "@prisma/client";
import { AppError } from "../../../errors/AppError";

class ExpenseService {
  async getAllExpenses() {
    return expenseRepository.findAll();
  }

  async getExpenseById(id: string) {
    const expense = await expenseRepository.findById(id);
    if (!expense) {
      throw new AppError("Expense not found", 404);
    }
    return expense;
  }

  async createExpense(data: {
    title: string;
    category: any;
    amount: number;
    paymentMode: any;
    expenseDate: Date;
    paidTo: string;
    remarks?: string;
    createdById?: string;
  }) {
    const year = new Date(data.expenseDate || Date.now()).getFullYear();
    const count = await expenseRepository.getCount();
    const expenseNo = `EXP-${year}-${String(count + 1).padStart(6, "0")}`;

    const createData: Prisma.ExpenseCreateInput = {
      expenseNo,
      title: data.title,
      category: data.category,
      amount: data.amount,
      paymentMode: data.paymentMode,
      expenseDate: new Date(data.expenseDate),
      paidTo: data.paidTo,
      remarks: data.remarks,
      createdBy: data.createdById ? { connect: { id: data.createdById } } : undefined,
    };

    return expenseRepository.create(createData);
  }

  async updateExpense(
    id: string,
    data: Partial<{
      title: string;
      category: any;
      amount: number;
      paymentMode: any;
      expenseDate: Date;
      paidTo: string;
      remarks?: string;
    }>
  ) {
    await this.getExpenseById(id);

    const updateData: Prisma.ExpenseUpdateInput = {
      ...(data.title && { title: data.title }),
      ...(data.category && { category: data.category }),
      ...(data.amount !== undefined && { amount: data.amount }),
      ...(data.paymentMode && { paymentMode: data.paymentMode }),
      ...(data.expenseDate && { expenseDate: new Date(data.expenseDate) }),
      ...(data.paidTo && { paidTo: data.paidTo }),
      ...(data.remarks !== undefined && { remarks: data.remarks }),
    };

    return expenseRepository.update(id, updateData);
  }

  async deleteExpense(id: string) {
    await this.getExpenseById(id);
    return expenseRepository.delete(id);
  }
}

export default new ExpenseService();

import { prisma } from "../../config/database";
import { Prisma } from "@prisma/client";

export class ReportService {
  async getDonationReport(filters: {
    startDate?: string;
    endDate?: string;
    category?: any;
    paymentMode?: any;
  }) {
    const where: Prisma.DonationWhereInput = {};

    if (filters.startDate || filters.endDate) {
      where.donationDate = {
        ...(filters.startDate && { gte: new Date(filters.startDate) }),
        ...(filters.endDate && { lte: new Date(filters.endDate) }),
      };
    }

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.paymentMode) {
      where.paymentMode = filters.paymentMode;
    }

    const donations = await prisma.donation.findMany({
      where,
      orderBy: { donationDate: "desc" },
    });

    const totalAmount = donations.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    return {
      donations,
      count: donations.length,
      totalAmount,
    };
  }

  async getExpenseReport(filters: {
    startDate?: string;
    endDate?: string;
    category?: any;
    paymentMode?: any;
  }) {
    const where: Prisma.ExpenseWhereInput = {};

    if (filters.startDate || filters.endDate) {
      where.expenseDate = {
        ...(filters.startDate && { gte: new Date(filters.startDate) }),
        ...(filters.endDate && { lte: new Date(filters.endDate) }),
      };
    }

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.paymentMode) {
      where.paymentMode = filters.paymentMode;
    }

    const expenses = await prisma.expense.findMany({
      where,
      orderBy: { expenseDate: "desc" },
    });

    const totalAmount = expenses.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    return {
      expenses,
      count: expenses.length,
      totalAmount,
    };
  }

  async getCashBook(filters: { startDate?: string; endDate?: string }) {
    const donationWhere: Prisma.DonationWhereInput = {};
    const expenseWhere: Prisma.ExpenseWhereInput = {};

    if (filters.startDate || filters.endDate) {
      const dateFilter = {
        ...(filters.startDate && { gte: new Date(filters.startDate) }),
        ...(filters.endDate && { lte: new Date(filters.endDate) }),
      };
      donationWhere.donationDate = dateFilter;
      expenseWhere.expenseDate = dateFilter;
    }

    const donations = await prisma.donation.findMany({
      where: donationWhere,
      select: {
        id: true,
        receiptNo: true,
        donorName: true,
        amount: true,
        category: true,
        paymentMode: true,
        donationDate: true,
      },
      orderBy: { donationDate: "desc" },
    });

    const expenses = await prisma.expense.findMany({
      where: expenseWhere,
      select: {
        id: true,
        expenseNo: true,
        title: true,
        amount: true,
        category: true,
        paymentMode: true,
        expenseDate: true,
        paidTo: true,
      },
      orderBy: { expenseDate: "desc" },
    });

    const totalIncome = donations.reduce(
      (sum, d) => sum + Number(d.amount),
      0
    );
    const totalExpense = expenses.reduce(
      (sum, e) => sum + Number(e.amount),
      0
    );

    return {
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      donations,
      expenses,
    };
  }

  async getFinancialSummary() {
    const totalDonationsAgg = await prisma.donation.aggregate({
      _sum: { amount: true },
      _count: { _all: true },
    });

    const totalExpensesAgg = await prisma.expense.aggregate({
      _sum: { amount: true },
      _count: { _all: true },
    });

    const totalIncome = Number(totalDonationsAgg._sum.amount ?? 0);
    const totalExpense = Number(totalExpensesAgg._sum.amount ?? 0);

    return {
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      totalDonationsCount: totalDonationsAgg._count._all,
      totalExpensesCount: totalExpensesAgg._count._all,
    };
  }
}

export default new ReportService();

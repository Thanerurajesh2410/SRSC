import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

class ExpenseRepository {
    async findAll() {
        return prisma.expense.findMany({
            orderBy: {
                expenseDate: "desc",
            },
        });
    }

    async findById(id: string) {
        return prisma.expense.findUnique({
            where: {
                id,
            },
        });
    }

    async create(data: Prisma.ExpenseCreateInput) {
        return prisma.expense.create({
            data,
        });
    }

    async update(
        id: string,
        data: Prisma.ExpenseUpdateInput
    ) {
        return prisma.expense.update({
            where: {
                id,
            },
            data,
        });
    }

    async delete(id: string) {
        return prisma.expense.delete({
            where: {
                id,
            },
        });
    }

    async getTotalExpenses() {
        const result = await prisma.expense.aggregate({
            _sum: {
                amount: true,
            },
        });

        return result._sum.amount ?? 0;
    }

    async getMonthlyExpenses(
        startDate: Date,
        endDate: Date
    ) {
        const result = await prisma.expense.aggregate({
            where: {
                expenseDate: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            _sum: {
                amount: true,
            },
        });

        return result._sum.amount ?? 0;
    }

    async getCount() {
        return prisma.expense.count();
    }
}

export default new ExpenseRepository();
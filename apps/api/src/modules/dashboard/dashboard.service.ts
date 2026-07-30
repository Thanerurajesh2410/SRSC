import { prisma } from "../../config/database";

import type {
    DashboardResponse,
    MonthlyDonation,
    RecentDonation,
    RecentExpense,
} from "./dashboard.types";

interface TopDonor {
    donorName: string;
    totalAmount: number;
}

export class DashboardService {
    async getDashboard(): Promise<DashboardResponse> {
        // Total Donations
        const donationAggregate = await prisma.donation.aggregate({
            _sum: {
                amount: true,
            },
        });

        const totalDonations = Number(
            donationAggregate._sum.amount ?? 0
        );

        // Today's Donations
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const todayDonationsAggregate = await prisma.donation.aggregate({
            where: {
                donationDate: {
                    gte: todayStart,
                    lte: todayEnd,
                },
            },
            _sum: {
                amount: true,
            },
        });

        const todayDonations = Number(
            todayDonationsAggregate._sum.amount ?? 0
        );

        // Total Expenses
        const expenseAggregate = await prisma.expense.aggregate({
            _sum: {
                amount: true,
            },
        });

        const totalExpenses = Number(
            expenseAggregate._sum.amount ?? 0
        );

        // Today's Expenses
        const todayExpensesAggregate = await prisma.expense.aggregate({
            where: {
                expenseDate: {
                    gte: todayStart,
                    lte: todayEnd,
                },
            },
            _sum: {
                amount: true,
            },
        });

        const todayExpenses = Number(
            todayExpensesAggregate._sum.amount ?? 0
        );

        // Total Donors
        const donorGroups = await prisma.donation.groupBy({
            by: ["donorName"],
        });

        const totalDonors = donorGroups.length;

        // Recent Donations
        const recentDonationData = await prisma.donation.findMany({
            take: 5,
            orderBy: {
                donationDate: "desc",
            },
            select: {
                id: true,
                donorName: true,
                amount: true,
                paymentMode: true,
                donationDate: true,
            },
        });

        const recentDonations: RecentDonation[] = recentDonationData.map(
            (donation) => ({
                id: donation.id,
                donorName: donation.donorName,
                amount: Number(donation.amount),
                paymentMode: donation.paymentMode,
                donationDate: donation.donationDate,
            })
        );

        // Recent Expenses
        const recentExpenseData = await prisma.expense.findMany({
            take: 5,
            orderBy: {
                expenseDate: "desc",
            },
            select: {
                id: true,
                title: true,
                category: true,
                amount: true,
                paidTo: true,
                expenseDate: true,
            },
        });

        const recentExpenses: RecentExpense[] = recentExpenseData.map(
            (expense) => ({
                id: expense.id,
                title: expense.title,
                category: expense.category,
                amount: Number(expense.amount),
                paidTo: expense.paidTo,
                expenseDate: expense.expenseDate,
            })
        );

        // Top Donors
        const donorTotals = await prisma.donation.groupBy({
            by: ["donorName"],
            _sum: {
                amount: true,
            },
            orderBy: {
                _sum: {
                    amount: "desc",
                },
            },
            take: 5,
        });

        const topDonors: TopDonor[] = donorTotals.map((donor) => ({
            donorName: donor.donorName,
            totalAmount: Number(donor._sum.amount ?? 0),
        }));

        // Monthly Donations
        const donations = await prisma.donation.findMany({
            select: {
                donationDate: true,
                amount: true,
            },
            orderBy: {
                donationDate: "asc",
            },
        });

        const monthlyMap = new Map<string, number>();

        for (const donation of donations) {
            const month = donation.donationDate.toLocaleString("default", {
                month: "short",
            });

            monthlyMap.set(
                month,
                (monthlyMap.get(month) ?? 0) + Number(donation.amount)
            );
        }

        const monthlyDonations: MonthlyDonation[] = Array.from(
            monthlyMap.entries()
        ).map(([month, amount]) => ({
            month,
            amount,
        }));

        return {
            summary: {
                totalDonations,
                todayDonations,
                totalExpenses,
                todayExpenses,
                currentBalance: totalDonations - totalExpenses,
                totalDonors,
            },
            monthlyDonations,
            recentDonations,
            recentExpenses,
            topDonors,
        };
    }
}

export default new DashboardService();
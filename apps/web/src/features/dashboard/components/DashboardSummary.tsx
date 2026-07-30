import PaidIcon from "@mui/icons-material/Paid";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PeopleIcon from "@mui/icons-material/People";
import { Grid } from "@mui/material";

import DashboardCard from "./DashboardCard";
import type { DashboardSummary as DashboardSummaryType } from "../types";

interface DashboardSummaryProps {
    summary: DashboardSummaryType;
}

export default function DashboardSummary({
    summary,
}: DashboardSummaryProps) {
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <DashboardCard
                    title="Total Donations"
                    value={`₹${summary.totalDonations.toLocaleString("en-IN")}`}
                    icon={<PaidIcon />}
                    iconBackgroundColor="success.light"
                    iconColor="success.main"
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <DashboardCard
                    title="Total Expenses"
                    value={`₹${summary.totalExpenses.toLocaleString("en-IN")}`}
                    icon={<MoneyOffIcon />}
                    iconBackgroundColor="error.light"
                    iconColor="error.main"
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <DashboardCard
                    title="Current Balance"
                    value={`₹${summary.currentBalance.toLocaleString("en-IN")}`}
                    icon={<AccountBalanceWalletIcon />}
                    iconBackgroundColor="info.light"
                    iconColor="info.main"
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <DashboardCard
                    title="Total Donors"
                    value={summary.totalDonors}
                    icon={<PeopleIcon />}
                    iconBackgroundColor="warning.light"
                    iconColor="warning.main"
                />
            </Grid>
        </Grid>
    );
}
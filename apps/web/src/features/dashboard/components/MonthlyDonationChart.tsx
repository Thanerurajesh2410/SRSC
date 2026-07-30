import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Typography,
} from "@mui/material";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface MonthlyDonation {
    month: string;
    amount: number;
}

interface MonthlyDonationChartProps {
    data: MonthlyDonation[];
}

export default function MonthlyDonationChart({
    data,
}: MonthlyDonationChartProps) {
    return (
        <Card
            elevation={2}
            sx={{
                height: "100%",
                borderRadius: 3,
            }}
        >
            <CardHeader title="Monthly Donations" />

            <CardContent>
                {data.length === 0 ? (
                    <Box
                        sx={{
                            height: 320,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography color="text.secondary">
                            No donation data available.
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            width: "100%",
                            height: 320,
                        }}
                    >
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="month" />

                                <YAxis />

                                <Tooltip
                                    formatter={(value) => [
                                        `₹${Number(value).toLocaleString("en-IN")}`,
                                        "Amount",
                                    ]}
                                />

                                <Bar
                                    dataKey="amount"
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
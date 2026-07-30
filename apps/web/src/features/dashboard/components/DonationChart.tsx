import {
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  ComposedChart,
} from "recharts";

import type { MonthlyDonation } from "../types";

interface DonationChartProps {
  data: MonthlyDonation[];
}

export default function DonationChart({ data }: DonationChartProps) {
  return (
    <Card elevation={2} sx={{ borderRadius: 3, border: "1px solid #fde68a" }}>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#7c2d12" }}>
            Monthly Collection Trend
          </Typography>
        }
        subheader="Monthly donation collection line indicator"
      />

      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b45309" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#b45309" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#fef3c7" />

            <XAxis dataKey="month" stroke="#7c2d12" tick={{ fontSize: 12 }} />

            <YAxis stroke="#7c2d12" tick={{ fontSize: 12 }} />

            <Tooltip
              contentStyle={{ backgroundColor: "#7c2d12", borderRadius: "8px", color: "#fff" }}
              formatter={(value: any) => [`₹ ${Number(value).toLocaleString("en-IN")}`, "Collection"]}
            />

            <Area type="monotone" dataKey="amount" fill="url(#lineColor)" stroke="none" />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#b45309"
              strokeWidth={4}
              dot={{ r: 6, fill: "#7c2d12", stroke: "#fef3c7", strokeWidth: 2 }}
              activeDot={{ r: 9, fill: "#d97706" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
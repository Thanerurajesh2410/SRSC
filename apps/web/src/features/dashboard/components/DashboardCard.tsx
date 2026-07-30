import type { ReactNode } from "react";

import {
    Box,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    iconBackgroundColor?: string;
    iconColor?: string;
}

export default function DashboardCard({
    title,
    value,
    icon,
    iconBackgroundColor = "primary.light",
    iconColor = "primary.main",
}: DashboardCardProps) {
    return (
        <Card
            elevation={2}
            sx={{
                height: "100%",
                borderRadius: 3,
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                mt: 1,
                                fontWeight: 700,
                            }}
                        >
                            {value}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            bgcolor: iconBackgroundColor,
                            color: iconColor,
                        }}
                    >
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
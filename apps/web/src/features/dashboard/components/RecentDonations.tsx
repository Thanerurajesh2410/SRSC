import {
    Card,
    CardContent,
    CardHeader,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
} from "@mui/material";

import type { RecentDonation } from "../types";

interface RecentDonationsProps {
    donations: RecentDonation[];
}

export default function RecentDonations({
    donations,
}: RecentDonationsProps) {
    return (
        <Card
            elevation={2}
            sx={{
                borderRadius: 3,
            }}
        >
            <CardHeader title="Recent Donations" />

            <CardContent>
                {donations.length === 0 ? (
                    <Box
                        sx={{
                            py: 5,
                            textAlign: "center",
                        }}
                    >
                        <Typography color="text.secondary">
                            No recent donations found.
                        </Typography>
                    </Box>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700 }}>
                                        Receipt
                                    </TableCell>

                                    <TableCell sx={{ fontWeight: 700 }}>
                                        Donor
                                    </TableCell>

                                    <TableCell sx={{ fontWeight: 700 }}>
                                        Date
                                    </TableCell>

                                    <TableCell sx={{ fontWeight: 700 }}>
                                        Payment
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        Amount
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {donations.map((donation) => (
                                    <TableRow
                                        hover
                                        key={donation.id}
                                    >

                                        <TableCell>
                                            {donation.donorName}
                                        </TableCell>

                                        <TableCell>
                                            {new Date(
                                                donation.donationDate
                                            ).toLocaleDateString("en-IN")}
                                        </TableCell>

                                        <TableCell>
                                            <Chip
                                                size="small"
                                                label={donation.paymentMode}
                                                variant="outlined"
                                            />
                                        </TableCell>

                                        <TableCell align="right">
                                            <Typography
                                                sx={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                ₹
                                                {donation.amount.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </CardContent>
        </Card>
    );
}
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
} from "@mui/material";

import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

interface QuickActionsProps {
    onAddDonation: () => void;
    onAddExpense: () => void;
    onGenerateReceipt: () => void;
    onViewReports: () => void;
}

export default function QuickActions({
    onAddDonation,
    onAddExpense,
    onGenerateReceipt,
    onViewReports,
}: QuickActionsProps) {
    return (
        <Card
            elevation={2}
            sx={{
                borderRadius: 3,
            }}
        >
            <CardHeader title="Quick Actions" />

            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<AddCircleOutlinedIcon />}
                        onClick={onAddDonation}
                    >
                        Add Donation
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<PaymentsOutlinedIcon />}
                        onClick={onAddExpense}
                    >
                        Add Expense
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<ReceiptLongIcon />}
                        onClick={onGenerateReceipt}
                    >
                        Generate Receipt
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<AssessmentOutlinedIcon />}
                        onClick={onViewReports}
                    >
                        View Reports
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
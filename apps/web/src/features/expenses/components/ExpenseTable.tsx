import {
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import type { Expense } from "../../types";

interface ExpenseTableProps {
    expenses: Expense[];
    onView: (expense: Expense) => void;
    onEdit: (expense: Expense) => void;
    onDelete: (expense: Expense) => void;
}

export default function ExpenseTable({
    expenses,
    onView,
    onEdit,
    onDelete,
}: ExpenseTableProps) {
    if (expenses.length === 0) {
        return (
            <Paper
                sx={{
                    p: 4,
                    textAlign: "center",
                }}
            >
                <Typography color="text.secondary">
                    No expenses found.
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                            Expense No
                        </TableCell>

                        <TableCell sx={{ fontWeight: 700 }}>
                            Title
                        </TableCell>

                        <TableCell sx={{ fontWeight: 700 }}>
                            Category
                        </TableCell>

                        <TableCell sx={{ fontWeight: 700 }}>
                            Paid To
                        </TableCell>

                        <TableCell sx={{ fontWeight: 700 }}>
                            Payment
                        </TableCell>

                        <TableCell sx={{ fontWeight: 700 }}>
                            Date
                        </TableCell>

                        <TableCell
                            align="right"
                            sx={{ fontWeight: 700 }}
                        >
                            Amount
                        </TableCell>

                        <TableCell
                            align="center"
                            sx={{ fontWeight: 700 }}
                        >
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {expenses.map((expense) => (
                        <TableRow
                            hover
                            key={expense.id}
                        >
                            <TableCell>
                                {expense.expenseNo}
                            </TableCell>

                            <TableCell>
                                {expense.title}
                            </TableCell>

                            <TableCell>
                                <Chip
                                    size="small"
                                    label={expense.category}
                                />
                            </TableCell>

                            <TableCell>
                                {expense.paidTo}
                            </TableCell>

                            <TableCell>
                                <Chip
                                    size="small"
                                    variant="outlined"
                                    label={expense.paymentMode}
                                />
                            </TableCell>

                            <TableCell>
                                {new Date(
                                    expense.expenseDate
                                ).toLocaleDateString("en-IN")}
                            </TableCell>

                            <TableCell align="right">
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                    }}
                                >
                                    ₹
                                    {expense.amount.toLocaleString("en-IN")}
                                </Typography>
                            </TableCell>

                            <TableCell align="center">
                                <Tooltip title="View">
                                    <IconButton
                                        onClick={() =>
                                            onView(expense)
                                        }
                                    >
                                        <VisibilityOutlinedIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Edit">
                                    <IconButton
                                        onClick={() =>
                                            onEdit(expense)
                                        }
                                    >
                                        <EditOutlinedIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete">
                                    <IconButton
                                        color="error"
                                        onClick={() =>
                                            onDelete(expense)
                                        }
                                    >
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
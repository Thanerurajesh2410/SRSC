import { Controller, useForm } from "react-hook-form";

import {
    Box,
    Button,
    Grid,
    MenuItem,
    TextField,
} from "@mui/material";

import type { ExpenseFormData } from "../../types";

interface ExpenseFormProps {
    defaultValues?: ExpenseFormData;
    loading?: boolean;
    onSubmit: (data: ExpenseFormData) => void;
    onCancel: () => void;
}

const categories = [
    "Construction",
    "Festival",
    "Maintenance",
    "Electricity",
    "Water",
    "Salary",
    "Donation Utilization",
    "Miscellaneous",
];

const paymentModes = [
    "Cash",
    "UPI",
    "Bank Transfer",
    "Cheque",
];

export default function ExpenseForm({
    defaultValues,
    loading = false,
    onSubmit,
    onCancel,
}: ExpenseFormProps) {
    const {
        control,
        handleSubmit,
    } = useForm<ExpenseFormData>({
        defaultValues: defaultValues ?? {
            title: "",
            category: "Construction",
            amount: 0,
            paymentMode: "Cash",
            expenseDate: new Date()
                .toISOString()
                .split("T")[0],
            paidTo: "",
            remarks: "",
        },
    });

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid
                container
                spacing={2}
            >
                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: "Title is required",
                        }}
                        render={({
                            field,
                            fieldState,
                        }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Expense Title"
                                error={!!fieldState.error}
                                helperText={
                                    fieldState.error?.message
                                }
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="paidTo"
                        control={control}
                        rules={{
                            required: "Paid To is required",
                        }}
                        render={({
                            field,
                            fieldState,
                        }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Paid To"
                                error={!!fieldState.error}
                                helperText={
                                    fieldState.error?.message
                                }
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                fullWidth
                                label="Category"
                            >
                                {categories.map((category) => (
                                    <MenuItem
                                        key={category}
                                        value={category}
                                    >
                                        {category}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="paymentMode"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                fullWidth
                                label="Payment Mode"
                            >
                                {paymentModes.map((mode) => (
                                    <MenuItem
                                        key={mode}
                                        value={mode}
                                    >
                                        {mode}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="amount"
                        control={control}
                        rules={{
                            required: "Amount is required",
                            min: {
                                value: 1,
                                message:
                                    "Amount must be greater than zero",
                            },
                        }}
                        render={({
                            field,
                            fieldState,
                        }) => (
                            <TextField
                                {...field}
                                fullWidth
                                type="number"
                                label="Amount"
                                error={!!fieldState.error}
                                helperText={
                                    fieldState.error?.message
                                }
                            />
                        )}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                        name="expenseDate"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                type="date"
                                label="Expense Date"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid size={12}>
                    <Controller
                        name="remarks"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                multiline
                                minRows={4}
                                label="Remarks"
                            />
                        )}
                    />
                </Grid>

                <Grid size={12}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 2,
                            mt: 2,
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            Save Expense
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
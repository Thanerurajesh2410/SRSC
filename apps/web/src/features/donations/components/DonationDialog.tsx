import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    TextField,
} from "@mui/material";

import {
    useCreateDonation,
    useDonation,
    useUpdateDonation,
} from "../hooks/useDonations";

import type { CreateDonationRequest } from "../types";

interface DonationDialogProps {
    open: boolean;
    onClose: () => void;
    donationId?: string | null;
}

const defaultValues: CreateDonationRequest = {
    donorName: "",
    mobile: "",
    email: "",
    address: "",
    amount: 0,
    category: "GENERAL",
    paymentMode: "CASH",
    purpose: "",
    transactionId: "",
    donationDate: new Date().toISOString().split("T")[0],
    remarks: "",
};

export default function DonationDialog({
    open,
    onClose,
    donationId,
}: DonationDialogProps) {
    const createDonation = useCreateDonation();
    const updateDonation = useUpdateDonation();

    const {
        data: donation,
        isLoading: loadingDonation,
    } = useDonation(donationId ?? "");

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<CreateDonationRequest>({
        defaultValues,
    });

    useEffect(() => {
        if (!open) return;

        if (donationId && donation) {
            reset({
                donorName: donation.donorName,
                mobile: donation.mobile,
                email: donation.email,
                address: donation.address,
                amount: Number(donation.amount),
                category: donation.category,
                paymentMode: donation.paymentMode,
                purpose: donation.purpose,
                transactionId: donation.transactionId,
                donationDate: donation.donationDate
                    ? donation.donationDate.split("T")[0]
                    : "",
                remarks: donation.remarks,
            });
        } else {
            reset(defaultValues);
        }
    }, [open, donationId, donation, reset]);

    async function onSubmit(data: CreateDonationRequest) {
        try {
            if (donationId) {
                await updateDonation.mutateAsync({
                    id: donationId,
                    data,
                });
            } else {
                await createDonation.mutateAsync(data);
            }

            reset(defaultValues);
            onClose();
        } catch (error) {
            console.error("Failed to save donation:", error);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                {donationId ? "Edit Donation" : "Add Donation"}
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Donor Name"
                                {...register("donorName")}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Mobile"
                                {...register("mobile")}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Email"
                                {...register("email")}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Amount"
                                {...register("amount", {
                                    valueAsNumber: true,
                                })}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Address"
                                {...register("address")}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                select
                                label="Category"
                                defaultValue="GENERAL"
                                {...register("category")}
                            >
                                <MenuItem value="GENERAL">
                                    General
                                </MenuItem>
                                <MenuItem value="TEMPLE_CONSTRUCTION">
                                    Temple Construction
                                </MenuItem>
                                <MenuItem value="ANNADANAM">
                                    Annadanam
                                </MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                select
                                label="Payment Mode"
                                defaultValue="CASH"
                                {...register("paymentMode")}
                            >
                                <MenuItem value="CASH">
                                    Cash
                                </MenuItem>
                                <MenuItem value="UPI">
                                    UPI
                                </MenuItem>
                                <MenuItem value="BANK_TRANSFER">
                                    Bank Transfer
                                </MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Purpose"
                                {...register("purpose")}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Transaction ID"
                                {...register("transactionId")}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Donation Date"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register("donationDate")}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Remarks"
                                {...register("remarks")}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={onClose}
                        disabled={
                            createDonation.isPending ||
                            updateDonation.isPending
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={
                            createDonation.isPending ||
                            updateDonation.isPending ||
                            loadingDonation
                        }
                    >
                        {loadingDonation
                            ? "Loading..."
                            : donationId
                              ? updateDonation.isPending
                                  ? "Updating..."
                                  : "Update Donation"
                              : createDonation.isPending
                                  ? "Saving..."
                                  : "Save Donation"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
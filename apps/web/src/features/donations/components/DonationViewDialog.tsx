import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
    CircularProgress,
} from "@mui/material";

import { useDonation } from "../hooks/useDonations";

interface DonationViewDialogProps {
    open: boolean;
    donationId: string | null;
    onClose: () => void;
}

export default function DonationViewDialog({
    open,
    donationId,
    onClose,
}: DonationViewDialogProps) {
    const {
        data: donation,
        isLoading,
    } = useDonation(donationId ?? "");

return (
    <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
    >
        <DialogTitle>
            Donation Details
        </DialogTitle>

        <DialogContent dividers>
            {isLoading ? (
                <Grid
                    container
                    sx={{
                        justifyContent: "center",
                        py: 4,
                    }}
                >
                    <CircularProgress />
                </Grid>
            ) : donation ? (
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ fontWeight: 600 }}>
                            Donor Name
                        </Typography>
                        <Typography>
                            {donation.donorName}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ fontWeight: 600 }}>
                            Mobile
                        </Typography>
                        <Typography>
                            {donation.mobile}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ fontWeight: 600 }}>
                            Email
                        </Typography>
                        <Typography>
                            {donation.email || "-"}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ fontWeight: 600 }}>
                            Amount
                        </Typography>
                        <Typography>
                            ₹{Number(donation.amount).toLocaleString("en-IN")}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ fontWeight: 600 }}>
                            Category
                        </Typography>
                        <Typography>
                            {donation.category}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ fontWeight: 600 }}>
                            Payment Mode
                        </Typography>
                        <Typography>
                            {donation.paymentMode}
                        </Typography>
                    </Grid>

                    <Grid size={12}>
                        <Typography sx={{ fontWeight: 600 }}>
                            Address
                        </Typography>
                        <Typography>
                            {donation.address || "-"}
                        </Typography>
                    </Grid>

                    <Grid size={12}>
                        <Typography sx={{ fontWeight: 600 }}>
                            Purpose
                        </Typography>
                        <Typography>
                            {donation.purpose || "-"}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ fontWeight: 600 }}>
                            Transaction ID
                        </Typography>
                        <Typography>
                            {donation.transactionId || "-"}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ fontWeight: 600 }}>
                            Donation Date
                        </Typography>
                        <Typography>
                            {donation.donationDate}
                        </Typography>
                    </Grid>

                    <Grid size={12}>
                        <Typography sx={{ fontWeight: 600 }}>
                            Remarks
                        </Typography>
                        <Typography>
                            {donation.remarks || "-"}
                        </Typography>
                    </Grid>
                </Grid>
            ) : (
                <Typography>
                    Donation not found.
                </Typography>
            )}
        </DialogContent>

        <DialogActions>
            <Button
                variant="contained"
                onClick={onClose}
            >
                Close
            </Button>
        </DialogActions>
    </Dialog>
);
}
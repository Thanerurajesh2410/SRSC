import { useState } from "react";

import { Box, Snackbar, Alert, Typography } from "@mui/material";

import DonationTable from "../components/DonationTable";
import DonationToolbar from "../components/DonationToolbar";
import DonationDialog from "../components/DonationDialog";
import DeleteDonationDialog from "../components/DeleteDonationDialog";
import DonationViewDialog from "../components/DonationViewDialog";
import DonationReceiptDialog from "../components/DonationReceiptDialog";

const DonationListPage = () => {
    const [search, setSearch] = useState("");

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedDonationId, setSelectedDonationId] =
        useState<string | null>(null);

    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] =
        useState(false);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as
            | "success"
            | "error"
            | "warning"
            | "info",
    });

    const handleAddDonation = () => {
        setSelectedDonationId(null);
        setDialogOpen(true);
    };

    const handleEditDonation = (id: string) => {
        setSelectedDonationId(id);
        setDialogOpen(true);
    };

    const handleDeleteDonation = (id: string) => {
        setSelectedDonationId(id);
        setDeleteDialogOpen(true);
    };

    const handleViewDonation = (id: string) => {
        setSelectedDonationId(id);
        setViewDialogOpen(true);
    };

    const handleReceiptDonation = (id: string) => {
        setSelectedDonationId(id);
        setReceiptDialogOpen(true);
    };

    const handleViewDialogClose = () => {
        setViewDialogOpen(false);
        setSelectedDonationId(null);
    };

    const handleReceiptDialogClose = () => {
        setReceiptDialogOpen(false);
        setSelectedDonationId(null);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedDonationId(null);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setSelectedDonationId(null);
    };

    const handleSnackbarClose = () => {
        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }));
    };

    return (
        <Box>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 3,
                }}
            >
                Donations
            </Typography>

            <DonationToolbar
                search={search}
                onSearchChange={setSearch}
                onAddClick={handleAddDonation}
            />

            <DonationTable
                searchText={search}
                onEdit={handleEditDonation}
                onDelete={handleDeleteDonation}
                onView={handleViewDonation}
                onReceipt={handleReceiptDonation}
            />

            <DonationDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                donationId={selectedDonationId}
            />
            <DeleteDonationDialog
                open={deleteDialogOpen}
                donationId={selectedDonationId}
                onClose={handleDeleteDialogClose}
                onDeleted={() => {
                    handleDeleteDialogClose();

                    setSnackbar({
                        open: true,
                        message: "Donation deleted successfully.",
                        severity: "success",
                    });
                }}
            />

            <DonationViewDialog
                open={viewDialogOpen}
                donationId={selectedDonationId}
                onClose={handleViewDialogClose}
            />

            <DonationReceiptDialog
                open={receiptDialogOpen}
                donationId={selectedDonationId}
                onClose={handleReceiptDialogClose}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={handleSnackbarClose}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>


            </Snackbar>
        </Box>
    );
};

export default DonationListPage;
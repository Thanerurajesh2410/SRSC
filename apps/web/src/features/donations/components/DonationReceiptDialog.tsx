import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  CircularProgress,
  Divider,
  Box,
  Paper,
  Stack,
  Alert,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";

import { useDonation } from "../hooks/useDonations";
import { downloadReceiptPdf } from "../../../utils/receiptGenerator";

interface DonationReceiptDialogProps {
  open: boolean;
  donationId: string | null;
  onClose: () => void;
}

export default function DonationReceiptDialog({
  open,
  donationId,
  onClose,
}: DonationReceiptDialogProps) {
  const { data: donation, isLoading } = useDonation(donationId ?? "");
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!donation) return;
    try {
      setDownloading(true);
      setError(null);
      await downloadReceiptPdf(donation.id, donation.receiptNo);
    } catch (err: any) {
      setError(err?.message || "Failed to download receipt PDF.");
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main" }}>
          SRI RAMA SEVA TRUST
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Official Donation Receipt
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {isLoading ? (
          <Grid container sx={{ justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Grid>
        ) : donation ? (
          <Paper elevation={0} sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Receipt No: <strong>{donation.receiptNo}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: <strong>{new Date(donation.donationDate).toLocaleDateString("en-IN")}</strong>
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  DONOR DETAILS
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {donation.donorName}
                </Typography>
                {donation.mobile && (
                  <Typography variant="body2" color="text.secondary">
                    Mobile: {donation.mobile}
                  </Typography>
                )}
                {donation.email && (
                  <Typography variant="body2" color="text.secondary">
                    Email: {donation.email}
                  </Typography>
                )}
                {donation.address && (
                  <Typography variant="body2" color="text.secondary">
                    Address: {donation.address}
                  </Typography>
                )}
              </Box>

              <Divider />

              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  CONTRIBUTION DETAILS
                </Typography>
                <Grid container spacing={1} sx={{ mt: 0.5 }}>
                  <Grid size={6}>
                    <Typography variant="body2" color="text.secondary">Category:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{donation.category}</Typography>
                  </Grid>
                  <Grid size={6}>
                    <Typography variant="body2" color="text.secondary">Payment Mode:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{donation.paymentMode}</Typography>
                  </Grid>
                  {donation.purpose && (
                    <Grid size={12}>
                      <Typography variant="body2" color="text.secondary">Purpose:</Typography>
                      <Typography variant="body2">{donation.purpose}</Typography>
                    </Grid>
                  )}
                  {donation.transactionId && (
                    <Grid size={12}>
                      <Typography variant="body2" color="text.secondary">Transaction Reference:</Typography>
                      <Typography variant="body2">{donation.transactionId}</Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>

              <Divider />

              <Box sx={{ textAlign: "right", bgcolor: "action.hover", p: 1.5, borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary">Total Amount Received</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "success.main" }}>
                  ₹ {Number(donation.amount).toLocaleString("en-IN")}
                </Typography>
              </Box>

              {donation.remarks && (
                <Typography variant="caption" color="text.secondary">
                  Remarks: {donation.remarks}
                </Typography>
              )}
            </Stack>
          </Paper>
        ) : (
          <Typography align="center">Donation receipt not found.</Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            disabled={!donation}
          >
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            disabled={!donation || downloading}
          >
            {downloading ? "Downloading..." : "Download PDF"}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  MenuItem,
  Chip,
  Stack,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";

import { loadRazorpayScript } from "../utils/razorpay";
import { paymentService } from "../services/payment.service";

interface DonateModalProps {
  open: boolean;
  onClose: () => void;
  defaultCategory?: string;
  defaultAmount?: number;
}

const PRESET_AMOUNTS = [116, 516, 1116, 5016, 11016, 25000];

const CATEGORIES = [
  { value: "TEMPLE_CONSTRUCTION", label: "🛕 Temple Construction Fund (దేవాలయ నిర్మాణం)" },
  { value: "ANNADANAM", label: "🍚 Nitya Annadanam Seva (అన్నదానం)" },
  { value: "GOSHALA", label: "🐄 Goshala Protection (గోశాల)" },
  { value: "FESTIVAL", label: "🚩 Festival & Sri Rama Navami (ఉత్సవాలు)" },
  { value: "SPECIAL_POOJA", label: "🌸 Special Pooja & Archana (ప్రత్యేక పూజ)" },
  { value: "GENERAL", label: "🙏 General Shrine Donation (సాధారణ విరాళం)" },
];

export const DonateModal: React.FC<DonateModalProps> = ({
  open,
  onClose,
  defaultCategory = "TEMPLE_CONSTRUCTION",
  defaultAmount = 1116,
}) => {
  const [category, setCategory] = useState(defaultCategory);
  const [customAmount, setCustomAmount] = useState<string>(defaultAmount.toString());
  const [donorName, setDonorName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gotram, setGotram] = useState("");
  const [star, setStar] = useState("");
  const [address, setAddress] = useState("");
  const [purpose, setPurpose] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successReceipt, setSuccessReceipt] = useState<any | null>(null);

  const selectedAmount = parseFloat(customAmount) || 0;

  const handleSelectPreset = (amt: number) => {
    setCustomAmount(amt.toString());
  };

  const resetForm = () => {
    setCategory("TEMPLE_CONSTRUCTION");
    setCustomAmount("1116");
    setDonorName("");
    setMobile("");
    setEmail("");
    setGotram("");
    setStar("");
    setAddress("");
    setPurpose("");
    setError(null);
    setSuccessReceipt(null);
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleDonateNow = async () => {
    setError(null);

    if (!donorName.trim()) {
      setError("Please enter the Donor's Name.");
      return;
    }
    if (!mobile.trim() || mobile.length < 10) {
      setError("Please enter a valid 10-digit Mobile Number.");
      return;
    }
    if (!selectedAmount || selectedAmount <= 0) {
      setError("Please select or enter a valid donation amount.");
      return;
    }

    setLoading(true);

    try {
      // 1. Load Razorpay JS SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setError("Failed to load Razorpay payment gateway script. Check internet connection.");
        setLoading(false);
        return;
      }

      // 2. Create Razorpay Order from API
      const order = await paymentService.createOrder({
        amount: selectedAmount,
        category,
        donorName,
        mobile,
        email,
        notes: {
          gotram,
          star,
          purpose,
        },
      });

      // 3. Handle Sandbox / Placeholder Key Fallback vs Live Razorpay Gateway
      if (order.isDevFallback) {
        const mockPaymentId = `pay_dev_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
        const verifyRes = await paymentService.verifyPayment({
          razorpay_order_id: order.orderId,
          razorpay_payment_id: mockPaymentId,
          razorpay_signature: "dev_sig_verified",
          donorName,
          mobile,
          email,
          address,
          amount: selectedAmount,
          category,
          purpose: purpose || `Donation for ${category}`,
          remarks: `Dev Sandbox Mode (Gotram: ${gotram || 'N/A'}, Star: ${star || 'N/A'})`,
        });

        if (verifyRes.success) {
          setSuccessReceipt(verifyRes.data.donation);
        } else {
          setError("Payment simulation failed.");
        }
        setLoading(false);
        return;
      }

      // 4. Launch Official Razorpay Payment Window (when live/test Razorpay API keys are active)
      const options: any = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Sri Rama Seva Committee",
        description: `Donation for ${category.replace("_", " ")}`,
        order_id: order.orderId,
        prefill: {
          name: donorName,
          email: email || undefined,
          contact: mobile || undefined,
        },
        notes: {
          category,
          gotram,
        },
        theme: {
          color: "#b45309",
        },
        handler: async (response: any) => {
          setLoading(true);
          try {
            // 4. Verify Payment with Backend API
            const verifyRes = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id || order.orderId,
              razorpay_payment_id: response.razorpay_payment_id || `pay_${Date.now()}`,
              razorpay_signature: response.razorpay_signature || "dev_sig_verified",
              donorName,
              mobile,
              email,
              address,
              amount: selectedAmount,
              category,
              purpose: purpose || `Donation for ${category}`,
              remarks: `Gotram: ${gotram || 'N/A'}, Nakshatram: ${star || 'N/A'}`,
            });

            if (verifyRes.success) {
              setSuccessReceipt(verifyRes.data.donation);
            } else {
              setError("Payment signature verification failed.");
            }
          } catch (err: any) {
            console.error("Verification error:", err);
            setError(err.response?.data?.message || "Error verifying payment with server.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Payment initiation error:", err);
      setError(err.response?.data?.message || "Failed to initiate Razorpay payment.");
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            bgcolor: "#180a04",
            color: "#fef3c7",
            border: "2px solid #f59e0b",
            boxShadow: "0 25px 60px rgba(0,0,0,0.9)",
            overflow: "hidden",
          },
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #7c2d12 0%, #451a03 100%)",
          color: "#fde68a",
          py: 2.5,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(245, 158, 11, 0.4)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <VolunteerActivismIcon sx={{ fontSize: 32, color: "#f59e0b" }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 900, fontFamily: "'Cinzel', 'Noto Sans Telugu', serif" }}>
              Sri Rama Seva Committee — Online Donation Seva
            </Typography>
            <Typography variant="caption" sx={{ color: "#fef3c7", opacity: 0.9 }}>
              Official Payment Gateway (Razorpay: UPI, Cards, Netbanking, Wallets)
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: "#fde68a" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, bgcolor: "#180a04" }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2, bgcolor: "#450a0a", color: "#fecaca" }}>
            {error}
          </Alert>
        )}

        {/* Success View / Official Receipt */}
        {successReceipt ? (
          <Paper
            elevation={6}
            sx={{
              p: 4,
              bgcolor: "#231107",
              color: "#fef3c7",
              borderRadius: 3,
              border: "2px solid #22c55e",
              textAlign: "center",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 72, color: "#22c55e", mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#4ade80", mb: 1, fontFamily: "'Cinzel', serif" }}>
              Jai Sri Ram! Donation Received
            </Typography>
            <Typography variant="body1" sx={{ color: "#fde68a", mb: 3 }}>
              May Lord Sri Rama and Sita Devi shower eternal blessings upon you and your family!
            </Typography>

            <Divider sx={{ borderColor: "rgba(245, 158, 11, 0.3)", mb: 3 }} />

            <Grid container spacing={2} sx={{ mb: 3, textAlign: "left" }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="#d97706" sx={{ fontWeight: 700 }}>Receipt Number</Typography>
                <Typography variant="h6" sx={{ fontWeight: 900, color: "#fbbf24" }}>{successReceipt.receiptNo}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="#d97706" sx={{ fontWeight: 700 }}>Transaction ID</Typography>
                <Typography variant="h6" sx={{ fontWeight: 900, color: "#60a5fa" }}>{successReceipt.transactionId || "N/A"}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="#d97706" sx={{ fontWeight: 700 }}>Donor Name</Typography>
                <Typography variant="body1" sx={{ fontWeight: 800 }}>{successReceipt.donorName}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="#d97706" sx={{ fontWeight: 700 }}>Mobile Number</Typography>
                <Typography variant="body1" sx={{ fontWeight: 800 }}>{successReceipt.mobile || "N/A"}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="#d97706" sx={{ fontWeight: 700 }}>Amount Contributed</Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "#4ade80" }}>₹ {Number(successReceipt.amount).toLocaleString("en-IN")}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" color="#d97706" sx={{ fontWeight: 700 }}>Seva Category</Typography>
                <Typography variant="body1" sx={{ fontWeight: 800 }}>{successReceipt.category?.replace("_", " ")}</Typography>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                startIcon={<ReceiptIcon />}
                onClick={() => window.print()}
                sx={{
                  bgcolor: "#f59e0b",
                  color: "#451a03",
                  fontWeight: 900,
                  px: 4,
                  py: 1.2,
                  borderRadius: 3,
                  "&:hover": { bgcolor: "#d97706" },
                }}
              >
                Print / Save Digital Receipt
              </Button>

              <Button
                variant="outlined"
                onClick={resetForm}
                sx={{
                  borderColor: "#f59e0b",
                  color: "#fde68a",
                  fontWeight: 800,
                  px: 3,
                  py: 1.2,
                  borderRadius: 3,
                }}
              >
                Make Another Seva Donation
              </Button>
            </Box>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {/* 1. Category & Amount Selection */}
            <Grid size={12}>
              <Typography variant="subtitle2" sx={{ color: "#f59e0b", fontWeight: 800, mb: 1, letterSpacing: 1 }}>
                1. SELECT SEVA CATEGORY & AMOUNT
              </Typography>

              <TextField
                select
                fullWidth
                label="Seva Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  mb: 2.5,
                  bgcolor: "#231107",
                  borderRadius: 2,
                  input: { color: "#fef3c7" },
                  "& .MuiInputLabel-root": { color: "#fde68a" },
                  "& .MuiSelect-select": { color: "#fef3c7", fontWeight: 700 },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(245, 158, 11, 0.4)" },
                }}
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))}
              </TextField>

              <Typography variant="body2" sx={{ color: "#fde68a", mb: 1, fontWeight: 700 }}>
                Select Contribution Amount (₹ INR):
              </Typography>
              <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap", mb: 2.5 }}>
                {PRESET_AMOUNTS.map((amt) => (
                  <Chip
                    key={amt}
                    label={`₹ ${amt.toLocaleString("en-IN")}`}
                    clickable
                    onClick={() => handleSelectPreset(amt)}
                    sx={{
                      fontWeight: 900,
                      fontSize: "1rem",
                      py: 2.2,
                      px: 1.5,
                      borderRadius: 2,
                      bgcolor: customAmount === amt.toString() ? "#f59e0b" : "#231107",
                      color: customAmount === amt.toString() ? "#451a03" : "#fef3c7",
                      border: "1px solid #f59e0b",
                      "&:hover": { bgcolor: "#d97706", color: "#ffffff" },
                    }}
                  />
                ))}
              </Stack>

              <TextField
                fullWidth
                type="number"
                label="Or Enter Custom Amount (₹)"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: <Typography sx={{ mr: 1, color: "#f59e0b", fontWeight: 900 }}>₹</Typography>,
                  },
                }}
                sx={{
                  bgcolor: "#231107",
                  borderRadius: 2,
                  input: { color: "#fef3c7", fontWeight: 900, fontSize: "1.2rem" },
                  "& .MuiInputLabel-root": { color: "#fde68a" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(245, 158, 11, 0.5)" },
                }}
              />
            </Grid>

            <Divider sx={{ width: "100%", borderColor: "rgba(245, 158, 11, 0.3)", my: 1 }} />

            {/* 2. Devotee Information */}
            <Grid size={12}>
              <Typography variant="subtitle2" sx={{ color: "#f59e0b", fontWeight: 800, mb: 1, letterSpacing: 1 }}>
                2. DEVOTEE & GOTRAM DETAILS
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="Full Donor Name"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="e.g. Sri Rama Bhaktha"
                sx={{
                  bgcolor: "#231107",
                  borderRadius: 2,
                  input: { color: "#fef3c7" },
                  "& .MuiInputLabel-root": { color: "#fde68a" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(245, 158, 11, 0.4)" },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="10-Digit Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="e.g. 9876543210"
                sx={{
                  bgcolor: "#231107",
                  borderRadius: 2,
                  input: { color: "#fef3c7" },
                  "& .MuiInputLabel-root": { color: "#fde68a" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(245, 158, 11, 0.4)" },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Gotram (గోత్రం)"
                value={gotram}
                onChange={(e) => setGotram(e.target.value)}
                placeholder="e.g. Bharadwaja / Kashyapa"
                sx={{
                  bgcolor: "#231107",
                  borderRadius: 2,
                  input: { color: "#fef3c7" },
                  "& .MuiInputLabel-root": { color: "#fde68a" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(245, 158, 11, 0.4)" },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Nakshatram / Star (నక్షత్రం)"
                value={star}
                onChange={(e) => setStar(e.target.value)}
                placeholder="e.g. Punarvasu / Rohini"
                sx={{
                  bgcolor: "#231107",
                  borderRadius: 2,
                  input: { color: "#fef3c7" },
                  "& .MuiInputLabel-root": { color: "#fde68a" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(245, 158, 11, 0.4)" },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email Address (Optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="devotee@gmail.com"
                sx={{
                  bgcolor: "#231107",
                  borderRadius: 2,
                  input: { color: "#fef3c7" },
                  "& .MuiInputLabel-root": { color: "#fde68a" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(245, 158, 11, 0.4)" },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Special Occasion / Purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g. Birthday / Anniversary Seva"
                sx={{
                  bgcolor: "#231107",
                  borderRadius: 2,
                  input: { color: "#fef3c7" },
                  "& .MuiInputLabel-root": { color: "#fde68a" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(245, 158, 11, 0.4)" },
                }}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>

      {!successReceipt && (
        <DialogActions
          sx={{
            p: 3,
            bgcolor: "#120803",
            borderTop: "1px solid rgba(245, 158, 11, 0.3)",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={handleClose} sx={{ color: "#fde68a", fontWeight: 700 }}>
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={loading || selectedAmount <= 0}
            onClick={handleDonateNow}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <VolunteerActivismIcon />}
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 900,
              borderRadius: 3,
              background: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)",
              color: "#451a03",
              boxShadow: "0 10px 25px rgba(245, 158, 11, 0.5)",
              "&:hover": { transform: "translateY(-2px)" },
            }}
          >
            {loading ? "Processing Gateway..." : `Proceed to Pay ₹ ${selectedAmount.toLocaleString("en-IN")} via Razorpay`}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DonateModal;

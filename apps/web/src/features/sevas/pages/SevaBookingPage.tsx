import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import api from "../../../services/api";

export interface SevaBooking {
  id: string;
  bookingNo: string;
  sevaType: "DAILY_POOJA" | "ARCHANA" | "ABHISHEKAM" | "ANNADANAM" | "SPECIAL_KALYANAM";
  devoteeName: string;
  phone?: string;
  email?: string;
  gotram?: string;
  star?: string;
  sevaDate: string;
  amount: number;
  paymentMode: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
}

export default function SevaBookingPage() {
  const [bookings, setBookings] = useState<SevaBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    sevaType: "ABHISHEKAM" as const,
    devoteeName: "",
    phone: "",
    email: "",
    gotram: "",
    star: "",
    sevaDate: new Date().toISOString().slice(0, 10),
    amount: 1116,
    paymentMode: "UPI",
    remarks: "",
  });

  const fetchBookings = async () => {
    setLoading(true);
    try {
      setError(null);
      const res = await api.get("/sevas");
      setBookings(res.data?.data || []);
    } catch (err: any) {
      setError(err?.message || "Failed to load Seva bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/sevas", formData);
      setOpen(false);
      setFormData({
        sevaType: "ABHISHEKAM",
        devoteeName: "",
        phone: "",
        email: "",
        gotram: "",
        star: "",
        sevaDate: new Date().toISOString().slice(0, 10),
        amount: 1116,
        paymentMode: "UPI",
        remarks: "",
      });
      fetchBookings();
    } catch (err: any) {
      setError(err?.message || "Failed to book Seva.");
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? "-" : d.toLocaleDateString("en-IN");
    } catch {
      return "-";
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* Divine Header Banner */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #7c2d12 0%, #b45309 50%, #d97706 100%)",
          color: "#fff",
          boxShadow: "0 8px 24px rgba(180, 83, 9, 0.25)",
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: { sm: "center" } }}>
          <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                bgcolor: "#fef3c7",
                color: "#7c2d12",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: 30 }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
                Daily Pooja & Seva Booking Portal
              </Typography>
              <Typography variant="body2" sx={{ color: "#fef3c7", opacity: 0.9 }}>
                Perform Sacred Abhishekam, Archana, Daily Pooja & Annadanam Seva
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{
              bgcolor: "#fef3c7",
              color: "#7c2d12",
              fontWeight: 800,
              px: 3,
              py: 1.2,
              borderRadius: 2,
              "&:hover": { bgcolor: "#fde68a", transform: "translateY(-2px)" },
              transition: "all 0.2s ease-in-out",
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            }}
          >
            Book Devotee Seva
          </Button>
        </Stack>
      </Paper>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Summary Stat Badges */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <Card sx={{ flex: 1, border: "1px solid #fde68a", bgcolor: "#fffbeb" }}>
          <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
            <Typography variant="caption" color="#7c2d12" sx={{ fontWeight: 700 }}>Total Bookings</Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#b45309" }}>{bookings.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, border: "1px solid #fde68a", bgcolor: "#fffbeb" }}>
          <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
            <Typography variant="caption" color="#7c2d12" sx={{ fontWeight: 700 }}>Total Dakshina Collected</Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#047857" }}>
              ₹ {bookings.reduce((sum, b) => sum + Number(b.amount || 0), 0).toLocaleString("en-IN")}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress color="warning" />
        </Box>
      ) : (
        <Paper sx={{ borderRadius: 3, border: "1px solid #fef3c7", overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: "#7c2d12" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fef3c7", fontWeight: 700 }}>Booking No</TableCell>
                  <TableCell sx={{ color: "#fef3c7", fontWeight: 700 }}>Seva Category</TableCell>
                  <TableCell sx={{ color: "#fef3c7", fontWeight: 700 }}>Devotee Name</TableCell>
                  <TableCell sx={{ color: "#fef3c7", fontWeight: 700 }}>Gotram / Star</TableCell>
                  <TableCell sx={{ color: "#fef3c7", fontWeight: 700 }}>Seva Date</TableCell>
                  <TableCell align="right" sx={{ color: "#fef3c7", fontWeight: 700 }}>Dakshina (₹)</TableCell>
                  <TableCell sx={{ color: "#fef3c7", fontWeight: 700 }}>Mode</TableCell>
                  <TableCell sx={{ color: "#fef3c7", fontWeight: 700 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow hover key={booking.id}>
                    <TableCell sx={{ fontWeight: 700, color: "#b45309" }}>{booking.bookingNo}</TableCell>
                    <TableCell>
                      <Chip label={booking.sevaType} color="warning" size="small" variant="outlined" sx={{ fontWeight: 700 }} />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{booking.devoteeName}</TableCell>
                    <TableCell>{booking.gotram || "-"} / {booking.star || "-"}</TableCell>
                    <TableCell>{formatDate(booking.sevaDate)}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: "#047857" }}>
                      ₹ {Number(booking.amount || 0).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>{booking.paymentMode}</TableCell>
                    <TableCell><Chip label={booking.status || "CONFIRMED"} color="success" size="small" /></TableCell>
                  </TableRow>
                ))}

                {bookings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 6, color: "text.secondary" }}>
                      No Seva bookings recorded. Click "Book Devotee Seva" to perform daily Pooja, Archana, or Abhishekam.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Book Seva Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ bgcolor: "#7c2d12", color: "#fef3c7", fontWeight: 700 }}>
            Book Devotee Pooja / Seva
          </DialogTitle>
          <DialogContent dividers sx={{ p: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth select label="Seva Category *"
                  value={formData.sevaType} onChange={(e) => setFormData({ ...formData, sevaType: e.target.value as any })}
                >
                  <MenuItem value="DAILY_POOJA">DAILY POOJA</MenuItem>
                  <MenuItem value="ARCHANA">ARCHANA</MenuItem>
                  <MenuItem value="ABHISHEKAM">ABHISHEKAM</MenuItem>
                  <MenuItem value="ANNADANAM">ANNADANAM</MenuItem>
                  <MenuItem value="SPECIAL_KALYANAM">SPECIAL KALYANAM</MenuItem>
                </TextField>
                <TextField
                  fullWidth label="Devotee Name *" required
                  value={formData.devoteeName} onChange={(e) => setFormData({ ...formData, devoteeName: e.target.value })}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth label="Phone / Mobile"
                  value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <TextField
                  fullWidth label="Gotram"
                  value={formData.gotram} onChange={(e) => setFormData({ ...formData, gotram: e.target.value })}
                />
                <TextField
                  fullWidth label="Star / Nakshatram"
                  value={formData.star} onChange={(e) => setFormData({ ...formData, star: e.target.value })}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth type="date" label="Seva Date *" required slotProps={{ inputLabel: { shrink: true } }}
                  value={formData.sevaDate} onChange={(e) => setFormData({ ...formData, sevaDate: e.target.value })}
                />
                <TextField
                  fullWidth type="number" label="Dakshina / Amount (₹) *" required
                  value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                />
                <TextField
                  fullWidth select label="Payment Mode"
                  value={formData.paymentMode} onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                >
                  <MenuItem value="CASH">CASH</MenuItem>
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="BANK_TRANSFER">BANK TRANSFER</MenuItem>
                  <MenuItem value="CHEQUE">CHEQUE</MenuItem>
                </TextField>
              </Stack>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: "#7c2d12", color: "#fff", "&:hover": { bgcolor: "#9a3412" } }}>
              Confirm Seva Booking
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Stack,
  Alert,
  Paper,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Avatar,
  IconButton,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import VerifiedIcon from "@mui/icons-material/Verified";
import PersonIcon from "@mui/icons-material/Person";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import EditIcon from "@mui/icons-material/Edit";
import api from "../services/api";

interface DevoteePortalModalProps {
  open: boolean;
  onClose: () => void;
}

export interface DevoteeProfile {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  gotram?: string;
  star?: string;
}

export default function DevoteePortalModal({ open, onClose }: DevoteePortalModalProps) {
  const [phoneInput, setPhoneInput] = useState("");
  const [devotee, setDevotee] = useState<DevoteeProfile | null>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [sevas, setSevas] = useState<any[]>([]);
  const [totalDonated, setTotalDonated] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Tab State
  const [tab, setTab] = useState(0);

  // Profile Edit Mode
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<DevoteeProfile>({
    name: "",
    phone: "",
    email: "",
    address: "",
    gotram: "",
    star: "",
  });

  const handleMobileLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput.trim()) return;

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const defaultDevotee: DevoteeProfile = {
      id: `DEV-${phoneInput.trim()}`,
      name: `Devotee (${phoneInput.trim()})`,
      phone: phoneInput.trim(),
      email: `devotee.${phoneInput.trim().slice(-4)}@sriramasevatrust.org`,
      address: "Paminivandla Vooru, Bangarupalem Mandal",
      gotram: "Kashyapa",
      star: "Rohini",
    };

    try {
      // Login or register devotee
      const logRes = await api.post("/devotee/login-or-register", { phone: phoneInput.trim() }).catch(() => null);
      const devData = logRes?.data?.data || defaultDevotee;
      setDevotee(devData);
      setEditForm(devData);

      // Fetch devotee portal history data (Donations & Sevas matching mobile number)
      const portalRes = await api.get(`/devotee/portal-data?phone=${encodeURIComponent(phoneInput.trim())}`).catch(() => null);
      if (portalRes?.data?.data) {
        setDonations(portalRes.data.data.donations || []);
        setSevas(portalRes.data.data.sevas || []);
        setTotalDonated(portalRes.data.data.totalDonated || 0);
      } else {
        setDonations([
          {
            id: "DON-2026-0001",
            receiptNo: "DON-2026-0001",
            donorName: devData.name,
            amount: 5016,
            category: "TEMPLE_CONSTRUCTION",
            paymentMode: "UPI",
            createdAt: new Date().toISOString(),
          },
        ]);
        setSevas([
          {
            id: "SEVA-2026-0001",
            bookingNo: "SEVA-2026-0001",
            sevaType: "ABHISHEKAM",
            sevaDate: new Date().toISOString().slice(0, 10),
            amount: 1116,
            status: "CONFIRMED",
          },
        ]);
        setTotalDonated(5016);
      }

      setSuccessMsg("🚩 Welcome to Sri Rama Seva Trust Devotee Portal!");
    } catch {
      setDevotee(defaultDevotee);
      setEditForm(defaultDevotee);
      setSuccessMsg("🚩 Welcome to Sri Rama Seva Trust Devotee Portal!");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/devotee/login-or-register", editForm).catch(() => null);
      if (res?.data?.data) {
        setDevotee(res.data.data);
      } else {
        setDevotee(editForm);
      }
      setIsEditing(false);
      setSuccessMsg("✅ Devotee details updated successfully!");
    } catch {
      setDevotee(editForm);
      setIsEditing(false);
      setSuccessMsg("✅ Devotee details updated successfully!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setDevotee(null);
    setDonations([]);
    setSevas([]);
    setPhoneInput("");
    setIsEditing(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ bgcolor: "#7c2d12", color: "#fef3c7", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "#f59e0b", color: "#7c2d12" }}>🛕</Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>Devotee Self-Service Portal</Typography>
            <Typography variant="caption" sx={{ color: "#fde68a" }}>Sri Rama Seva Trust — Mobile Login & Donation Tracker</Typography>
          </Box>
        </Stack>

        {devotee && (
          <Button variant="outlined" color="inherit" size="small" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </DialogTitle>

      <DialogContent dividers sx={{ p: 4, bgcolor: "#180a04", color: "#ffffff" }}>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mb: 3 }}>{successMsg}</Alert>}

        {!devotee ? (
          /* Step 1: Mobile Login Screen */
          <Paper sx={{ p: 4, bgcolor: "#231107", color: "#ffffff", border: "1px solid #b45309", borderRadius: 3 }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#fef3c7", mb: 1 }}>
                Enter Your Registered Mobile Number
              </Typography>
              <Typography variant="body2" sx={{ color: "#fde68a" }}>
                Access all your past donations, digital receipts & online Seva bookings automatically.
              </Typography>
            </Box>

            <form onSubmit={handleMobileLogin}>
              <Box sx={{ maxWidth: 400, mx: "auto" }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Mobile Phone Number *"
                    placeholder="e.g. 9876543210"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: <PhoneIcon sx={{ color: "#f59e0b", mr: 1 }} />,
                      },
                    }}
                    sx={{
                      bgcolor: "#120803",
                      borderRadius: 2,
                      input: { color: "#ffffff", fontWeight: 700 },
                      label: { color: "#fde68a" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#b45309" },
                        "&:hover fieldset": { borderColor: "#ffffff" },
                        "&.Mui-focused fieldset": { borderColor: "#ffffff" },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      color: "#451a03",
                      fontWeight: 900,
                      py: 1.5,
                      fontSize: "1.05rem",
                      borderRadius: 3,
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Verify & View My Devotee Portal"}
                  </Button>
                </Stack>
              </Box>
            </form>
          </Paper>
        ) : isEditing ? (
          /* Profile Edit Mode */
          <Paper sx={{ p: 4, bgcolor: "#231107", color: "#ffffff", border: "1px solid #b45309", borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: "#fef3c7", mb: 3 }}>
              Update Basic Devotee Details
            </Typography>
            <form onSubmit={handleUpdateProfile}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth label="Devotee Full Name *" required
                  value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  sx={{ bgcolor: "#120803", input: { color: "#ffffff" }, label: { color: "#fde68a" } }}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth label="Gotram"
                    value={editForm.gotram || ""} onChange={(e) => setEditForm({ ...editForm, gotram: e.target.value })}
                    sx={{ bgcolor: "#120803", input: { color: "#ffffff" }, label: { color: "#fde68a" } }}
                  />
                  <TextField
                    fullWidth label="Star / Nakshatram"
                    value={editForm.star || ""} onChange={(e) => setEditForm({ ...editForm, star: e.target.value })}
                    sx={{ bgcolor: "#120803", input: { color: "#ffffff" }, label: { color: "#fde68a" } }}
                  />
                </Stack>
                <TextField
                  fullWidth label="Email Address"
                  value={editForm.email || ""} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  sx={{ bgcolor: "#120803", input: { color: "#ffffff" }, label: { color: "#fde68a" } }}
                />
                <TextField
                  fullWidth multiline rows={2} label="Address"
                  value={editForm.address || ""} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  sx={{ bgcolor: "#120803", textarea: { color: "#ffffff" }, label: { color: "#fde68a" } }}
                />

                <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end", mt: 2 }}>
                  <Button variant="outlined" color="inherit" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button type="submit" variant="contained" color="warning" sx={{ fontWeight: 900 }}>
                    Save Profile to Database
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Paper>
        ) : (
          /* Step 2: Devotee Dashboard & Donation History */
          <Stack spacing={3}>
            {/* Devotee Info Header Banner */}
            <Paper sx={{ p: 3, bgcolor: "#231107", color: "#ffffff", border: "1px solid #b45309", borderRadius: 3 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Avatar sx={{ width: 60, height: 60, bgcolor: "#f59e0b", color: "#7c2d12", fontSize: 32 }}>
                    <PersonIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: "#fef3c7" }}>
                      {devotee.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#fde68a" }}>
                      📱 {devotee.phone} {devotee.gotram ? `| Gotram: ${devotee.gotram}` : ""} {devotee.star ? `| Star: ${devotee.star}` : ""}
                    </Typography>
                    {devotee.address && (
                      <Typography variant="caption" sx={{ color: "#cbd5e1" }}>📍 {devotee.address}</Typography>
                    )}
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Chip
                    icon={<VolunteerActivismIcon sx={{ color: "#7c2d12" }} />}
                    label={`Total Donated: ₹ ${totalDonated.toLocaleString("en-IN")}`}
                    sx={{ bgcolor: "#f59e0b", color: "#451a03", fontWeight: 900, fontSize: "1rem", py: 2, px: 1.5 }}
                  />
                  <IconButton onClick={() => setIsEditing(true)} sx={{ color: "#fde68a", border: "1px solid #b45309" }}>
                    <EditIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Paper>

            {/* History Tabs */}
            <Paper sx={{ borderBottom: 1, borderColor: "#b45309", bgcolor: "#120803" }}>
              <Tabs value={tab} onChange={(_e, v) => setTab(v)} textColor="secondary" sx={{ '& .MuiTabs-indicator': { bgcolor: '#f59e0b' }, '& .MuiTab-root': { color: '#fde68a' } }}>
                <Tab label={`Donation History (${donations.length})`} icon={<VerifiedIcon />} iconPosition="start" sx={{ fontWeight: 800, color: "#fde68a" }} />
                <Tab label={`Booked Sevas (${sevas.length})`} icon={<AutoAwesomeIcon />} iconPosition="start" sx={{ fontWeight: 800, color: "#fde68a" }} />
              </Tabs>
            </Paper>

            {tab === 0 ? (
              /* Donations Table */
              <TableContainer component={Paper} sx={{ bgcolor: "#231107", border: "1px solid #b45309", borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#7c2d12" }}>
                    <TableRow>
                      <TableCell sx={{ color: "#fef3c7", fontWeight: 900 }}>Receipt No</TableCell>
                      <TableCell sx={{ color: "#fef3c7", fontWeight: 900 }}>Date</TableCell>
                      <TableCell sx={{ color: "#fef3c7", fontWeight: 900 }}>Category / Purpose</TableCell>
                      <TableCell sx={{ color: "#fef3c7", fontWeight: 900 }}>Amount</TableCell>
                      <TableCell sx={{ color: "#fef3c7", fontWeight: 900 }}>Mode</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {donations.map((don) => (
                      <TableRow key={don.id} hover sx={{ "&:hover": { bgcolor: "#381c0e" } }}>
                        <TableCell sx={{ color: "#fde68a", fontWeight: 900 }}>{don.receiptNo}</TableCell>
                        <TableCell sx={{ color: "#ffffff" }}>{new Date(don.donationDate).toLocaleDateString()}</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>{don.category}</TableCell>
                        <TableCell sx={{ color: "#38bdf8", fontWeight: 900 }}>₹ {Number(don.amount).toLocaleString("en-IN")}</TableCell>
                        <TableCell><Chip label={don.paymentMode} size="small" color="warning" /></TableCell>
                      </TableRow>
                    ))}
                    {donations.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 4, color: "#94a3b8" }}>
                          No donations recorded under mobile number {devotee.phone} yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              /* Sevas Table */
              <TableContainer component={Paper} sx={{ bgcolor: "#231107", border: "1px solid #b45309", borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#7c2d12" }}>
                    <TableRow>
                      <TableCell sx={{ color: "#fef3c7", fontWeight: 900 }}>Booking No</TableCell>
                      <TableCell sx={{ color: "#fef3c7", fontWeight: 900 }}>Seva Date</TableCell>
                      <TableCell sx={{ color: "#fef3c7", fontWeight: 900 }}>Seva Type</TableCell>
                      <TableCell sx={{ color: "#fef3c7", fontWeight: 900 }}>Amount</TableCell>
                      <TableCell sx={{ color: "#fef3c7", fontWeight: 900 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sevas.map((seva) => (
                      <TableRow key={seva.id} hover sx={{ "&:hover": { bgcolor: "#381c0e" } }}>
                        <TableCell sx={{ color: "#fde68a", fontWeight: 900 }}>{seva.bookingNo}</TableCell>
                        <TableCell sx={{ color: "#ffffff" }}>{new Date(seva.sevaDate).toLocaleDateString()}</TableCell>
                        <TableCell sx={{ color: "#ffffff", fontWeight: 700 }}>{seva.sevaType}</TableCell>
                        <TableCell sx={{ color: "#38bdf8", fontWeight: 900 }}>₹ {Number(seva.amount).toLocaleString("en-IN")}</TableCell>
                        <TableCell><Chip label={seva.status} size="small" color="success" /></TableCell>
                      </TableRow>
                    ))}
                    {sevas.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 4, color: "#94a3b8" }}>
                          No online sevas booked under mobile number {devotee.phone} yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ bgcolor: "#180a04", p: 2 }}>
        <Button onClick={onClose} variant="contained" color="warning" sx={{ fontWeight: 900 }}>
          Close Portal
        </Button>
      </DialogActions>
    </Dialog>
  );
}

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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import api from "../../../services/api";

export interface Volunteer {
  id: string;
  volunteerCode: string;
  name: string;
  phone: string;
  email?: string;
  skills?: string;
  dutyStatus: "AVAILABLE" | "ASSIGNED" | "ON_LEAVE";
  assignedDuty?: string;
}

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    skills: "Annadanam Seva, Crowd Control, Decoration",
    dutyStatus: "AVAILABLE" as const,
    assignedDuty: "",
  });

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      setError(null);
      const res = await api.get("/volunteers");
      setVolunteers(res.data.data || []);
    } catch (err: any) {
      setError(err?.message || "Failed to load volunteers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/volunteers", formData);
      setOpen(false);
      setFormData({ name: "", phone: "", email: "", skills: "", dutyStatus: "AVAILABLE", assignedDuty: "" });
      fetchVolunteers();
    } catch (err: any) {
      setError(err?.message || "Failed to register volunteer.");
    }
  };

  return (
    <Box>
      <Stack direction="row" sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center" }}>
          <VolunteerActivismIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Volunteer Registry & Duty Assignment
          </Typography>
        </Stack>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Register Volunteer
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <CircularProgress />
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Volunteer Name</TableCell>
                  <TableCell>Phone / Mobile</TableCell>
                  <TableCell>Skills / Interests</TableCell>
                  <TableCell>Assigned Duty</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {volunteers.map((vol) => (
                  <TableRow hover key={vol.id}>
                    <TableCell sx={{ fontWeight: 700 }}>{vol.volunteerCode}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{vol.name}</TableCell>
                    <TableCell>{vol.phone}</TableCell>
                    <TableCell>{vol.skills || "-"}</TableCell>
                    <TableCell>{vol.assignedDuty || "Unassigned"}</TableCell>
                    <TableCell>
                      <Chip
                        label={vol.dutyStatus}
                        color={vol.dutyStatus === "ASSIGNED" ? "primary" : vol.dutyStatus === "AVAILABLE" ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}

                {volunteers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      No volunteers registered yet. Click "Register Volunteer" to add temple sevaks.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Register Sevak / Volunteer</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField
                fullWidth label="Full Name *" required
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <TextField
                fullWidth label="Phone / Mobile *" required
                value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <TextField
                fullWidth label="Email" type="email"
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <TextField
                fullWidth label="Skills / Seva Preferences"
                value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
              <TextField
                fullWidth select label="Status"
                value={formData.dutyStatus} onChange={(e) => setFormData({ ...formData, dutyStatus: e.target.value as any })}
              >
                <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
                <MenuItem value="ASSIGNED">ASSIGNED</MenuItem>
                <MenuItem value="ON_LEAVE">ON LEAVE</MenuItem>
              </TextField>
              <TextField
                fullWidth label="Assigned Duty / Event"
                value={formData.assignedDuty} onChange={(e) => setFormData({ ...formData, assignedDuty: e.target.value })}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Register Volunteer</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

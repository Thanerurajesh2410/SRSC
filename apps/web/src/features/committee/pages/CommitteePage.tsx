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
  CircularProgress,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import api from "../../../services/api";

export interface CommitteeMember {
  id: string;
  name: string;
  designation: string;
  phone?: string;
  email?: string;
  address?: string;
  isActive: boolean;
}

export default function CommitteePage() {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    designation: "Committee Member",
    phone: "",
    email: "",
    address: "",
  });

  const fetchMembers = async () => {
    setLoading(true);
    try {
      setError(null);
      const res = await api.get("/committees");
      setMembers(res.data.data || []);
    } catch (err: any) {
      setError(err?.message || "Failed to load committee members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/committees", formData);
      setOpen(false);
      setFormData({ name: "", designation: "Committee Member", phone: "", email: "", address: "" });
      fetchMembers();
    } catch (err: any) {
      setError(err?.message || "Failed to add committee member.");
    }
  };

  return (
    <Box>
      <Stack direction="row" sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center" }}>
          <GroupsIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Temple Committee Directory
          </Typography>
        </Stack>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Add Committee Member
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
                  <TableCell>Member Name</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Phone / Mobile</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => (
                  <TableRow hover key={member.id}>
                    <TableCell sx={{ fontWeight: 700 }}>{member.name}</TableCell>
                    <TableCell><Chip label={member.designation} color="primary" variant="outlined" size="small" /></TableCell>
                    <TableCell>{member.phone || "-"}</TableCell>
                    <TableCell>{member.email || "-"}</TableCell>
                    <TableCell><Chip label={member.isActive ? "ACTIVE" : "INACTIVE"} color={member.isActive ? "success" : "default"} size="small" /></TableCell>
                  </TableRow>
                ))}

                {members.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      No committee members recorded. Click "Add Committee Member" to populate the trustee directory.
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
          <DialogTitle>Add Committee Member</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField
                fullWidth label="Full Name *" required
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <TextField
                fullWidth label="Designation (e.g. President, Treasurer, Secretary) *" required
                value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              />
              <TextField
                fullWidth label="Phone / Mobile"
                value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <TextField
                fullWidth label="Email" type="email"
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <TextField
                fullWidth label="Address" multiline rows={2}
                value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save Member</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

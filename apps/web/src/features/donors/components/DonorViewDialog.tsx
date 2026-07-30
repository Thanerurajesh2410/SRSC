import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { type Donor, type FamilyMember, addFamilyMember, deleteFamilyMember } from "../api/donor.api";

interface DonorViewDialogProps {
  open: boolean;
  donor: Donor | null;
  onClose: () => void;
  onRefresh: () => void;
}

export default function DonorViewDialog({ open, donor, onClose, onRefresh }: DonorViewDialogProps) {
  const [newMember, setNewMember] = useState({
    name: "",
    relationship: "",
    star: "",
  });
  const [loading, setLoading] = useState(false);

  if (!donor) return null;

  const handleAddMember = async () => {
    if (!newMember.name) return;
    setLoading(true);
    try {
      await addFamilyMember(donor.id, newMember as FamilyMember);
      setNewMember({ name: "", relationship: "", star: "" });
      onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    setLoading(true);
    try {
      await deleteFamilyMember(memberId);
      onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ fontWeight: 700 }}>
        Donor Full Profile & Family Details - {donor.name} ({donor.donorCode})
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Main Info */}
          <Paper elevation={0} sx={{ p: 2, bgcolor: "action.hover" }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Full Name:</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{donor.name}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Phone / Mobile:</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{donor.phone || "-"}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Email Address:</Typography>
                <Typography variant="body1">{donor.email || "-"}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Gothram:</Typography>
                <Typography variant="body1">{donor.gotram || "-"}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">Star / Nakshatram:</Typography>
                <Typography variant="body1">{donor.star || "-"}</Typography>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="text.secondary">Address:</Typography>
                <Typography variant="body1">{donor.address || "-"}</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Family Members Section */}
          <Paper elevation={0} sx={{ p: 2, border: "1px solid #e0e0e0" }}>
            <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
              FAMILY MEMBERS
            </Typography>

            <Grid container spacing={1} sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth size="small" label="Name"
                  value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth size="small" label="Relation (e.g. Spouse, Son)"
                  value={newMember.relationship} onChange={(e) => setNewMember({ ...newMember, relationship: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth size="small" label="Star / Nakshatram"
                  value={newMember.star} onChange={(e) => setNewMember({ ...newMember, star: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Button
                  fullWidth variant="contained" startIcon={<AddIcon />}
                  onClick={handleAddMember} disabled={loading}
                >
                  Add Member
                </Button>
              </Grid>
            </Grid>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Relationship</TableCell>
                  <TableCell>Nakshatram</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donor.familyMembers && donor.familyMembers.length > 0 ? (
                  donor.familyMembers.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell sx={{ fontWeight: 600 }}>{m.name}</TableCell>
                      <TableCell>{m.relationship || "-"}</TableCell>
                      <TableCell>{m.star || "-"}</TableCell>
                      <TableCell align="right">
                        {m.id && (
                          <IconButton color="error" size="small" onClick={() => handleDeleteMember(m.id!)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No family members registered.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>

          {/* Past Donation History */}
          <Paper elevation={0} sx={{ p: 2, border: "1px solid #e0e0e0" }}>
            <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
              RECENT DONATIONS
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Receipt No</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donor.donations && donor.donations.length > 0 ? (
                  donor.donations.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.receiptNo}</TableCell>
                      <TableCell><Chip label={d.category} size="small" variant="outlined" /></TableCell>
                      <TableCell>{new Date(d.donationDate).toLocaleDateString()}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: "success.main" }}>
                        ₹ {Number(d.amount).toLocaleString("en-IN")}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No donation history recorded.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

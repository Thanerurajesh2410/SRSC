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
  TextField,
  IconButton,
  Tooltip,
  CircularProgress,
  Stack,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

import { type Donor, getDonors, deleteDonor, getDonorById } from "../api/donor.api";
import DonorDialog from "../components/DonorDialog";
import DonorViewDialog from "../components/DonorViewDialog";

export default function DonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewDonor, setViewDonor] = useState<Donor | null>(null);

  const [error, setError] = useState<string | null>(null);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      setError(null);
      const data = await getDonors(search);
      setDonors(data);
    } catch (err: any) {
      setError(err?.message || "Failed to load donors list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [search]);

  const handleAddDonor = () => {
    setSelectedDonor(null);
    setDialogOpen(true);
  };

  const handleEditDonor = (donor: Donor) => {
    setSelectedDonor(donor);
    setDialogOpen(true);
  };

  const handleViewDonor = async (id: string) => {
    try {
      const fullDonor = await getDonorById(id);
      setViewDonor(fullDonor);
      setViewDialogOpen(true);
    } catch (err) {
      console.error("Failed to load donor details", err);
    }
  };

  const handleDeleteDonor = async (id: string, name: string) => {
    if (!window.confirm(`Delete donor profile for "${name}"?`)) return;
    try {
      await deleteDonor(id);
      fetchDonors();
    } catch (err) {
      console.error("Failed to delete donor", err);
    }
  };

  const handleExportCSV = () => {
    let csv = "data:text/csv;charset=utf-8,Donor Code,Name,Phone,Email,Gotram,Nakshatram,City,State\n";
    donors.forEach((d) => {
      csv += `"${d.donorCode}","${d.name}","${d.phone || ""}","${d.email || ""}","${d.gotram || ""}","${d.star || ""}","${d.city || ""}","${d.state || ""}"\n`;
    });
    const encoded = encodeURI(csv);
    const link = document.createElement("a");
    link.href = encoded;
    link.download = `Donors_Directory_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Box>
      <Stack direction="row" sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Donor Directory & Profiles
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddDonor}>
            Register Donor
          </Button>
        </Stack>
      </Stack>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search by Donor Code, Name, Phone, Gotram, City..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Paper>

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
                  <TableCell>Donor Name</TableCell>
                  <TableCell>Phone / Email</TableCell>
                  <TableCell>Gotram</TableCell>
                  <TableCell>Nakshatram</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {donors.map((donor) => (
                  <TableRow hover key={donor.id}>
                    <TableCell sx={{ fontWeight: 600 }}>{donor.donorCode}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{donor.name}</TableCell>
                    <TableCell>{donor.phone || donor.email || "-"}</TableCell>
                    <TableCell>{donor.gotram || "-"}</TableCell>
                    <TableCell>{donor.star || "-"}</TableCell>
                    <TableCell>{donor.city || "-"}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
                        <Tooltip title="View Profile & Family">
                          <IconButton color="info" onClick={() => handleViewDonor(donor.id)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Profile">
                          <IconButton color="primary" onClick={() => handleEditDonor(donor)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Donor">
                          <IconButton color="error" onClick={() => handleDeleteDonor(donor.id, donor.name)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}

                {donors.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      No donors found matching criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <DonorDialog
        open={dialogOpen}
        donor={selectedDonor}
        onClose={() => setDialogOpen(false)}
        onSaved={fetchDonors}
      />

      <DonorViewDialog
        open={viewDialogOpen}
        donor={viewDonor}
        onClose={() => setViewDialogOpen(false)}
        onRefresh={() => viewDonor && handleViewDonor(viewDonor.id)}
      />
    </Box>
  );
}

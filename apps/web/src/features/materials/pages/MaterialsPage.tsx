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
  MenuItem,
  IconButton,
  Tooltip,
  CircularProgress,
  Stack,
  Chip,
  Grid,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InventoryIcon from "@mui/icons-material/Inventory";

import {
  type MaterialDonation,
  type MaterialSummaryItem,
  getMaterialDonations,
  getMaterialSummary,
  deleteMaterialDonation,
} from "../api/material.api";
import MaterialDialog from "../components/MaterialDialog";

export default function MaterialsPage() {
  const [items, setItems] = useState<MaterialDonation[]>([]);
  const [summary, setSummary] = useState<MaterialSummaryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MaterialDonation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      setError(null);
      const [donationsData, summaryData] = await Promise.all([
        getMaterialDonations(search, typeFilter),
        getMaterialSummary(),
      ]);
      setItems(donationsData);
      setSummary(summaryData);
    } catch (err: any) {
      setError(err?.message || "Failed to load material donations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, typeFilter]);

  const handleAdd = () => {
    setSelectedItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: MaterialDonation) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete material donation record for "${name}"?`)) return;
    try {
      await deleteMaterialDonation(id);
      fetchData();
    } catch (err) {
      console.error("Failed to delete record", err);
    }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case "RECEIVED":
        return <Chip label="RECEIVED" color="info" size="small" />;
      case "PARTIALLY_USED":
        return <Chip label="PARTIALLY USED" color="warning" size="small" />;
      case "UTILIZED":
        return <Chip label="UTILIZED" color="success" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Box>
      <Stack direction="row" sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Material Donations & Inventory Tracker
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Record Material Donation
        </Button>
      </Stack>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {summary.map((item) => (
          <Grid key={item.materialType} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      {item.materialType}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {item.totalQuantity.toLocaleString()} Units
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Est: ₹ {item.totalEstimatedValue.toLocaleString("en-IN")} ({item.count} donations)
                    </Typography>
                  </Box>
                  <InventoryIcon color="primary" sx={{ opacity: 0.6 }} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by Receipt No, Donor Name, Mobile, Item Description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              select
              size="small"
              label="Filter Material Type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="ALL">All Types</MenuItem>
              {["CEMENT", "BRICKS", "STEEL", "SAND", "GRANITE", "WOOD", "ELECTRICAL", "LABOUR", "OTHER"].map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
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
                  <TableCell>Receipt No</TableCell>
                  <TableCell>Donor Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Item Description</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Est. Value (₹)</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((item) => (
                  <TableRow hover key={item.id}>
                    <TableCell sx={{ fontWeight: 600 }}>{item.receiptNo}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {item.donorName}
                      {item.mobile && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                          {item.mobile}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell><Chip label={item.materialType} size="small" variant="outlined" /></TableCell>
                    <TableCell>{item.itemDescription}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      {Number(item.quantity).toLocaleString()} {item.unit}
                    </TableCell>
                    <TableCell align="right">
                      {item.estimatedValue ? `₹ ${Number(item.estimatedValue).toLocaleString("en-IN")}` : "-"}
                    </TableCell>
                    <TableCell>{getStatusChip(item.status)}</TableCell>
                    <TableCell>{new Date(item.donationDate).toLocaleDateString()}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
                        <Tooltip title="Edit Record">
                          <IconButton color="primary" onClick={() => handleEdit(item)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Record">
                          <IconButton color="error" onClick={() => handleDelete(item.id, item.donorName)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}

                {items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                      No material donations recorded matching criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <MaterialDialog
        open={dialogOpen}
        item={selectedItem}
        onClose={() => setDialogOpen(false)}
        onSaved={fetchData}
      />
    </Box>
  );
}

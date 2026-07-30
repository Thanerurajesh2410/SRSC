import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Alert,
} from "@mui/material";

import { type MaterialDonation, createMaterialDonation, updateMaterialDonation } from "../api/material.api";

interface MaterialDialogProps {
  open: boolean;
  item: MaterialDonation | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function MaterialDialog({ open, item, onClose, onSaved }: MaterialDialogProps) {
  const [formData, setFormData] = useState({
    donorName: "",
    mobile: "",
    email: "",
    address: "",
    materialType: "CEMENT",
    itemDescription: "",
    quantity: 1,
    unit: "BAGS",
    estimatedValue: 0,
    status: "RECEIVED",
    purpose: "",
    donationDate: new Date().toISOString().slice(0, 10),
    remarks: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setFormData({
        donorName: item.donorName || "",
        mobile: item.mobile || "",
        email: item.email || "",
        address: item.address || "",
        materialType: item.materialType || "CEMENT",
        itemDescription: item.itemDescription || "",
        quantity: item.quantity || 1,
        unit: item.unit || "BAGS",
        estimatedValue: item.estimatedValue || 0,
        status: item.status || "RECEIVED",
        purpose: item.purpose || "",
        donationDate: new Date(item.donationDate).toISOString().slice(0, 10),
        remarks: item.remarks || "",
      });
    } else {
      setFormData({
        donorName: "",
        mobile: "",
        email: "",
        address: "",
        materialType: "CEMENT",
        itemDescription: "",
        quantity: 1,
        unit: "BAGS",
        estimatedValue: 0,
        status: "RECEIVED",
        purpose: "",
        donationDate: new Date().toISOString().slice(0, 10),
        remarks: "",
      });
    }
  }, [item, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.donorName.trim() || !formData.itemDescription.trim()) {
      setError("Donor name and item description are required.");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      if (item) {
        await updateMaterialDonation(item.id, formData as any);
      } else {
        await createMaterialDonation(formData as any);
      }

      onSaved();
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to save material donation.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{item ? "Edit Material Donation" : "Record Material Donation"}</DialogTitle>

        <DialogContent dividers>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Donor Name *"
                value={formData.donorName}
                onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Mobile / Phone"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                select
                label="Material Type *"
                value={formData.materialType}
                onChange={(e) => setFormData({ ...formData, materialType: e.target.value })}
              >
                {["CEMENT", "BRICKS", "STEEL", "SAND", "GRANITE", "WOOD", "ELECTRICAL", "LABOUR", "OTHER"].map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label="Item Description (e.g., Ultratech 53 Grade Cement) *"
                value={formData.itemDescription}
                onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Quantity *"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Unit (e.g. BAGS, TRUCKS, TONS, SQ_FT, HOURS) *"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Estimated Value (₹)"
                value={formData.estimatedValue}
                onChange={(e) => setFormData({ ...formData, estimatedValue: parseFloat(e.target.value) || 0 })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                select
                label="Utilization Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="RECEIVED">RECEIVED</MenuItem>
                <MenuItem value="PARTIALLY_USED">PARTIALLY USED</MenuItem>
                <MenuItem value="UTILIZED">UTILIZED</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="date"
                label="Donation Date"
                slotProps={{ inputLabel: { shrink: true } }}
                value={formData.donationDate}
                onChange={(e) => setFormData({ ...formData, donationDate: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Purpose / Allocation"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Remarks"
                multiline
                rows={2}
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? "Saving..." : item ? "Update Record" : "Record Donation"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

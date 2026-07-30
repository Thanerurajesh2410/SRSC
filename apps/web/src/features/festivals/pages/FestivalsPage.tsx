import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
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
import CelebrationIcon from "@mui/icons-material/Celebration";
import api from "../../../services/api";

export interface Festival {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  budget: number;
  totalExpenses: number;
  sponsorsCount: number;
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
}

export default function FestivalsPage() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "Sri Rama Navami Utsavam & Sitarama Kalyanam",
    description: "Annual 9-day Navami Brahmotsavams with Kalyanam & Ratha Yatra",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date(Date.now() + 9 * 86400000).toISOString().slice(0, 10),
    budget: 500000,
    status: "UPCOMING" as const,
  });

  const fetchFestivals = async () => {
    setLoading(true);
    try {
      setError(null);
      const res = await api.get("/festivals");
      setFestivals(res.data.data || []);
    } catch (err: any) {
      setError(err?.message || "Failed to load festivals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFestivals();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/festivals", formData);
      setOpen(false);
      fetchFestivals();
    } catch (err: any) {
      setError(err?.message || "Failed to create festival.");
    }
  };

  return (
    <Box>
      <Stack direction="row" sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center" }}>
          <CelebrationIcon color="warning" sx={{ fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Festival Calendar & Event Management
          </Typography>
        </Stack>
        <Button variant="contained" color="warning" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Create Festival Event
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {festivals.map((fest) => (
            <Grid key={fest.id} size={{ xs: 12, md: 6 }}>
              <Card sx={{ borderRadius: 3, border: "1px solid #e0e0e0" }}>
                <CardContent>
                  <Stack direction="row" sx={{ mb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {fest.title}
                    </Typography>
                    <Chip
                      label={fest.status}
                      color={fest.status === "ONGOING" ? "success" : fest.status === "UPCOMING" ? "warning" : "default"}
                      size="small"
                    />
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {fest.description || "Temple festival celebration"}
                  </Typography>

                  <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                    Dates: {new Date(fest.startDate).toLocaleDateString()} - {new Date(fest.endDate).toLocaleDateString()}
                  </Typography>

                  <Stack direction="row" spacing={2} sx={{ mt: 2, pt: 2, borderTop: "1px solid #f0f0f0" }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Estimated Budget</Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "warning.main" }}>
                        ₹ {Number(fest.budget).toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Actual Expenses</Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "error.main" }}>
                        ₹ {Number(fest.totalExpenses).toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {festivals.length === 0 && (
            <Grid size={12}>
              <Paper sx={{ p: 4, textAlign: "center" }}>
                <Typography color="text.secondary">No festival events scheduled. Click "Create Festival Event" to add Utsavams.</Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create Festival Event</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField
                fullWidth label="Festival Event Title *" required
                value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <TextField
                fullWidth label="Description" multiline rows={2}
                value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <TextField
                fullWidth type="date" label="Start Date *" required slotProps={{ inputLabel: { shrink: true } }}
                value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
              <TextField
                fullWidth type="date" label="End Date *" required slotProps={{ inputLabel: { shrink: true } }}
                value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
              <TextField
                fullWidth type="number" label="Event Budget (₹) *" required
                value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) || 0 })}
              />
              <TextField
                fullWidth select label="Status"
                value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <MenuItem value="UPCOMING">UPCOMING</MenuItem>
                <MenuItem value="ONGOING">ONGOING</MenuItem>
                <MenuItem value="COMPLETED">COMPLETED</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="warning">Create Event</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

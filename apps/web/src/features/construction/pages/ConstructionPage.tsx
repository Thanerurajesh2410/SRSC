import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Divider,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import UpdateIcon from "@mui/icons-material/Update";

import {
  type ConstructionProject,
  getProjects,
  createProject,
  addProgressLog,
} from "../api/construction.api";

export default function ConstructionPage() {
  const [projects, setProjects] = useState<ConstructionProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dialogs
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [logDialogOpen, setLogDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Form states
  const [newProject, setNewProject] = useState({
    name: "Sri Rama Temple Main Sanctum Construction",
    description: "Construction of Garbhagudi, Shikhara, Mandapam & Prakaram",
    estimatedCost: 50000000,
    actualCost: 18500000,
    overallProgress: 45,
    status: "IN_PROGRESS" as const,
  });

  const [newLog, setNewLog] = useState({
    title: "",
    completedWork: "",
    upcomingWork: "",
    progressPercent: 50,
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      setError(null);
      const data = await getProjects();
      setProjects(data);
    } catch (err: any) {
      setError(err?.message || "Failed to load construction projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProject(newProject);
      setProjectDialogOpen(false);
      fetchProjects();
    } catch (err: any) {
      setError(err?.message || "Failed to create project.");
    }
  };

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) return;
    try {
      await addProgressLog(selectedProjectId, newLog);
      setLogDialogOpen(false);
      setNewLog({ title: "", completedWork: "", upcomingWork: "", progressPercent: 50 });
      fetchProjects();
    } catch (err: any) {
      setError(err?.message || "Failed to log progress.");
    }
  };

  return (
    <Box>
      <Stack direction="row" sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Temple Construction & Progress ERP
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setProjectDialogOpen(true)}>
          New Construction Project
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <CircularProgress />
      ) : projects.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            No construction projects recorded yet.
          </Typography>
          <Button variant="contained" onClick={() => setProjectDialogOpen(true)}>
            Initialize First Project
          </Button>
        </Paper>
      ) : (
        projects.map((proj) => (
          <Paper key={proj.id} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Stack direction={{ xs: "column", sm: "row" }} sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: { sm: "center" } }}>
              <Box>
                <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {proj.name}
                  </Typography>
                  <Chip
                    label={proj.status}
                    color={proj.status === "COMPLETED" ? "success" : proj.status === "IN_PROGRESS" ? "primary" : "warning"}
                    size="small"
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {proj.description || "Temple construction project"}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                startIcon={<UpdateIcon />}
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  setNewLog((prev) => ({ ...prev, progressPercent: proj.overallProgress }));
                  setLogDialogOpen(true);
                }}
                sx={{ mt: { xs: 2, sm: 0 } }}
              >
                Log Progress Update
              </Button>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Overall Progress Bar */}
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Overall Project Progress
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main" }}>
                  {proj.overallProgress}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={proj.overallProgress}
                sx={{ height: 12, borderRadius: 6 }}
              />
            </Box>

            {/* Financial Overview Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ bgcolor: "action.hover" }}>
                  <CardContent>
                    <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Estimated Budget</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          ₹ {Number(proj.estimatedCost).toLocaleString("en-IN")}
                        </Typography>
                      </Box>
                      <AccountBalanceIcon color="primary" />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ bgcolor: "action.hover" }}>
                  <CardContent>
                    <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Actual Expense Incurred</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "error.main" }}>
                          ₹ {Number(proj.actualCost).toLocaleString("en-IN")}
                        </Typography>
                      </Box>
                      <EngineeringIcon color="error" />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <Card sx={{ bgcolor: "action.hover" }}>
                  <CardContent>
                    <Typography variant="caption" color="text.secondary">Remaining Budget</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "success.main" }}>
                      ₹ {Number(Number(proj.estimatedCost) - Number(proj.actualCost)).toLocaleString("en-IN")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Progress Logs Timeline */}
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Construction Progress Log & Milestones
            </Typography>

            {proj.progressLogs && proj.progressLogs.length > 0 ? (
              <Stack spacing={2}>
                {proj.progressLogs.map((log) => (
                  <Paper key={log.id} elevation={0} sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
                    <Stack direction="row" sx={{ mb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {log.title}
                      </Typography>
                      <Chip label={`${log.progressPercent}% Completed`} size="small" color="primary" variant="outlined" />
                    </Stack>
                    {log.completedWork && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        <strong>Completed Work:</strong> {log.completedWork}
                      </Typography>
                    )}
                    {log.upcomingWork && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>Upcoming Work:</strong> {log.upcomingWork}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: "block" }}>
                      Logged on: {new Date(log.updateDate || Date.now()).toLocaleDateString("en-IN")}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No progress updates logged yet. Click "Log Progress Update" to add construction milestones.
              </Typography>
            )}
          </Paper>
        ))
      )}

      {/* Create Project Dialog */}
      <Dialog open={projectDialogOpen} onClose={() => setProjectDialogOpen(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleCreateProject}>
          <DialogTitle>New Construction Project</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField
                fullWidth label="Project Name *"
                value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                required
              />
              <TextField
                fullWidth label="Description" multiline rows={2}
                value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <TextField
                fullWidth type="number" label="Estimated Cost (₹) *"
                value={newProject.estimatedCost} onChange={(e) => setNewProject({ ...newProject, estimatedCost: parseFloat(e.target.value) || 0 })}
                required
              />
              <TextField
                fullWidth select label="Status"
                value={newProject.status} onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
              >
                <MenuItem value="PLANNING">PLANNING</MenuItem>
                <MenuItem value="IN_PROGRESS">IN PROGRESS</MenuItem>
                <MenuItem value="ON_HOLD">ON HOLD</MenuItem>
                <MenuItem value="COMPLETED">COMPLETED</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setProjectDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Create Project</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Log Progress Dialog */}
      <Dialog open={logDialogOpen} onClose={() => setLogDialogOpen(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleAddLog}>
          <DialogTitle>Log Progress Update</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField
                fullWidth label="Update Title (e.g. Garbhagudi Pillar Pillars Completed) *"
                value={newLog.title} onChange={(e) => setNewLog({ ...newLog, title: e.target.value })}
                required
              />
              <TextField
                fullWidth label="Completed Work Details" multiline rows={2}
                value={newLog.completedWork} onChange={(e) => setNewLog({ ...newLog, completedWork: e.target.value })}
              />
              <TextField
                fullWidth label="Upcoming Work Planned" multiline rows={2}
                value={newLog.upcomingWork} onChange={(e) => setNewLog({ ...newLog, upcomingWork: e.target.value })}
              />
              <TextField
                fullWidth type="number" label="New Overall Progress % (0-100) *"
                value={newLog.progressPercent} onChange={(e) => setNewLog({ ...newLog, progressPercent: parseInt(e.target.value) || 0 })}
                required
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={() => setLogDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Save Progress Log</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
